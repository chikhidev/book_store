import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import store from '../redux/store';
import { useState, useEffect } from "react"
import { TOGGLE_BOOK_FAV } from '../redux/actions';
import ThreeDotsWave from './FramerMotion/ThreeDotWave';
import data from "../data.json"
import Card from './BookCard'
import '../css/index.css';
import '../css/hero.css';
import '../js/index.js';
import { swiperBreakPoints } from '../js/index.js';

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


const FeaturedSlider = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]) 

    const fetchBooksByPage = async (page) => {
        let books = await fetch(`http://localhost:4000/book?page=${page}`, {
            method : "GET",
        })
    console.log("run fetch  books");
    let res = await books.json();
        setFeaturedBooks(res.data.books)
    }
    useEffect(() => {
        fetchBooksByPage(1)
    }, [])

    return (
        <section className="featured-book-section book-section">
            <div className="featured-header section-header">
                <div className="featured-title">
                    Suggested Books :
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
                {featuredBooks.length > 0 ?
                featuredBooks.map(
                (book) => {
                    return (
                        <SwiperSlide key={book._id} >
                            <Card book={book} />
                        </SwiperSlide>
                    )
                }
                ): <ThreeDotsWave />}
            </div>
            </Swiper>
        </section>
    )
} 

export default FeaturedSlider