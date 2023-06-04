import { Link } from "react-router-dom";
import { TOGGLE_BOOK_FAV } from "../redux/actions";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { SERVER_ENDPOINT } from "../js";

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

const Card = ({ book }) => {
  const handleClick = (e) => {
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

    return (
            <Link to={`book/${book._id}`} >
               <div key={book._id} className="book-card" onClick={handleClick}>
                    <div className="book-icons">
                        <div
                            onClick = {
                                () => {
                                    store.dispatch(TOGGLE_BOOK_FAV(book._id))
                                }
                            }
                            className="book-heart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <div className="book-cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                    </div>
                    <img className="book-imageUrl" src={`${SERVER_ENDPOINT}${book.imageUrl}`}/>
                    <div className="book-title">{display(book.title, 18)}</div>
                    <hr className="line"></hr>
                    <div className="author-label-call-to-action-container">
                        <div className="author-label">Writer</div>
                        <div className="call-to-action">Buy now</div>
                    </div>
                    <div className="author-price-container">
                        <div className="book-author">{display(book.publisher, 10)}</div>
                        <div className="book-price">${book.price}</div>
                    </div>
                </div>
            </Link>
    )
}
export default Card