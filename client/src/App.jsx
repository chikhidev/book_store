import { useState, useEffect, createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/hero.css';
import './js/index.js';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FeaturedSlider from './components/FeaturedSlider';
import CategorySlider from './components/CategorySlider';
import store from './redux/store';

function App() {
  const [isLogged, setIsLogged] = useState(store.getState().loginStatus);
  
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

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsLogged(store.getState().loginStatus);
    });
    return unsubscribe;
  }, []);

    return (
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
  );
}

function Home() {
  return (
    <div className="hero featured">
           <FeaturedSlider />
           <CategorySlider category={"fiction"} />
           <CategorySlider category={"manga"} />
    </div>
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


export {App};
