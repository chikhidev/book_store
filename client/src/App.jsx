import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import banner from './assets/banner.webp'
import { useRef } from "react";
import './css/navbar.css';
import './css/index.css';
import './js/index.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import Login from './components/Login';
import Register from './components/Register';

function Home() {
  return (
    <section className="hero">
       <img src={banner} className="banner"/>
    </section>
  );
}

function Navbar() {
	const navRef = useRef();

	return (
			<nav ref={navRef}>
          <div className="nav-left links">
              <div className="link">
                  <Link to="/">Home</Link>
              </div>
              <div className="link">
                  <Link to="/categories">Categories</Link>
              </div>
              <div className="link">
                  <Link to="/new">New</Link>
              </div>
          </div>
          <div className="empty_el">
          </div>
          <div className="nav-center">
              <button>
                  < SearchRoundedIcon sx={{ color :'#444' }} />
              </button>
              <input className="search" placeholder='search for a book'/>
          </div>
          <div className="empty_el">
          </div>
          <div className="nav-right">
              <Link to="/login">
                  <button
                    className="nav-btn sign-in">
                    Sign in
                  </button>
              </Link>
              <Link to="/register">
                  <button
                    className="nav-btn sign-in">
                    Register
                  </button>
              </Link>
              <button
                className="nav-btn cart">
                  <ShoppingCartRoundedIcon sx={{ fontSize: 18 }}/>
              </button>
          </div>
			</nav>
	);
}


function About() {
  return (
    <section>
      <h2>About</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <h2>Contact</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/categories" element={<About/>} />
          <Route path="/new" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
