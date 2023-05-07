import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import store from '../redux/store';


import data from '../data.json';

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
  

const FeaturedSection = () => {
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
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    <div className="featured-arrows">
                        <SlidePrevButton/>
                        <SlideNextButton/>
                    </div>
                    <div className="book-cards">
                        {data.books.map(
                        (book) => {
                            return (
                            <SwiperSlide key={book._id.$oid} className="book-card">
                                {/* i still dont know how the icons should appear lol  */}
                                <div className="book-icons">
                                    <div className="book-heart-icon">
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
                                <img className="book-imageUrl" src={book.imageUrl}/>
                                <div className="book-title">{display(book.title, 20)}</div>
                                <hr className="line"></hr>
                                <div className="author-label-call-to-action-container">
                                    <div className="author-label">Writer</div>
                                    <div className="call-to-action">Buy now</div>
                                </div>
                                    <div className="author-price-container">
                                        <div className="book-author">{display(book.author, 6)}</div>
                                        <div className="book-price">${book.price}</div>
                                    </div>
                            </SwiperSlide>
                            )
                        }
                        )}
                    </div>
                </Swiper>
        </section>
    )
  }

  export default FeaturedSection