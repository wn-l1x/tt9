import React from 'react';
import {Link, Routes, Route } from "react-router-dom";
import './LandingPages.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <h1>Quizlol</h1>
            <p>The best quiz website.</p>
            <Link to="/signup"><button className="button">Sign Up</button> </Link>
            <button className="button">Login</button>
        </div>
    );
}

export default LandingPage;
