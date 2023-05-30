import { Link, useNavigate } from "react-router-dom";
import { TOGGLE_BOOK_FAV } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { useState, useEffect } from "react";
import "../css/new-books.css"
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

const NewBookCard = ({ book }) => {
  const navigate = useNavigate()
  const userToken = useSelector(state => state.token)

  const [isBookFav, setIsBookFav] = useState("");

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

  const toggleFavBook = async (token, bookId) => {
    fetch(`http://localhost:4000/fav/${bookId}`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    })
  }

  const fetchIsBookFav = async (token, bookId) => {
    try {
      const response = await fetch(`http://localhost:4000/fav/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const res = await response.json();
      setIsBookFav(res.data.isFav);
    } catch (error) {
      // Handle any errors during the fetch
      console.error("Error fetching book favorite status:", error);
    }
  };
  
  const handleHeartIconClick = (e) => {
    let loginStatus = store.getState().loginStatus
    if (loginStatus == true) {
      store.dispatch(TOGGLE_BOOK_FAV(book._id))
      toggleFavBook(userToken, book._id)
      let favs = store.getState().favBooks
      // console.log("fav books are ");
      // console.log(favs);
      // console.log("id => ");
      // console.log(book._id);
      
      e.currentTarget.classList.toggle("heart-active")
    }
    else {
      navigate("/login");
    }
  }
    useEffect(() => {
    // fetchIsBookFav(userToken, book._id);
  }, [userToken, book._id, isBookFav]);
  
    return (
            <Link to={`book/${book._id}`} className="new-book-single-link">
               <div key={book._id} className="new-book-card" onClick={handleCardClick}>
                    <div className="new-book-img-container">
                        <div className="new-book-icons">
                            <div
                                onClick = { handleHeartIconClick }
                                className={`new-book-heart-icon ${isBookFav == true ? "heart-active" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <div className="new-book-cart-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                        </div>
                        <img className="new-book-imageUrl" src={"http://localhost:4000" + book.imageUrl}/>
                    </div>
                    <div className="new-book-title">{display(book.title, 17)}</div>
                    <hr className="line"></hr>
                    <div className="author-label-call-to-action-container">
                        <div className="author-label">Writer</div>
                        <div className="call-to-action">Buy now</div>
                    </div>
                    <div className="author-price-container">
                        <div className="new-book-author">{display(book.publisher, 10)}</div>
                        <div className="new-book-price">${book.price}</div>
                    </div>
                </div>
            </Link>
    )
}
export default NewBookCard