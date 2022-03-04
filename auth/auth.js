const express = require("express");
const {User} = require("./user.js")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
const port =process.env.PORT||3000
app.use(express.json())

mongoose.connect("mongodb://localhost/auth" ,()=>{
    console.log("Auth service db connected")
} )

app.post("/auth/login" , async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(!user)return res.json({message:"User doesnot exists"})
    if(password !== user.password)return res.json({message:"password incorrect "})
   
    const payload = {
        email,
        name:user.name,
        password
    }
    jwt.sign(payload, "secret", (err,token)=>{
        if(err)console.log(err)

        return res.json({token:token})
    })
})

app.post("/auth/register" , async(req,res)=>{
    const {email,password,name} = req.body;

    const userExist = await User.findOne({email})
    if(userExist)return res.json({message:"User already exists"})

    const newUser = new User({
        name,
        email,
        password
    })
    newUser.save();
    return res.json(newUser)

})




app.listen(port,()=>{
    console.log(`Server starte don port ${port}`)
})
