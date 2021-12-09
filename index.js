const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lygbk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app   = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

 
 

app.get('/', (req, res) => {
    res.send("hello from mongodb working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const PeopleInput = client.db("myPortfolioByOwn").collection("input");
   
  app.post("/PeopleInput", (req, res) => {
      const appointment =req.body;
      PeopleInput.insertOne(appointment)
      .then(result => {
          res.send(result.insertedCount > 0);
      })

  })
});

app.listen(port)