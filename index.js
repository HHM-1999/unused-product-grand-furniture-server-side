const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9k4z9b7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

async function run() {


    try {
        const categoryCollection = client.db("Furniture").collection("Categories");
        const bookingCollection = client.db("Furniture").collection("booking");
        const usersCollection = client.db("Furniture").collection("users");
        const allproductCollection = client.db("Furniture").collection("allproducts");



        app.get('/products', async (req, res) => {
            const query = {};
            const result = await categoryCollection.find(query).toArray();
            res.send(result);
        })
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await categoryCollection.insertOne(product);
            res.send(result);
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoryCollection.findOne(query);
            res.send(result);
        })
        ///Booking
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })

        app.get('/booking', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const booking = await bookingCollection.find(query).toArray();
            res.send(booking);
        })

        //users

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result);

        })
        //delete
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            res.send(result);
        })
        //product
        app.post('/allproducts', async (req, res) => {
            const product = req.body
            const result = await allproductCollection.insertOne(product)
            res.send(result);

        })
        app.get('/allproducts', async (req, res) => {
            console.log(req.query.email);
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }

            }
            const result = await allproductCollection.find(query).toArray();
            res.send(result);
        })


    }
    finally {

    }
}
run().catch(console.log);




app.get('/', async (req, res) => {
    res.send('Grand Furniture is running');
})

app.listen(port, () => console.log(`Grand Furniture is running on ${port}`))