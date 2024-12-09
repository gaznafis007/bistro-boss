const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(express.json());
app.use(cors());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("server is running");
});

const uri =
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@bistro-boss-restaurant.l8cgk.mongodb.net/?retryWrites=true&w=majority&appName=bistro-boss-restaurant`;

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
    const menuCollection = client.db('bistroDB').collection('menu');
    const reviewCollection = client.db('bistroDB').collection('review');
    const cartCollection = client.db('bistroDB').collection('carts');
    const userCollection = client.db('bistroDB').collection('users');
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    app.get('/menu', async(req,res) =>{
        const result = await menuCollection.find().toArray();
        res.send(result)
    })
    app.get('/menu/:category', async(req,res) =>{
      const query = {category: req.params.category};
      const result = await menuCollection.find(query).toArray();
      res.send(result)
    })
    app.post('/carts', async(req,res) =>{
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      res.send(result)
    })
    app.get('/carts', async(req,res) =>{
      let query = {}
      if(req?.query?.email){
        query = {email: req.query.email}
      }
      const result = await cartCollection.find(query).toArray();
      res.send(result)
    })

    app.delete('/carts/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })
    app.post('/users', async(req, res) =>{
      const userInfo = req.body
      let query = {};
      if(req.query.email){
        query = {email: req.query.email}
        const user = await userCollection.findOne(query);
        if(user?.email){
          console.log('got it')
          return res.send({message: 'user already exists!'})
        }
      }
      const result = await userCollection.insertOne(userInfo);
      res.send(result);
    })
    app.get('/users', async(req,res) =>{
      const result = await userCollection.find({}).toArray();
      res.send(result);
    })
    app.patch('/users', async(req,res) =>{
      const user = req.body;
      const id = user?._id;
      const query = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set:{
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(query, updatedDoc);
      res.send(result)
        })
    app.delete('/users/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })
    app.get('/review', async(req,res) =>{
        const result = await reviewCollection.find().toArray();
        res.send(result)
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
