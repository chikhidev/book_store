import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import store from '../redux/store';
import { useState, useEffect } from "react"
import data from "../data.json"
import Card from './BookCard'
import '../css/index.css';
import '../css/hero.css';
import '../js/index.js';
import { display, capitalize } from '../js/index.js';

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
    const [categoryBooks, setCategoryBooks] = useState([]) 
    const fetchBooksByCategory = async (category) => {
        let books = await fetch(`http://localhost:4000/category?name=${category}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
        })
        let res = await books.json();
        console.log(res);
        setCategoryBooks(res.data.categories[0].books)
    }
    useEffect(() => {
        fetchBooksByCategory(category)
    }, [])

    return (
        <section className="featured-book-section book-section">
            <div className="featured-header">
                <div className="featured-title">
                    {capitalize(category)} :
                </div>
            </div>
            <Swiper
            spaceBetween={0}
            slidesPerView={4}
            breakpoints={{
                2000: {
                slidesPerView: 6,
                },
                1666: {
                slidesPerView: 5,
                },
                1366: {
                slidesPerView: 4,
                },
                1000: {
                slidesPerView: 3,
                },
                768: {
                width: 768,
                slidesPerView: 2,
                },
                400: {
                slidesPerView : 1
                }
            }}
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
                            <Card book={book} />
                        </SwiperSlide>
                    )
                }
                ): <h1>LOADING</h1>}
            </div>
            </Swiper>
        </section>
    )
} 

export default CategorySlider