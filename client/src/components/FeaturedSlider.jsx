import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import store from '../redux/store';
import { useState, useEffect } from "react"
import data from "../data.json"
import Card from './Card'
import '../css/index.css';
import '../css/hero.css';
import '../js/index.js';


const display = (text, n) => {
    let len = text.length;
    let long = false;
    if (len > n)
    {
      long = true
      len = n;
    }
    else {
    }
    let processed = "";
    for (let i = 0; i < len; i++)
    {
      processed += text[i];
    }
    return (long ? processed + "..." : processed);
}

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


const FeaturedSlider = () => {
    let page = 1;
    const [featuredBooks, setFeaturedBooks] = useState([]) 
    const fetchBooksByPage = async (page) => {
        let books = await fetch(`http://localhost:4000/book?page=${page}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNjMmE4Mjk4ZDQ2N2ZiNTQ4YjBiYSIsImlzQWRtaW4iOnRydWUsInVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoiZ291emkuZGV2QGdtYWlsLmNvbSIsImlhdCI6MTY4MzQ4NTI5NSwiZXhwIjoxNjgzNjU4MDk1fQ.Df8saqtW7_LIvcYbIgljryvTjtie_4-Kp5krJGyx4c0",
            },
        })
        let res = await books.json();
        setFeaturedBooks(res.data.books)
    }
    useEffect(() => {
        fetchBooksByPage(1)
    }, [])

    return (
        <section className="featured-book-section book-section">
            <div className="featured-header">
                <div className="featured-title">
                    Suggested Books :
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
                {featuredBooks.length > 0 ?
                featuredBooks.map(
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

export default FeaturedSlider