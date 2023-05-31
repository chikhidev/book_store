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


function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const loginStatus = useSelector(state => state.loginStatus);
  const adminStatus = useSelector(state => state.userDetails.isAdmin);
  const [isSearchError, setIsSearchError] = useState(false)

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
  const handleSearchClick = (e) => {
    if (searchQuery.length < 3)
    {
      setIsSearchError(true)
    }
    else {
      setIsSearchError(false)
    }
    setTimeout(() => setIsSearchError(false), 1000)
  }
  const handleSearchQuery = (searchQuery.length > 2) ? (`/search?name=${searchQuery}`) : (`/`)
      return (
        <nav className='relative'>
          <div className="hamburger">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </div>

            <div className="nav-left">
                <div className="links">
                  <div >
                      <Link to="/" className="link">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>

                        Home
                        </Link>
                  </div>
                  <div >
                      <Link to="/categories" className="link">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                        Categories
                        </Link>
                  </div>
                  <div >
                      <Link to="/new" className="link">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>

                        New
                        </Link>
                  </div>
                </div>
            </div>
            <div className="nav-center">
              <h2 className='logo'>
                "Senteria"
              </h2>
            </div>
            <div className="empty_el">
            </div>

            <div className="empty_el">
            </div>
            <div className="nav-right">
                {logged ? 
                    <>
                        {/* user icon */}
                        
                        <Link to={handleSearchQuery}>
                            <button onClick={handleSearchClick}>
                                < SearchRoundedIcon sx={{ color :'#444' }} />
                            </button>
                        </Link>
                        <Link to="favorite">
                            <div className="dropdown-item"> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            </div>
                            </Link>
                        {/* store icon */}
                        {
                          store.getState().userDetails.isAdmin && 
                              <Link to="/store/book/create">
                                  <button  className="nav-btn cart ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                      
                                  </button>
                              </Link>
                        }
                        <div className="dropdown">
                          <div className="dropdown-hover user-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="dropdown-menu">
                            <Link to="account">
                                <div className="dropdown-item">account</div>
                            </Link>
                            <div
                              onClick={handleLogout}
                              className="dropdown-item logout">Logout</div>
                          </div>
                        </div>
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