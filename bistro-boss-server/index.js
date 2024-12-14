const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const Stripe = require('stripe');
const stripe = Stripe(`sk_test_51QVjNPK0RLZZEzzT28TNIrWtfDgs0EDlmMuDXnhfZvqKGuiLgtfJtRW790gcasWQ05PvHDc1EtiJYzr7dU5mk6no00ahnJu2Zs`);

app.use(express.json());
app.use(cors());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("server is running");
});

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@bistro-boss-restaurant.l8cgk.mongodb.net/?retryWrites=true&w=majority&appName=bistro-boss-restaurant`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const menuCollection = client.db("bistroDB").collection("menu");
    const reviewCollection = client.db("bistroDB").collection("review");
    const cartCollection = client.db("bistroDB").collection("carts");
    const userCollection = client.db("bistroDB").collection("users");
    const paymentCollection = client.db('bistroDB').collection('payments')
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    // middlewares
    const verifyToken = (req, res, next) => {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      jwt.verify(token, process.env.TOKEN, function (err, decoded) {
        if (err) {
          return res.status(403).send({ message: "forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    const verifyAdmin = async(req,res,next) =>{
      const email = req.decoded.email;
      const query = {email: email};
      const user = await userCollection.findOne(query);
      if(user?.role !== 'admin'){
        return res.status(403).send({message: 'forbidden access'});
      }
      next()
    }
    // JWT
    app.post("/jwt", async (req, res) => {
      const email = req.body?.email;
      const token = jwt.sign({ email }, process.env.TOKEN);
      res.send({ token });
    });
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    app.get('/menu/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await menuCollection.findOne(query);
      res.send(result);
    })
    app.get("/menus/:category", async (req, res) => {
      const query = { category: req.params.category };
      const result = await menuCollection.find(query).toArray();
      res.send(result);
    });
    app.post("/menu", verifyToken, verifyAdmin, async(req,res) =>{
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result)
    });
    app.patch('/menu/:id', async(req, res) =>{
      const id = req.params.id;
      const menuItem = req.body;
      const query = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set: {
          name: menuItem?.name,
          price: menuItem?.price,
          category: menuItem?.category,
          image: menuItem?.image,
          recipe: menuItem?.recipe
        }
      }
      const result = await menuCollection.updateOne(query, updatedDoc);
      res.send(result)
    })
    app.delete('/menu/:id', verifyToken, verifyAdmin, async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await menuCollection.deleteOne(query);
      res.send(result)
    })
    app.post("/carts", verifyToken, async (req, res) => {
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      res.send(result);
    });
    app.get("/carts",  async (req, res) => {
      let query = {};
      if (req?.query?.email) {
        query = { email: req.query.email };
      }
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/carts/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
        const user = await userCollection.findOne(query);
        if (user?.email) {
          console.log("got it");
          return res.send({ message: "user already exists!" });
        }
      }
      const result = await userCollection.insertOne(userInfo);
      res.send(result);
    });
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });
    app.patch("/users", async (req, res) => {
      const user = req.body;
      const id = user?._id;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(query, updatedDoc);
      res.send(result);
    });
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });
    app.get('/admin', async(req, res) =>{
      const email = req?.query?.email;
      const query = {email: email};
      let isAdmin
      const user = await userCollection.findOne(query);
      if(user?.role === 'admin'){
        isAdmin = true
      }
      res.send({isAdmin})
    })
    app.post('/create-payment-intent', async(req,res) =>{
      const {amount} = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
      })
      res.send({clientSecret: paymentIntent.client_secret})
    })
    app.post('/payments',verifyToken, async(req,res) =>{
      const info = req.body;
      // console.log(paymentInfo);
      const email = req.query.email;
      const itemsQuery = {email: email}
      const items = await cartCollection.find(itemsQuery, {projection: {menuId: 1}}).toArray()
      const menuIds = items.map(item => item?.menuId)
      const cartIds = items.map(item => item?._id)
      const paymentInfo = {
        trxId: info?.trxId,
        name: info?.name,
        email: info?.email,
        amount: info?.amount,
        category: info?.category,
        menuIds,
        status: 'pending'
      }
      const cartQuery = { _id: {$in : cartIds.map(cartId => new ObjectId (cartId))}};
      const clearingCarts = await cartCollection.deleteMany(cartQuery);
      const result = await paymentCollection.insertOne(paymentInfo);
      res.send({payment: result, deleteCarts: clearingCarts})
    })
    app.get('/payments',verifyToken, async(req,res) =>{
      let query = {}
      if(req?.query?.email){
        query = {email: req?.query?.email};
      }
      const result = await paymentCollection.find(query).toArray()
      res.send(result)
    });
    app.get('/stats', async(req, res) =>{
      try{
        const pipeline = [
          // making the object ids
          {
            $addFields: {
              menuIds:{
                $map:{
                  input: '$menuIds',
                  as: 'menuId',
                  in: { $toObjectId: '$$menuId' }
                }
              }
            }
          },
          { $unwind: '$menuIds' }, // flattening the menuIds array
          {
            $lookup:{
              from: 'menu',
              localField: 'menuIds',
              foreignField: '_id',
              as: 'menuDetails',
            }
          },
          { $unwind: '$menuDetails'},
          {
            $group: {
              _id: '$menuDetails.category',
              quantity: {$sum: 1},
              revenue: {$sum: '$menuDetails.price'}
            }
          },
          {
            $project: {
              category: '$_id',
              quantity: 1,
              revenue: 1,
              _id: 0
            }
          }
        ]
        const result = await paymentCollection.aggregate(pipeline).toArray();
        res.send(result)
      }
      catch(error){
        res.status(500).send({success: false, message: 'Internal server error'})
      }
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running on port", port);
});
