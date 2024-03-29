import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/card.css';
import './js/index.js';
import FeaturedSlider from './components/FeaturedSlider';
import CategorySlider from './components/CategorySlider';
import Describe from './components/Describe';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './redux/store';
import AnimatedRoutes from './components/FramerMotion/AnimatedRoutes';
import { motion } from "framer-motion"
import { LOGIN, LOGOUT, SET_USER_DETAILS } from './redux/actions';
import ThreeDotsWave from './components/FramerMotion/ThreeDotWave';
import { getCategories } from './js/index.js';
import { SERVER_ENDPOINT } from './js/index.js';
import { fetchWithTimeout } from './js/index.js';
const motionDiv = (child) => {
  return (
    <motion.div
      initial={{opacity : 0}}
      animate={{opacity : 1}}
      exit={{opacity : 0}}
    >
      <child />
    </motion.div>
  )
}

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setIsError] = useState(false)
  const fetchAndSetUserDetails = async (token) => {
    try {
      let userDetailsResponse = await fetchWithTimeout(`${SERVER_ENDPOINT}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
      }, 2000)
      let res = await userDetailsResponse.json();
      if (res.success) {
          store.dispatch(SET_USER_DETAILS(res.data));
      }
      else {
        setIsError(true)
      }
    }
    catch (err) 
    {
      setIsError(true)
    }
};
  const checkAlreadyLogged = () => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
      store.dispatch(LOGIN(localStorage.getItem("token")))
      fetchAndSetUserDetails(localStorage.getItem("token"))
    } else {
      setIsLogged(false);
      store.dispatch(LOGOUT())
    }
  };

  useEffect(() => {
    checkAlreadyLogged();
  }, [setIsLogged]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsLogged(store.getState().loginStatus);
    });
    return unsubscribe;
  }, []);

    return (
      <Router>
        <div className="App bg-white">
          <Navbar />
          <AnimatedRoutes isLogged={isLogged} />
        </div>
      </Router>
  );
}


function Home() {
  return (
    <motion.div className="hero featured"
      initial={{opacity : 0}}
      animate={{opacity : 1}}
      exit={{opacity : 0}}
    >
          <Describe/>
           <FeaturedSlider />
           <CategorySlider category={"mystery"} />
           <CategorySlider category={"fiction"} />
    </motion.div>
  );
}

function Categories() {
  const [fetchedCategories, setFetchedCategories] = useState(store.getState().categories) 
  
  useEffect(() => {
    // if ure reading this, this next line is so cool
    // cause now u only fetch if there was no fetched categories
    // which improves the performance alot  
    fetchedCategories.length == 0 ? getCategories(setFetchedCategories) : "" 
  }, [])

  return (
      <motion.div className="hero featured"
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
      >
        {fetchedCategories.length > 0 ? 
        fetchedCategories.map(cat => {
          return <CategorySlider category={cat.name} />
        })
        : <ThreeDotsWave />}
      </motion.div>
  )
}

export {App, Home, Categories};
