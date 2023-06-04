import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { display } from '../js/index.js';
import '../css/single-book.css';
const ENDPOINT = "http://localhost:4000"
import Register from './Auth/Register.jsx';
import ThreeDotsWave from './FramerMotion/ThreeDotWave.jsx';
import { getCategory } from '../js/index.js';
import { Navigate } from 'react-router-dom';
import { mergeArraysRandomly } from '../js/index.js';
import { getHumanDate } from '../js/index.js';
import CategorySlider from './CategorySlider.jsx';
import BookCard from './BookCard.jsx';
import MoreLikeThis from "./MoreLikeThis"

const ProductDetails = () => {
    const { id } = useParams();
    const [isFetchRunned, setIsFetchRunned] = useState(false);
    const [fetchedBook, setFetchedBook] = useState(false);
    const [isBookFetched, setIsBookFetched] = useState(false);
    const [gotCats, setGotCats] = useState(false);
    const [qte, setQte] = useState(1);
    const [cats, setCats] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [orderMsg, setOrderMsg] = useState("")
    
    const orderBook = async () => {
        setLoading(true)
        let response = await fetch(`${ENDPOINT}/order`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body : JSON.stringify({
                book : id,
                shippingAddress : {"addressLine1": "123 Main Street",
                    "city": "New York",
                    "state": "NY",
                    "postalCode": "10001",
                    "country": "USA"}, 
                note : "note test",
                qte : qte
            })
        })
        let data = await response.json()
        console.log(data.sucess);
        setLoading(false)
        setOrderSuccess(data.success)
        if (!data.success)
            {
                setErrorMsg(data.data.message)
                Swal.fire({title : data.data.message, icon: "error"})
            }
            else 
            {
                Swal.fire(data.data.message)
                setOrderMsg(data.data.message)
            }
    }
    const getBook = async () => {
        setGotCats(false);
        try {
            const book = await fetch(`http://localhost:4000/book/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const bookRes = await book.json();
            const categoriesIds = bookRes.data.book.categories;

            setFetchedBook(bookRes.data.book);
            setIsBookFetched(bookRes.success);
            setIsFetchRunned(true);

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
    const incrementQte = () => {setQte(qte + 1)}
    const decrementQte = () => {if (qte > 1) setQte(qte - 1)}
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
                                        <div className="qte-container">
                                            <div className="qte-plus" onClick={incrementQte}>+</div>
                                                <div className="qte">{qte}</div>
                                            <div className="qte-minus" onClick={decrementQte}>-</div>
                                        </div>
                                        <button className={`${loading ? "loading-btn" : ""} book-single-cta-buy-btn`}
                                            onClick={orderBook}>
                                            {!loading && "Buy Now"}
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
            <span>more like <i><b>{fetchedBook.title}</b></i></span>
                    <MoreLikeThis cats={cats} />
            </div>
        </>
    );
};

export default ProductDetails;
