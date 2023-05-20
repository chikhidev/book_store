import { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/navbar.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import store from "../redux/store"
import { LOGIN, LOGOUT } from "../redux/actions"
import { SET_USER_DETAILS } from "../redux/actions"
import { useSearchParams } from "react-router-dom";

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

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const loginStatus = useSelector(state => state.loginStatus);
  const adminStatus = useSelector(state => state.userDetails.isAdmin);

  const [logged, setLogged] = useState(loginStatus);
  const [admin, setAdmin] = useState(adminStatus);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loginStatus);
      setAdmin(store.getState().userDetails.isAdmin);
    });
    return unsubscribe;
  }, [loginStatus, adminStatus]);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    store.dispatch(LOGOUT());
  };
  const handleSearch = (searchQuery.length > 2) ? (`/search?name=${searchQuery}`) : (`/register`)
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
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery} 
                    className="search" placeholder='search for a book'/>
                <Link to={handleSearch}>
                    <button>
                        < SearchRoundedIcon sx={{ color :'#444' }} />
                    </button>
                </Link>
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
                        {/* store icon */}
                        {store.getState().userDetails.isAdmin ? 
                            <Link to="/store/book/create">
                                <button  className="nav-btn cart">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg>                      
                                </button>
                            </Link>
                        :
                        ""}
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
      );
  }
  
export default Navbar