const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
});

const User = new mongoose.model("User", userSchema)

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)

    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successful",user:user})
            }else{
                res.send({message:"Password not matched"})
            }
        }else{
            res.send({message:"User not found"})
        }
    })
    
})

app.post("/register",(req,res)=>{
    const {name,email,password} = req.body;

    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message : "User already present"})
        }else{
            const user = new User({
                name:name,
                email:email,
                password:password
            });
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


app.listen(9000,()=>{

    console.log("Server is running at port 9000")
})