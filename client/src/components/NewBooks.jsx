import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGOUT, TOGGLE_BOOK_FAV } from '../redux/actions';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import BookCard from './BookCard';
import { motion } from "framer-motion"
import store from '../redux/store';
import "../css/new-books.css"
import { useNavigate } from 'react-router-dom';
import { SERVER_ENDPOINT } from "../js";
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
        let books = await fetch(`${SERVER_ENDPOINT}/book/latest?sort=${sortType}`, {
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
    <div>

        <div className="flex flex-column px-24 py-2">
            <div className="flex py-4 w-full">
                <div className="options-grp mr-2">

                <label htmlFor="asc">asc :</label>
                <input
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  '
                name="sort"
                defaultChecked={sortType == "asc" ? true : false}
                type='radio' onClick={handleClick}
                value="asc" 
                id="asc"/>
                </div>
                <div className="options-grp mr-2">
                <label htmlFor="desc">desc :</label>
                <input
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  '
                name="sort" 
                defaultChecked={sortType == "desc" ? true : false} 
                type='radio' onClick={handleClick} 
                value="desc"
                id="desc"/>
                </div>
            </div>
            {/* Price : 
            <input className='price-from' />
            <input className='price-to' /> */}
            {store.getState().categories.length > 0 ? 
            <div className='flex flex-wrap '>
                {categories.map(cat =>  
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded cursor-pointer"
                onClick={(e) => handleCategoryClick(e, cat.name)}
                >
                    {cat.name} ({cat.books.length})
                </span>
                
                )}
            </div>
            : ""
            }




        </div>

            <motion.div className='new-books-container'
                initial={{opacity : 0}}
                animate={{opacity : 1}}
                exit={{opacity : 0}}
                >
            
                <div className={`w-full ${loading ? "center-loading" : ""} `}>
                    {loading ?
                        <h2><ThreeDotsWave /></h2>
                        :
                        <div className="flex flex-wrap w-full justify-center">
                        {fetchedNewBooks?.length > 0 ? (
                            fetchedNewBooks?.map((book) => 
                                <div className="w-80">
                                    <BookCard book={book} key={book._id} className="w-80" />
                                </div>
                            )
                            ) : (
                                <h2><ThreeDotsWave centerInScreen={true} /></h2>
                                )}
                    </div>
                    }
                </div>
            </motion.div>
    </div>
  );
};

export default NewBooks;