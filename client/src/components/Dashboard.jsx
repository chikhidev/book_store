import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import store from "../redux/store"
import { LOGIN, LOGOUT } from "../redux/actions"
import { SET_USER_DETAILS } from "../redux/actions"
import { useSearchParams } from "react-router-dom";
import Inbox from './Inbox';
import { display } from '../js';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import MessagePopup from './MessagePopup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const Dashboard = ()=>{
    return(
        <>
                  {/* user icon */}
                  
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
                        <>
                          <Link to="/store/book/create">
                              <button  className="nav-btn cart ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                  
                              </button>
                          </Link>
                          <button onClick={() => fetchInbox()}>
                              
                          </button>
                          <div className="dropdown">
                            <div className="dropdown-hover user-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                              </svg>
                            </div>
                            <div className="dropdown-menu">
                              {inbox?.messages ? 
                                inbox?.messages.length > 0 ? 
                                  inbox?.messages.map(message => {
                                    return (
                                      <Link to={`/inbox/message/${message._id}`}>
                                        <div className={`dropdown-item ${message.isRead ? "already-read" : ""}`}>
                                            {display(message.content, 15)}
                                        </div> 
                                      </Link>
                                    )
                                  })
                                : <h4>no messages currently</h4>
                              : <ThreeDotsWave />
                              }
                            </div>
                        </div>
                        </>
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
    )
}

export default Dashboard