import { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/navbar.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import store from "../redux/store"
import { LOGIN, LOGOUT } from "../redux/actions"
import { SET_USER_DETAILS } from "../redux/actions"
import Inbox from './Inbox';
import { display } from '../js';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import MessagePopup from './MessagePopup';
import { SERVER_ENDPOINT } from "../js";



function Navbar() {
  
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

  const fetchInbox = async () => {
    try {
        let response = await fetch(`${SERVER_ENDPOINT}/inbox`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          },
        })
        let data = await response.json()
        setInbox(data.data[0])
    }
    catch (err) {
      console.log("error getting inbox : ", err);
    }
  }
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    store.dispatch(LOGOUT());
  };
  
  
  useEffect( () => {
    logged ? fetchInbox() : "", [loginStatus, adminStatus]
  })


  
      return (
          <nav className=" w-full relative">
            <div className="h-24 w-full "></div>
            <div className="w-full flex items-center justify-between mx-auto fixed top-0 nav ">
            <h2 className='logo flex items-center'>
              Senteria
            </h2>
            <div className="flex md:order-2">
            {logged ? 

            <div className="flex items-center">
              <Link className="md:mr-2 bg-pink-500 p-2 rounded-lg hover:bg-pink-400" to={'/search'}>
                    <button>
                        < SearchRoundedIcon sx={{ color :'#fff' }} />
                    </button>
                </Link>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                </svg>

                <span>Tableau de bord</span>
              </button>
            </div>
              // else (not logged)
              :
              <div className="flex items-center">
              <Link to="/login" className="flex items-center md:mr-2">
                <button type="button" className=" focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 ">
                connexion
                </button>
              </Link>
              <Link to="/register" className="flex items-center">
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 ">
                s'inscrire
                </button>
              </Link>
              </div>
          }
              <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 " id="navbar-cta">
              <ul className="flex flex-col font-medium p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 my-2">
                
                <li>
                  <Link to="/" className="flex flex-row items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                      Home
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="link flex flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                      Categories
                    </Link>
                </li>
                <li>
                <Link to="/new" className="link flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>

                  New
                  </Link>
                </li>
              </ul>
            </div>
            </div>
          </nav>
      );
  }
  
export default Navbar