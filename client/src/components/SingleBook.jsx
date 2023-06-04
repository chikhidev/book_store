import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { display } from '../js/index.js';
import '../css/single-book.css';
import Register from './Auth/Register.jsx';
import ThreeDotsWave from './FramerMotion/ThreeDotWave.jsx';
import { getCategory } from '../js/index.js';
import { Navigate } from 'react-router-dom';
import { mergeArraysRandomly } from '../js/index.js';
import { getHumanDate } from '../js/index.js';
import CategorySlider from './CategorySlider.jsx';
import BookCard from './BookCard.jsx';
import MoreLikeThis from "./MoreLikeThis"
import store from "../redux/store";
import { SERVER_ENDPOINT } from '../js/index.js';

const SingleBook = () => {

    const { id } = useParams();
    const [isFetchRunned, setIsFetchRunned] = useState(false);
    const [fetchedBook, setFetchedBook] = useState(false);
    const [isBookFetched, setIsBookFetched] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [gotCats, setGotCats] = useState(false);
    const [qte, setQte] = useState(1);
    const [cats, setCats] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [orderMsg, setOrderMsg] = useState("")
//   const [user, setUser] = useState({})

    
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
            const book = await fetch(`${SERVER_ENDPOINT}/book/${id}`, {
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
    
    
    const checkFav = async () =>{
        const res = await fetch(`${SERVER_ENDPOINT}/fav/${id}`, {
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
            })
        const data = await res.json()
        setIsFav(data.data.isFav)
        console.log(data)

    }
    const handleFav = async () =>{
        const res = await fetch(`${SERVER_ENDPOINT}/fav/${id}`, {
            method : "POST",
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const data = await res.json()
        setIsFav(data.fav)
        console.log(data)
    }

    useEffect(() => {
        if (!isFetchRunned) {
            getBook();
            checkFav()
        }
        // getUser()
    }, [id]);


    return (
        <>
        {isFetchRunned ? (
            isBookFetched && fetchedBook ? (
            <>
                <section className="pt-8 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
                    
                    <div className="container px-4 mx-auto">
                            

                    <div className="flex flex-wrap justify-center ms-4">
                        <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                            <div className="flex -mx-4 flex-wrap items-center justify-between lg:justify-center lg:items-start xl:items-center">
                                <div className="w-full sm:w-9/12 px-4">
                                    <img className="mb-5 rounded-2xl" src={`${SERVER_ENDPOINT}${fetchedBook.imageUrl}`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                        <div className="max-w-md mb-6">
                            <span className="text-xs text-gray-400 tracking-wider">{fetchedBook._id}</span>
                            <div className="flex items-center py-2">
                                    <img class="w-12 h-12 rounded-2xl mr-4"
                                        src={`${SERVER_ENDPOINT}${fetchedBook.createdBy.avatar}`} alt="Rounded avatar"
                                    ></img>
                                    <p className=" flex items-center my-auto">
                                        {fetchedBook.createdBy.username}
                                        {
                                            fetchedBook.createdBy.isAdmin && 
                                            <div className="ml-2">
                                                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">admin</span>
                                            </div>
                                        }
                                    </p>
                            </div>
                            <h2 className="mt-6 mb-4 text-2xl md:text-3xl lg:text-4xl font-heading font-medium">{fetchedBook.title}</h2>
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
                                            ) : <p>
                                            Catégories : inconnues</p>
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
                                    {!loading && "Acheter maintenant"}
                                </a>
                            </div>
                            <div className="w-full md:w-1/3 px-2">
                            <a className="cursor-pointer flex w-full py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl" 
                                onClick = {
                                    handleFav
                                }
                            >
                                {
                                    isFav?
                                    <svg width="23" height="22" viewbox="0 0 23 22" fill="#000" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    :
                                    <svg width="23" height="22" viewbox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                }
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                <div className="more-books-container">
                    <span>plus comme: <i><b>{fetchedBook.title}</b></i></span>
                            <MoreLikeThis cats={cats} />
                </div>
            </>
            ) : (
                    <span>Le livre n'existe pas
                    </span>
                )
            ) : (
                <ThreeDotsWave />
            
        )}
        </>
    );
};

export default SingleBook