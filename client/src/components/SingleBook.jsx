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


const SingleBook = () => {

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
            <>
                <section className="pt-12 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
                    <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap justify-center ms-4">
                        <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                            <div className="flex -mx-4 flex-wrap items-center justify-between lg:justify-center lg:items-start xl:items-center">
                                <div className="w-full sm:w-9/12 px-4">
                                    <img className="mb-5" src={"http://localhost:4000" + fetchedBook.imageUrl} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                        <div className="max-w-md mb-6">
                            <span className="text-xs text-gray-400 tracking-wider">{fetchedBook._id}</span>
                            <h2 className="mt-6 mb-4 text-4xl md:text-5xl lg:text-7xl font-heading font-medium">{fetchedBook.title}</h2>
                            <p className="flex items-center mb-6">
                            <span className="mr-2 text-lg text-blue-500 font-medium">$</span>
                            <span className="text-3xl text-blue-500 font-medium">{fetchedBook.price}</span>
                            </p>
                            <p className="text-lg text-gray-400">
                                {fetchedBook.description}
                                {/* {gotCats && cats.length > 0 ? "Categories : " : ""}
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
                                } */}
                            </p>
                        </div>
                        <div className="mb-8 d-flex flex-col ">
                            <h4 className="mb-3 font-heading font-medium">Qty:</h4>
                            <div className="qte-options d-flex gap-3">
                                <div onClick={decrementQte} className="qte-minus text-xl">-</div>
                                <input 
                                    value={qte} 
                                    onChange={(e) => setQte(e.target.value)} className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" placeholder="1"
                                />
                                <div onClick={incrementQte} className="qte-plus text-xl">+</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2 mb-12">
                            <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                                <a className={`${loading ? "loading-btn" : ""} block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl`} href="#"
                                onClick={orderBook}>
                                    {!loading && "Buy Now"}
                                </a>
                            </div>
                            <div className="w-full md:w-1/3 px-2">
                            <a className="flex w-full py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl" href="#">
                                <span className="mr-2">Wishlist</span>
                                <svg width="23" height="22" viewbox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </a>
                            </div>
                        </div>
                        <div>
                            <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                            <h3 className="text-lg font-heading font-medium">Shipping &amp; returns</h3>
                            <span>
                                <svg width="12" height="8" viewbox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z" fill="black"></path>
                                </svg>
                            </span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                <div className="more-books-container">
                    <span>more like <i><b>{fetchedBook.title}</b></i></span>
                            <MoreLikeThis cats={cats} />
                </div>
            </>
            ) : (
                    <span>Book doesn't exist</span>
                )
            ) : (
                <ThreeDotsWave />
            
        )}
        </>
    );
};

export default SingleBook