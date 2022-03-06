const express = require("express");
const mongoose = require("mongoose")
const amqp = require("amqplib/callback_api")
const jwt = require("jsonwebtoken")
const auth = require("../isAuthenticated.js")




const app = express()
const port =process.env.PORT|| 5000
app.use(express.json())

mongoose.connect("mongodb://localhost/product" ,()=>{
    console.log("product service db connected")
} )

async function connect(){
    const amqpServer = "amqp://localhost:5672";
    connection = amqp.connect(amqpServer);
    channel = connection.createChannel();
    await chanel.assertQueue("PRODUCT");
}
connect();




app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})
