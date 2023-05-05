import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import banner from './assets/banner.webp'
import './css/navbar.css';
import './css/index.css';
import './js/index.js';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { createContext } from 'react';
import Login from './components/Login';
import Register from './components/Register';
const LoginContext = createContext();
import { useContext } from 'react';

function Home() {
  return (
    <section className="hero">
       <img src={banner} className="banner"/>
    </section>
  );
}

function Navbar() {
  const [logged, setLogged] = useContext(LoginContext)
  const logout = (e) => {
    e.preventDefault()
    setLogged(false)
    localStorage.removeItem("token")
  }
	return (
			<nav>
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
              {!logged ? 
                <>
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
                </>
                : 
                <div className="dropdown">
                  <div className="dropdown-hover user-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>  
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-item"> account</div>
                    <div
                      onClick={logout}
                      className="dropdown-item logout">Logout</div>
                  </div>
                </div>
                
              }
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
  const [isLogged, setIsLogged] = useState(false);

  const checkAlreadyLogged = () => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  useEffect(() => {
    checkAlreadyLogged();
  }, []);
    return (
    <LoginContext.Provider value={[isLogged, setIsLogged]} >
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/categories" element={<About/>} />
            <Route path="/new" element={<Contact/>} />
            <Route path="login" element={isLogged ? <Navigate to="/"/> : <Login />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
            <Route path="/register" element={isLogged ? <Navigate to="/"/> : <Register />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
          </Routes>
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export {App, LoginContext};
