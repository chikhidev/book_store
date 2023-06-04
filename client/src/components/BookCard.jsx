import { Link, useNavigate } from "react-router-dom";
import { TOGGLE_BOOK_FAV } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/single-book.css"
const display = (text, n) => {
  let len = text.length;
  let long = false;
  if (len > n) {
    long = true;
    len = n;
  }
  let processed = "";
  for (let i = 0; i < len; i++) {
    processed += text[i];
  }
  return long ? processed + "..." : processed;
};

const BookCard = ({ book }) => {
  const loc = useLocation()
  const navigate = useNavigate()
  const userToken = useSelector(state => state.token)
  const loginStatus = useSelector(state => state.loginStatus);
  const [logged, setLogged] = useState(loginStatus);
  const handleCardClick = (e) => {
    const target = e.target;
    if (
      target.classList.contains("book-icons") ||
      target.closest(".book-icons")
    ) {
      e.preventDefault();
      return;
    }

    store.dispatch(TOGGLE_BOOK_FAV(book._id));
  };


    
  
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loginStatus);
    });
    return unsubscribe;
  }, [loginStatus]);
    return (
            <div  className="book-single-link p-4 cursor-pointer" onClick={() => navigate(`/book/${book._id}`)}>


              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                
              >
                <img
                  src={"http://localhost:4000" + book.imageUrl}
                  alt={book.title}
                  className="h-full w-full object-cover object-center hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{book.publisher}</h3>
              <p className="mt-1 text-lg font-medium flex w-full justify-between text-blue-800">
                {book.price}$
                <div
                            className={`book-heart-icon`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>

                        </div>
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900">{display(book.title, 20)}</p>
              
              
              





            </div>
    )
}
export default BookCard