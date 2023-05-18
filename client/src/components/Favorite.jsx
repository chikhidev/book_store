import { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import store from '../redux/store';
import { LOGIN, LOGOUT, TOGGLE_BOOK_FAV } from '../redux/actions';
import Card from './Card';

const Favorite = () => {
  const [fetchedBooks, setFetchedBooks] = useState([]);

  const fetchBooks = async () => {
    const bookIds = store.getState().favBooks; // Assuming you have favBooks stored in your Redux store
  
    const promises = bookIds.map(async (id) => {
      const response = await fetch(`http://localhost:4000/book/${id}`);
      const data = await response.json();
      let book = data.data.book;
      return book;
    });
  
    const books = await Promise.all(promises);
    setFetchedBooks(books);
    console.log(books);
    
  };
  
  useEffect(() => {
    fetchBooks();
  }, []);

  // Rest of your component code
    return (
        <div className='favorite-books'>
        {fetchedBooks.length > 0 ?
          fetchedBooks.map(book => {
            return (<Card book={book} key={book._id} />)
          })
        :
        ""
        }
      </div>
    )
}
export default Favorite