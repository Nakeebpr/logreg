import React, { useState } from 'react';
import axios from "axios";
import Router2 from './Router2';
import validator from 'validator';

function Home() {

    const [register,setRegister]= useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    });

    const Input=(e)=>{
        const name = e.target.name
        const value = e.target.value
        console.log(name,value)
        setRegister({...register,[name]:value})
    }

    const Register = (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=register;

        if(name && email && password && (password===cpassword) && validator.isEmail(email)){
            axios.post("http://localhost:9000/register",register).then(res => {alert(res.data.message)});
        }else{
            alert("Incomplete")
        }
    }
  return (
    <div className='home'>
      <form action='' target='_blank'>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" id="name" value = {register.name} onChange={Input} placeholder="Enter your Name" required/>

        <label htmlFor='email'>Email</label>
        <input type="email" name="email" id="email" value = {register.email} onChange={Input} placeholder="Enter your Email" required/>

        <label htmlFor='password'>Password</label>
        <input type="password" name="password" id="password" value = {register.password} onChange={Input} placeholder="Enter your password" required/>
        
        <label htmlFor='cpassword'>Confirm Password</label>
        <input type="password" name="cpassword" id="cpassword" value = {register.cpassword} onChange={Input} placeholder="Confirm password" required/>

        <button onClick={Register}>Submit</button>
      </form>
      <Router2/>
    </div>
  )
}

export default Home
