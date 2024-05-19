import React, { useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        console.log('FormData:', formData);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            username: e.target.elements.username.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        };
        console.log("Form data:", formData);
    
        const requestData = qs.stringify({
            username: formData.username,
            pw: formData.password,
            email: formData.email
        });
    
        try {
            const response = await axios.post("http://localhost:8463/signup", requestData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log("Response from signup API:", response.data);
        } catch (error) {
            console.error("Error in signup:", error);
        }
    };
    
    

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>  
                <button className="button" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
