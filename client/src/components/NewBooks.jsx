import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGOUT, TOGGLE_BOOK_FAV } from '../redux/actions';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import NewBookCard from './NewBookCard';
import { motion } from "framer-motion"

import "../css/new-books.css"

const NewBooks = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortType, setSortType] = useState(searchParams.get("sort") || "asc")
    const [loading, setLoading] = useState(false)
    const handleClick = (e) => {
        setSortType(e.target.value);
    }
    const [fetchedNewBooks, setFetchedNewBooks] = useState([]);
    
    const fetchNewBooks = async () => {
        setLoading(true)
        let books = await fetch(`http://localhost:4000/book/latest?sort=${sortType}`, {
            method : "GET",
        })
        let res = await books.json();
        // first cat only, cause may find more ..
        setLoading(false)
        setFetchedNewBooks(res.data.books);
  };

  useEffect(() => {
    fetchNewBooks();
}, [sortType]); // Re-fetch books when favBooks changes in the Redux store

 


return (
    <motion.div className='new-books-container'
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
    >
        <div className="new-books-options">
            <div className="options-grp">
                <label htmlFor="asc">asc :</label>
                <input
                name="sort"
                defaultChecked={sortType == "asc" ? true : false}
                type='radio' onClick={handleClick}
                value="asc" 
                id="asc"/>
            </div>
            <div className="options-grp">
                <label htmlFor="desc">desc :</label>
                <input
                name="sort" 
                defaultChecked={sortType == "desc" ? true : false} 
                type='radio' onClick={handleClick} 
                value="desc"
                id="desc"/>
            </div>
        </div>
        <div className='new-books'>
            {loading ?
                <h2><ThreeDotsWave /></h2>
                :
                <>
                {fetchedNewBooks.length > 0 ? (
                    fetchedNewBooks.map((book) => <NewBookCard book={book} key={book._id} />)
                    ) : (
                    <h2><ThreeDotsWave /></h2>
                    )}
            </>
            }
        </div>
    </motion.div>
  );
};

export default NewBooks;