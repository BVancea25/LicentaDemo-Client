import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register=()=>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const nav=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/auth/register",{password:pass,email:email,name:name})
            .then((res)=>{
                if(res.status===200){
                    const user_id=res.data.userId
                    nav("/login")
                    axios.post("http://localhost:5000/user",{id:user_id,name:name})
                        .then((res)=>{
                            console.log(res)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }
        })
            .catch((err)=>{
                console.log(err)
        })
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
    </div>
    )
}

export default Register