const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/loginandregister",{ useNewUrlParser:true, useUnifiedTopology:true },()=>{
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cpassword:String,
    AccessToken:String
});

const User = new mongoose.model("User", userSchema)

app.post("/register", (req,res)=>{
    const {name,email,password} = req.body;

    console.log("Line 29")
    console.log(name,email,password)

    User.findOne({email:email},(err,user)=>{

        console.log("Line 34")
        console.log(user)

        if(user){
            res.send({message : "User already present"})
        }else{

            const AccessToken = jwt.sign({email:email,password:password}, "mynameisnakeebandiamfromsawantwadisindhudurg");
            console.log("Line 42")
            console.log(AccessToken)

            const user = new User({
                name:name,
                email:email,
                password:password,
                AccessToken
            });

            console.log("Line 52")
            console.log(user)

            user.save((err)=>{
                if(err){
                    res.send({message:"err"})
                }else{
                    res.send({message : "Successfully Registered"})
                }
            })
        }
    })
})


const Verify =(req,res,next)=>{

    const {email,password} = req.body;
    console.log("Line 70");
    console.log(email,password)

    User.findOne({email:email},(err,user)=>{

        console.log("Line 75");
        console.log(user)

        if (user){
            const Token = user.AccessToken;
            console.log("line 80")
            console.log(Token)
            jwt.verify(Token,"mynameisnakeebandiamfromsawantwadisindhudurg",(err,user)=>{
                if(err){
                    return res.status(403).send({message:"Token not valid"});
                }
                req.user = user;
                console.log("Line 87")
                console.log(req.user)
            })
        }else{
            console.log("ver err")
            res.send({message:"You are not authenticated"})
            return
        }
        next()
    })
    
}



app.post("/login",Verify,(req,res)=>{
    const {email,password} = req.body;
    console.log("Line 94")
    console.log(email,password)
    console.log(req.user)

    // User.findOne({email:email},(err,user)=>{
    //     console.log("Line 99")
    //     console.log(email,password)
    //     console.log(user)
    //     if(user){
    //         if(password===user.password){
    //             res.send({message:"Login Successful",user:user})
    //         }else{
    //             res.send({message:"Password not matched"})
    //         }
    //     }else{
    //         res.send({message:"User not found"})
    //     }
    // })
    // console.log("Line 109")

    if (req.user.email === email && req.user.password === password){
        console.log("Line 121")
        console.log(req.user.email)
        res.send({message:"Login Successful"})
    }else{
        res.send({message:"Password not matched"})
    }
    
})


app.listen(9000,()=>{

    console.log("Server is running at port 9000")
})