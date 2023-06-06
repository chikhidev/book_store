
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../css/navbar.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import store from "../redux/store";

import { SET_USER_DETAILS } from "../redux/actions";
import { display } from "../js";
import ThreeDotsWave from "./FramerMotion/ThreeDotWave";
import MessagePopup from "./MessagePopup";
const ENDPOINT = "http://localhost:4000"


function Navbar() {
  const loginStatus = useSelector((state) => state.loginStatus);
  const adminStatus = useSelector((state) => state.userDetails.isAdmin);
  const [logged, setLogged] = useState(loginStatus);
  const [admin, setAdmin] = useState(adminStatus);
  const [inbox, setInbox] = useState([]);
  const [prettyBtn, setPretty] = useState("md:mx-2 hover:text-pink-500")
  const [user, setUser] = useState({})


  const getUser = async ()=>{
    const res = await fetch(`${ENDPOINT}/user`,{
      method: 'POST',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        },
    })
    const data = await res.json()
    setUser(data.data)
    console.log(user)
  }

  useEffect(() => {
    getUser()
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loginStatus);
      setAdmin(store.getState().userDetails.isAdmin);
    });
    return unsubscribe;
  }, [loginStatus, adminStatus, user.avatar]);

  const fetchInbox = async () => {
    try {
      let response = await fetch("http://localhost:4000/inbox", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await response.json();
      setInbox(data.data[0]);
    } catch (err) {
      console.log("error getting inbox : ", err);
    }
  };

  useEffect(() => {
    logged ? fetchInbox() : "", [loginStatus, adminStatus];
  });

  

  return (
    <nav className=" w-full relative ">
      <div className="h-24 w-full "></div>
      <div className="w-full flex items-center justify-between fixed  top-0 px-12 z-[100] bg-gradient-to-b from-white to-white/80">
        <h2 className="logo flex items-center">Senteria</h2>
        <div className="flex md:order-2">
          {logged ? (
            <div className="flex items-center">
              

              <div className="flex items-center">
                <Link to="favorite" className={prettyBtn}>
                  <div className="dropdown-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </div>
                </Link>

                {store.getState().userDetails.isAdmin && (
                  <div className="flex items-center">
                    <Link to="book/create" className={prettyBtn}>
                      <button className="py-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </Link>
                    <Link to="/inbox" className={`dropdown ${prettyBtn}`} >
                      <div className="dropdown-hover user-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                      {/* <div className="dropdown-menu absolute">
                        {inbox?.messages ? (
                          inbox?.messages.length > 0 ? (
                            inbox?.messages.map((message) => {
                              return (
                                <Link to={`inbox/message/${message._id}`}>
                                  <div
                                    className={`dropdown-item ${
                                      message.isRead ? "already-read" : ""
                                    }`}
                                  >
                                    {display(message.content, 50)}
                                  </div>
                                </Link>
                              );
                            })
                          ) : (
                            <h4>no messages currently</h4>
                          )
                        ) : (
                          <ThreeDotsWave />
                        )}
                      </div> */}
                    </Link>
                  </div>
                )}
                <Link
                className={"md:mr-4 bg-gradient-to-r from-pink-600/30 to-pink-400/30 p-2 rounded-xl hover:bg-pink-400/30 "}
                to={"/search"}
              >
                <button>
                  <SearchRoundedIcon sx={{ color: "#fff" }} />
                </button>
              </Link>
                <Link to="account" className={""}>
                    <div className="">
                          {    
                            <img className="h-10 w-10 rounded-xl fit-cover" src={ENDPOINT + 
                              
                                user.avatar

                              
                            } alt="" />
                          }  
                    </div>
                  </Link>

              </div>
            </div>
          ) : (
            // else (not logged)
            <div className="flex items-center">
              <Link to="/login" className="flex items-center md:mr-2">
                <button
                  type="button"
                  className=" focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 "
                >
                  connexion
                </button>
              </Link>
              <Link to="/register" className="flex items-center">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 "
                >
                  s'inscrire
                </button>
              </Link>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 my-2">
            <li>
              <Link to="/" className="flex flex-row items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="link flex flex-row items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/new" className="link flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
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

export default Navbar;
