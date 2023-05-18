import { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';

let heartedBooks = [
  {
    _id : "646621698b5800b2a92c569964",
    name : "Harry Potter",
  },
  {
    _id : "646621698b5800b2a92c569878",
    name : "Attack On Titan",
  },
  {
    _id : "846621698b5800b2a92c569878",
    name : "Story Teller",
  },
]
import 'bootstrap/dist/css/bootstrap.css';
import '../css/navbar.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import store from "../redux/store"
import { LOGIN, LOGOUT } from "../redux/actions"
import { SET_USER_DETAILS } from "../redux/actions"

function Navbar() {
  
  const loginStatus = useSelector(state => state.loginStatus);

  const [logged, setLogged] = useState(loginStatus);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loginStatus);
    });
    return unsubscribe;
  }, [loginStatus]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    store.dispatch(LOGOUT());
  };

      return (
        <>
        <div className='cart-content'>
          {store.getState().favBooks.length > 0 ?
            store.getState().favBooks.map(fav => {
              return (<span>{fav}</span>)
            })
          :
          ""
          }
        </div>
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
                {logged ? 
                    <>
                        {/* user icon */}
                        <div className="dropdown">
                          <div className="dropdown-hover user-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>  
                          </div>
                          <div className="dropdown-menu">
                            <Link to="account">
                                <div className="dropdown-item">account</div>
                            </Link>
                            <Link to="favorite">
                            <div className="dropdown-item"> favorite</div>
                            </Link>
                            <div
                              onClick={handleLogout}
                              className="dropdown-item logout">Logout</div>
                          </div>
                        </div>
                        {/* cart icon */}
                        <button
                        className="nav-btn cart">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </button>
                    </>
                    // else (not logged)
                    :
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
                }
  
            </div>
        </nav>
        </>
      );
  }
  
export default Navbar