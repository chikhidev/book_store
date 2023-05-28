import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/card.css';
import './js/index.js';
import FeaturedSlider from './components/FeaturedSlider';
import CategorySlider from './components/CategorySlider';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './redux/store';
import AnimatedRoutes from './components/FramerMotion/AnimatedRoutes';
import { motion } from "framer-motion"
import { LOGIN, LOGOUT, SET_USER_DETAILS } from './redux/actions';
import ThreeDotsWave from './components/FramerMotion/ThreeDotWave';
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

  const fetchAndSetUserDetails = async (token) => {
    let userDetailsResponse = await fetch(`http://localhost:4000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
    });
    let res = await userDetailsResponse.json();
    if (res.success) {
        store.dispatch(SET_USER_DETAILS(res.data));
    }
    else {
        console.warn("error setting user details...")
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
  // setInterval(() => console.log(store.getState()), 5000)

    return (
      <Router>
        <div className="App">
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
           <FeaturedSlider />
           <CategorySlider category={"mystery"} />
           <CategorySlider category={"fiction"} />
    </motion.div>
  );
}

function Categories() {
  const [fetchedCategories, setFetchedCategories] = useState([]) 
  const getCategories = async () => {
      let books = await fetch(`http://localhost:4000/category`, {
          method : "GET",
          headers : {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          },
      })
      let res = await books.json();
      // first cat only, cause may find more ..
      setFetchedCategories(res.data.categories)
  }
  useEffect(() => {
    getCategories()
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
