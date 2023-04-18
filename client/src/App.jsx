import React from 'react';
import { useState } from 'react';
import banner from './assets/banner.webp'
import { useRef } from "react";
import { FaBars, FaTimes, FaBookOpen } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/navbar.css';
import './js/index.js';

import axios from "axios"
function Home() {
  return (
    <section className="hero">
       <img src={banner} className="banner"/>
    </section>
  );
}

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
      <FaBookOpen size='25' />
			<nav ref={navRef}>
				<Link to="/">Home</Link>
				<Link to="/categories">Categories</Link>
				<Link to="/new">New</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
      <button onClick={
        () => {axios.post("http://localhost:4000/user/create")}
      }>
        add user
      </button>
		</header>
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