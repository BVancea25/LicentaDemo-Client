import React from 'react'
import "../App.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const Login=()=>{
    const nav=useNavigate();
    const {setAuth}=useAuth()
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/auth/authenticate",{email:email,password:pass})
            .then((res)=>{
                if(res.status===200){

                    const userId=res.data.userId
                    axios.get("http://localhost:5000/csrf-token")
                    .then((res)=>{
                       const csrf=res.data.csrf_token
                        setAuth({userId,csrf})
                    })
                    
                    nav("/")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login