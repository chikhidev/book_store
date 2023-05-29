import {useSearchParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import ThreeDotsWave from './FramerMotion/ThreeDotWave'
import Card from './BookCard'
import "../css/search.css"
const Search = () => {
    const [currSearchPage, setCurrSearchPage] = useState(1)
    const [searchResCount, setSearchResCount] = useState(0)
    const [totalBooksCount, setTotalBooksCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [foundBooks, setFoundBooks] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [buttonsState, setButtonsState] = useState({
        prev : false,
        next : false
    })
    const [bookTitle, setBookTitle] = searchParams.get("name") 
    const handlePaginationNext = (e) => {
        if (currSearchPage != totalPages)
            setCurrSearchPage(currSearchPage+1)
    }
    const handlePaginationPrev = (e) => {
        if (currSearchPage != 1)
            setCurrSearchPage(currSearchPage-1)
    }
    // fetch that book
    const getBookByTitle = async () => {
        let response = await fetch(`http://localhost:4000/book?title=${bookTitle}&page=${currSearchPage}`, {
            method : "GET",
            }
         )
        let res = await response.json();
        setSearchResCount(res.totalBooksCount)
        setTotalBooksCount(res.totalBooksCount)
        setTotalPages(res.totalPages)
        setFoundBooks(res.data.books)
    }
    useEffect( () => { getBookByTitle() }, [bookTitle, currSearchPage] )
    useEffect(() => {
        setButtonsState({
          prev: currSearchPage === 1,
          next: currSearchPage === totalPages,
        });
      }, [currSearchPage, totalPages]);
    return (
        <div className='search-container'>
            <div className="search-count"> Found {searchResCount} Books:</div>
            <motion.div className='search-result'
                initial={{opacity : 0}}
                animate={{opacity : 1}}
                exit={{opacity : 0}}
            >
                {
                    foundBooks.length > 0 ? 
                        foundBooks.map(
                            book => {
                                return (<Card book={book} />)
                        } )
                        
                    : <ThreeDotsWave />
                }
            </motion.div>
            {/* paggination */}
           <div className="pagination-btns">
                <button disabled={buttonsState.prev} className='pagination-prev' onClick={handlePaginationPrev}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"   >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                </svg>

                </button>
                <button disabled={buttonsState.next} className='pagination-next' onClick={handlePaginationNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                    </svg>
                </button>
           </div>
        </div>

    )
}
export default Search