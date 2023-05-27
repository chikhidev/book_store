import { useState, useEffect, createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/card.css';
import './js/index.js';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FeaturedSlider from './components/FeaturedSlider';
import CategorySlider from './components/CategorySlider';
import CreateBookForm from './components/CreateBookForm';
import Search from './components/Search';
import Favorite from './components/Favorite';
import Account from './components/Account';
import SingleBook from './components/SingleBook';
import NewBooks from './components/NewBooks';
import store from './redux/store';
import { LOGIN, LOGOUT, SET_USER_DETAILS } from './redux/actions';
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
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/new" element={<NewBooks/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/favorite" element={isLogged ? <Favorite/> : <Navigate to="/login" />} />
            <Route path="/book/:id" element={<SingleBook/>} />
            <Route path="/store/book/create" element={isLogged ? <CreateBookForm/> : <Navigate to="/login" /> } />
            <Route path="/login" element={isLogged ? <Navigate to="/"/> : <Login />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
            <Route path="/search" element={<Search />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
            <Route path="/search/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
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
           <CategorySlider category={"mystery"} />
           <CategorySlider category={"fiction"} />
    </div>
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
      <div className="hero featured">
        {fetchedCategories.length > 0 ? 
        fetchedCategories.map(cat => {
          return <CategorySlider category={cat.name} />
        })
        : <h1>LOADING</h1>}
      </div>
  )
}

export {App};
