import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import store from '../redux/store';
import { useState, useEffect } from "react"
import data from "../data.json"
import BookCard from './BookCard'
import '../css/index.css';
import '../css/hero.css';
import '../js/index.js';
import { display, capitalize } from '../js/index.js';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import { swiperBreakPoints } from '../js/index.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SERVER_ENDPOINT } from "../js";

function SlideNextButton() {
    const swiper = useSwiper();
    return (
      <div onClick={() => swiper.slideNext()} className="right-arrow">
      <svg xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
      </svg>
      </div>
    );
}

function SlidePrevButton() {
    const swiper = useSwiper();
    return (
      <div onClick={() => swiper.slidePrev()} className="left-arrow">
          <svg xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
      </div>
    );
}

const addBookFav = () => {
    store.dispatch({type : "ADD_BOOK_FAV"})
}

const remBookFav = () => {
    store.dispatch({type : "REM_BOOK_FAV"})
}

const CategorySlider = ({category}) => {
    const navigate = useNavigate()
    const [categoryBooks, setCategoryBooks] = useState([]) 
    const fetchBooksByCategory = async (category) => {
        let books = await fetch(`${SERVER_ENDPOINT}/category?name=${category}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
        })
        let res = await books.json();
        setCategoryBooks(res.data.categories[0].books)
    }
    useEffect(() => {
        fetchBooksByCategory(category)
    }, [])

    return (
        <section className="featured-book-section book-section">
            <div className="featured-header">
                <div onClick={() => navigate(`${`category?name=${category}`}`)} className="featured-title">
                    {capitalize(category)}
                </div>
            </div>
            <Swiper
            spaceBetween={0}
            slidesPerView={4}
            breakpoints={swiperBreakPoints}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // onReachEnd={console.log("\nhi im in the end \n")}
            >
            <div className="featured-arrows">
                <SlidePrevButton/>
                <SlideNextButton/>
            </div>
            <div className="book-cards">
                {categoryBooks.length > 0 ?
                categoryBooks.map(
                (book) => {
                    return (
                        <SwiperSlide key={book._id} >
                            {/* i still dont know how the icons should appear lol  */}
                            <BookCard book={book} />
                        </SwiperSlide>
                    )
                }
                ) : <ThreeDotsWave />}
            </div>
            </Swiper>
        </section>
    )
} 

export default CategorySlider