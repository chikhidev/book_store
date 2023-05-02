import React from 'react';
import { useState } from 'react';
import banner from './assets/banner.webp'
import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/navbar.css';
import './css/index.css';
import './js/index.js';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';


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
                  < SearchRoundedIcon />
              </button>
              <input className="search" placeholder='search for a book'/>
          </div>
          <div className="empty_el">
          </div>
          <div className="nav-right">
              <button
                className="nav-btn sign-in">
                Sign in
              </button>
              <button
                className="nav-btn cart">
                  <ShoppingCartRoundedIcon color='black' sx={{ fontSize: 15 }}/>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
