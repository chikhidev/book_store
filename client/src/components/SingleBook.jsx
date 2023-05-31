import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { display } from '../js/index.js';
import '../css/single-book.css';
const ENDPOINT = "http://localhost:4000"
import Register from './Register.jsx';
import ThreeDotsWave from './FramerMotion/ThreeDotWave.jsx';
import { getCategory } from '../js/index.js';
import { Navigate } from 'react-router-dom';
import { mergeArraysRandomly } from '../js/index.js';
import CategorySlider from './CategorySlider.jsx';
import BookCard from './BookCard.jsx';
import MoreLikeThis from "./MoreLikeThis"
const SingleBook = () => {
    const { id } = useParams();
    const [isFetchRunned, setIsFetchRunned] = useState(false);
    const [fetchedBook, setFetchedBook] = useState(false);
    const [isBookFetched, setIsBookFetched] = useState(false);
    const [gotCats, setGotCats] = useState(false);
    const [cats, setCats] = useState([]);

    const getHumanDate = (dateStr) => {
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return formattedDate
    }
  
    const getBook = async () => {
        setGotCats(false);
        try {
            const book = await fetch(`http://localhost:4000/book/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNjMmE4Mjk4ZDQ2N2ZiNTQ4YjBiYSIsImlzQWRtaW4iOnRydWUsInVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoiZ291emkuZGV2QGdtYWlsLmNvbSIsImlhdCI6MTY4MzQ4NTI5NSwiZXhwIjoxNjgzNjU4MDk1fQ.Df8saqtW7_LIvcYbIgljryvTjtie_4-Kp5krJGyx4c0",
                },
            });
            const bookRes = await book.json();
            const categoriesIds = bookRes.data.book.categories;

            setFetchedBook(bookRes.data.book);
            setIsBookFetched(bookRes.success);
            setIsFetchRunned(true);
            console.log(bookRes.data.book);

            if (!gotCats) {
                const categoryPromises = categoriesIds.map((catId) => getCategory(catId));
                const categoryResults = await Promise.all(categoryPromises);
                const filteredCategories = categoryResults.filter((cat) => cat !== null);
                if (filteredCategories.length > 0) setCats(filteredCategories);
                setGotCats(true);
            }
        } catch (error) {
            console.log("Error retrieving book:", error);
        }
    };

    useEffect(() => {
        if (!isFetchRunned) {
            getBook();
        }
    }, [id]);

    return (
        <>
            {isFetchRunned ? (
                isBookFetched && fetchedBook ? (
                    <div key={fetchedBook._id} 
                    className="book-single-container">
                        <div className="book-single-row-one">
                            {/* img */}
                            <div className="book-single-col-one">
                                <img className="book-single-imageUrl" src={"http://localhost:4000" + fetchedBook.imageUrl} />
                            </div>
                            {/* book details */}
                            <div className="book-single-col-two">
                                <div className="book-single-title">{fetchedBook.title}</div>
                                <div className="book-single-author">{fetchedBook.author}</div>
                                <div className="book-single-categories">
                                    {gotCats && cats.length > 0 ? "Categories : " : ""}
                                    {gotCats && cats.length == 1 ? "Category : " : ""}
                                    {
                                      gotCats ? 
                                          cats.length > 0 ? (
                                            cats.map((category) => 
                                                <span onClick={() => <Navigate to={"to"} />} className='book-single-category'>
                                                      {(category.name + " ")}
                                                </span>
                                            )
                                          ) : <p>Categories : unknown</p>
                                      : <i>Loading</i>
                                    }
                                    
                                </div>
                                {/* cta = call to action */}
                                <div className="book-single-cta">
                                    <div className="book-single-cta-info cta-section-1">
                                        <div className="book-single-publish-details">
                                            <div className="book-single-cta-book-type">
                                                PaperBack
                                            </div>
                                            <div className="book-single-cta-publisher">
                                                {fetchedBook.publisher} 
                                            </div>
                                        </div>
                                        <div className="book-single-cta-publication-date">
                                            {getHumanDate(fetchedBook.publicationDate)}
                                        </div>
                                    </div>
                                    <div className="book-single-cta-buy cta-section-2">
                                        <div className="book-single-cta-buy-price">
                                            ${fetchedBook.price}
                                        </div>
                                        <button className="book-single-cta-buy-btn">
                                            ADD TO CART 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="book-single-row-two">
                            <div className="book-single-details-title">About <i>{fetchedBook.title}</i></div>
                            <div className="book-single-details-description">{fetchedBook.description}</div>
                        </div>
                        <div className="book-single-row-three">
                        
                        </div>
                    </div>
                ) : (
                    <span>Book doesn't exist</span>
                )
            ) : (
                <ThreeDotsWave />
                
            )}
            <div className="more-books-container">
                    <MoreLikeThis cats={cats} />
            </div>
        </>
    );
};

export default SingleBook;
