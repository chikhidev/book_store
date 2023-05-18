import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { display } from '../js/index.js';

const SingleBook = () => {
    const { id } = useParams();
    const [fetchedBook, setFetchedBook] = useState();
    const [success, setSuccess] = useState(false);
    
    let getBook = async () => {
        let book = await fetch(`http://localhost:4000/book/${id}`, {
        method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNjMmE4Mjk4ZDQ2N2ZiNTQ4YjBiYSIsImlzQWRtaW4iOnRydWUsInVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoiZ291emkuZGV2QGdtYWlsLmNvbSIsImlhdCI6MTY4MzQ4NTI5NSwiZXhwIjoxNjgzNjU4MDk1fQ.Df8saqtW7_LIvcYbIgljryvTjtie_4-Kp5krJGyx4c0",
            },
        })
        let res = await book.json()
        setFetchedBook(res.data.book)
        setSuccess(res.success)
        console.log(res.data.book);
    }
   useEffect(() => {
        getBook();
    }, [id]);

    return (
        <>
            {success && fetchedBook ?  
                <div key={fetchedBook._id} className='book-single-card'>
                {/* i still dont know how the icons should appear lol  */}
                    {/* <div className="book-single-icons">
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
                    </div> */}
                    <img className="book-single-imageUrl" src={"http://localhost:4000" + fetchedBook.imageUrl}/>
                    <div className="book-single-title">{display(fetchedBook.title, 20)}</div>
                    <hr className="line"></hr>
                    <div className="author-label-call-to-action-container">
                        <div className="author-label">Writer</div>
                        <div className="call-to-action">Buy now</div>
                    </div>
                    <div className="author-price-container">
                        <div className="book-single-author">{display(fetchedBook.publisher, 10)}</div>
                        <div className="book-single-price">${fetchedBook.price}</div>
                        <div className='book-single-categories'>
                            {fetchedBook.categories.length > 0 ?
                                fetchedBook.categories.map((category) => {
                                    return (
                                        <div className="book-single-category">
                                            {category.name}
                                        </div>
                                    )   
                                })
                                : ""
                            }
                        </div>
                    </div>
                </div>
                
             : <h1>LOADING NGIGer</h1>}

        </>
    )

}
export default SingleBook