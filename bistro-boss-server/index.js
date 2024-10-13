const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const app = express ();

app.use(express.json());
app.use(cors());
require('dotenv').config();

app.get("/", (req,res) =>{
    res.send("server is running");
})

app.listen(port, ()=>{
    console.log("server is running on port", port)
})