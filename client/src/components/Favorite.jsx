import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion"
import ThreeDotsWave from './FramerMotion/ThreeDotWave'
import NewBookCard from './NewBookCard'
import "../css/search.css"
import store from '../redux/store';
import { SERVER_ENDPOINT } from "../js";
const Favorite = () => {
  const [favs, setFavs] = useState([]); // Accessing favBooks from Redux store
  const loginStatus = useSelector(state => state.loginStatus);
  const [logged, setLogged] = useState(loginStatus);

  const userToken = useSelector((state) => state.token)
  const dispatch = useDispatch();

  const fetchFavBooks = async () => {
    let books = await fetch(`${SERVER_ENDPOINT}/fav`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userToken}`,
        },
    })
    let res = await books.json();
    setFavs(res.data)
  }
  
  useEffect(() => {
    logged ?  fetchFavBooks()  : ""
  }, [favs, userToken]); // Re-fetch books when favBooks changes in the Redux store
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loginStatus);
    });
    return unsubscribe;
  }, [loginStatus]);

  return (
    <div className='new-books-container'>
      <div className='new-books'>
            <motion.div className='search-result'
                initial={{opacity : 0}}
                animate={{opacity : 1}}
                exit={{opacity : 0}}
            >
                {
                    favs.length > 0 ? 
                      favs.map((fav) => <NewBookCard book={fav.book} key={fav.book._id} />)
                    : <ThreeDotsWave />
                }
            </motion.div>
        </div>
    </div>
  );
};

export default Favorite;