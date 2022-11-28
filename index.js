const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cighgcw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoriesCollection = client.db('usedBuyer').collection('categories');

        const buyerCollection = client.db('usedBuyer').collection('buyerInfos');
       

        app.get('/categoriesCollection', async (req, res) => {
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
            
            
        });

        app.get('/buyerInfos', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const buyerInfos = await buyerCollection.find(query).toArray();
            res.send(buyerInfos);
        });

        app.post('/buyerInfos', async (req, res) => {
            const buyerInfo = req.body;
            console.log(buyerInfo);
            const result = await buyerCollection.insertOne(buyerInfo);
            res.send(buyerInfo);
        });
    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('server is running');
})

app.listen(port, () => console.log(`server running on ${port}`))