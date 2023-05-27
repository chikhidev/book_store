import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './BookCard';

const Favorite = () => {
  const [favs, setFavs] = useState([]); // Accessing favBooks from Redux store

  const userToken = useSelector((state) => state.token)
  const dispatch = useDispatch();

  const fetchFavBooks = async (token) => {
    let books = await fetch(`http://localhost:4000/fav`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    })
    let res = await books.json();
    setFavs(res.data)
  }
  
  useEffect(() => {
      // fetchFavBooks(userToken)
  }, [])

  return (
    <div className='favorite-books'>
      {favs.length > 0 ? (
        favs.map((fav) => <Card book={fav.book} key={fav.book._id} />)
      ) : (
        <h1>Loading Books</h1>
      )}
    </div>
  );
};

export default Favorite;