import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGOUT, TOGGLE_BOOK_FAV } from '../redux/actions';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import NewBookCard from './NewBookCard';
import { motion } from "framer-motion"
import store from '../redux/store';
import "../css/new-books.css"
import { useNavigate } from 'react-router-dom';
const NewBooks = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortType, setSortType] = useState(searchParams.get("sort") || "asc")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [fetchedNewBooks, setFetchedNewBooks] = useState([]);
    const handleCategoryClick = (e, name) => {
        navigate(`${`category?name=${name}`}`)
    }
    const handleClick = (e) => {
        setSortType(e.target.value);
    }
    
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
    const unsubscribe = store.subscribe( () => {
    })
    return () => {
        unsubscribe();
    }
}, [sortType]); // Re-fetch books when favBooks changes in the Redux store

useEffect(() => {
   setCategories(store.getState().categories)
}, []); // Re-fetch books when favBooks changes in the Redux store

 


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
            Availibility : 
            <div className="options-grp">
                <label htmlFor="in-stock">in stock</label>
                <input
                name="in-stock" 
                defaultChecked={sortType == "desc" ? true : false} 
                type='radio' onClick={handleClick} 
                value="in-stock"
                id="in-stock"/>
            </div>
            <div className="options-grp">
                <label htmlFor="out-stock">out stock</label>
                <input
                name="out-stock" 
                defaultChecked={sortType == "desc" ? true : false} 
                type='radio' onClick={handleClick} 
                value="out-stock"
                id="out-stock"/>
            </div>
            Price : 
            <input className='price-from' />
            <input className='price-to' />
            {store.getState().categories.length > 0 ? 
            <div>
                {categories.map(cat =>  <div onClick={(e) => handleCategoryClick(e, cat.name)}>{cat.name} ({cat.books.length})</div>)}
            </div>
            : ""
            }

        </div>
        <div className={`new-books ${loading ? "center-loading" : ""}`}>
            {loading ?
                <h2><ThreeDotsWave /></h2>
                :
                <>
                {fetchedNewBooks.length > 0 ? (
                    fetchedNewBooks.map((book) => <NewBookCard book={book} key={book._id} />)
                    ) : (
                    <h2><ThreeDotsWave centerInScreen={true} /></h2>
                    )}
            </>
            }
        </div>
    </motion.div>
  );
};

export default NewBooks;