import React,{useState} from 'react';
import axios from "axios";
import Ra from './Ra';

function LogIn() {
    const [login,setLogin]= useState({
        email:"",
        password:"",
    });
    const Input=(e)=>{
        const name= e.target.name;
        const value= e.target.value;

        setLogin({...login,[name]:value})
    }

    const logIn = (e)=>{
        e.preventDefault();
        const {email,password}=login;
        if(email && password){
            axios.post("http://localhost:9000/login",login).then(res=>alert(res.data.message));
        }else{
            alert("Incomplete")
        }
    }

  return (
    <div className='login'>
      <form action=''>
        <label htmlFor='email'>Email</label>
        <input type="email" name="email" id="email" value = {login.email} onChange={Input} placeholder="Enter your Email"/>

        <label htmlFor='password'>Password</label>
        <input type="password" name="password" id="password" value = {login.password} onChange={Input} placeholder="Enter your password"/>
        
        <button onClick={logIn}>Submit</button>
      </form>
      <Ra/>
    </div>
  )
}

export default LogIn
