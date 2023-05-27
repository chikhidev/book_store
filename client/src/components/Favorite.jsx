import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './BookCard';

const Favorite = () => {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const favBooks = useSelector((state) => state.favBooks); // Accessing favBooks from Redux store
  const dispatch = useDispatch();

  const fetchBooks = async () => {
    const promises = favBooks.map(async (id) => {
      const response = await fetch(`http://localhost:4000/book/${id}`);
      const data = await response.json();
      const book = data.data.book;
      return book;
    });

    const books = await Promise.all(promises);
    setFetchedBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, [favBooks]); // Re-fetch books when favBooks changes in the Redux store


  return (
    <div className='favorite-books'>
      {fetchedBooks.length > 0 ? (
        fetchedBooks.map((book) => <Card book={book} key={book._id} />)
      ) : (
        <h1>Loading Books</h1>
      )}
    </div>
  );
};
export default Favorite;