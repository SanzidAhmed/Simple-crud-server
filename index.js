const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT || 3000;
const cors = require('cors');
// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://Sanzid:EiXSk2bqYZVQcH5M@cluster0.c70onov.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const postCollection = client.db('Simple-crud').collection('allProductCollection')
    console.log('database connected successfully');

    app.post('/allPost', async(req, res) => {
        const body = req.body;
        console.log(body);
        const result = await postCollection.insertOne(body);
        res.send(result)
    })
    app.get('/allPost', async(req, res) => {
      const search = req.query.search;
      const query = {ProductName: {$regex: search, $options: 'i'}};
      const cursor = postCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('hello world for backend');
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})