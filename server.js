const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) =>
    res.send('Hello World')
)

app.get('/blog', (req, res) => {
    res.send('Hello Bitch')
})

app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (e) {
        res.status(500).json({ message: error.message })
    }
})
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const products = await Product.findById(id);
        res.status(200).json(products)
    } catch (e) {
        res.status(500).json({ message: error.message })
    }
})

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const products = await Product.findByIdAndUpdate(id, req.body);
        if (!products) {
            return res.status(400).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (e) {
        res.status(500).json({ message: error.message })
    }
})
app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const products = await Product.findByIdAndDelete(id);
        if (!products) {
            return res.status(400).json({ message: `cannot find any product with ID ${id}` })
        }

        res.status(200).json(products)
    } catch (e) {
        res.status(500).json({ message: error.message })
    }
})



app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})
mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://myatsoesbs:2580258@restfulcrud.q0bffvp.mongodb.net/Restful-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to mongodb')
        app.listen(3000, () => {
            console.log('Server is running on port 3000')

        })

    }).catch(() => {
        console.log(error)
    })