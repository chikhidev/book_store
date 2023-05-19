import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGOUT, TOGGLE_BOOK_FAV } from '../redux/actions';
import Card from './Card';

const NewBooks = () => {
    const [sortType, setSortType] = useState("asc")
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
    <div className='new-books'>
        {loading ?
            <h2>Wait ...</h2>
        :
        <>
            asc :
            <input name="sort" type='radio' onClick={handleClick} value="asc" />
            desc :
            <input name="sort" type='radio' onClick={handleClick} value="desc" />
        {fetchedNewBooks.length > 0 ? (
            fetchedNewBooks.map((book) => <Card book={book} key={book._id} />)
        ) : (
            <h1>Loading Books</h1>
        )}
        </>
        }
    </div>
  );
};

export default NewBooks;