import React from 'react';
import './App.css';
import LandingPage from '../pages/LandingPages';
import Signup from "../pages/SignUp";
import {Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <LandingPage />
      <Routes>
      <Route path="/signup" element={ <Signup/> } />
      </Routes>
    </div>
    
  );
}

export default App;
