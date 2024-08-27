const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors');

const PORT = process.env.PORT || 10000;

const userConnect = require('./config/db.product');
const tokenConnect = require('./config/db.token');
const productConnect = require('./config/db.product');
const userRouter = require('./route/user.route');
const authUserTask = require('./middleware/authUserTask.middleware');
const productRouter = require('./route/product.route');



app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If you need to send cookies or authorization headers
}))
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', authUserTask, productRouter)

app.get('/', (req, res) => {
    try {
        return res.status(200).send(`server working fine`);
    } catch (error) {
        return res.status(500).send(`server not working fine:${error}`);

    }
})

app.listen(PORT, async () => {
    try {
        await userConnect;
        await tokenConnect;
        await productConnect;
        console.log(`server is running on ${PORT} and dbs connect to users and products`)
    } catch (error) {
        console.log(`error in server :${error}`)
    }
})