import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import banner from './assets/banner.webp'
import './css/navbar.css';
import './css/index.css';
import './css/hero.css';
import './js/index.js';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { createContext } from 'react';
import Login from './components/Login';
import Register from './components/Register';
const LoginContext = createContext();
import { useContext } from 'react';
import data from './data.json';


const display = (text, n) => {
  let len = text.length;
  let long = false;
  if (len > n)
  {
    long = true
    len = n;
  }
  else {
  }
  let processed = "";
  for (let i = 0; i < len; i++)
  {
    processed += text[i];
  }
  return (long ? processed + "..." : processed);
}

function Home() {
  return (
    <div className="hero featured">
    <section className="featured-book-section book-section">
        <div className="featured-header">
          <div className="featured-title">
              Books
              <div className="line-break"></div>
              For you
          </div>
          <div className="featured-arrows">
              <div className="left-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                      />
                  </svg>
              </div>
              <div className="right-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                  </svg>

              </div>
          </div>
        </div>
        <div className="book-cards">
            {data.books.map(
              (book) => {
                return (
                  <div key={book._id.$oid} className="book-card">
                      {/* i still dont know how the icons should appear lol  */}
                      {/* <div className="book-icons">
                          <div className="book-heart-icon">
                              <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                              </svg>
                          </div>
                          <div className="book-cart-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                              </svg>
                          </div>
                      </div> */}
                      <img className="book-imageUrl" src={book.imageUrl}/>
                      <div className="book-title">{display(book.title, 20)}</div>
                      <hr className="line"></hr>
                      <div className="author-label-call-to-action-container">
                          <div className="author-label">Writer</div>
                          <div className="call-to-action">Buy now</div>
                      </div>
                          <div className="author-price-container">
                              <div className="book-author">{display(book.author, 6)}</div>
                              <div className="book-price">${book.price}</div>
                          </div>
                  </div>
                )
              }
            )}
        </div>
    </section>
    </div>
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
                    <div className="dropdown-item"> favorite</div>
                    <div
                    onClick={logout}
                    className="dropdown-item logout">Logout</div>
                   </div>
                </div>
                
              }
              <button
                className="nav-btn cart">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
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
