import {useSearchParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import ThreeDotsWave from './FramerMotion/ThreeDotWave'
import Card from './BookCard'
const Search = () => {
    const [foundBooks, setFoundBooks] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookTitle, setBookTitle] = searchParams.get("name") 
    // fetch that book
    let getBookByTitle = async () => {
        let response = await fetch(`http://localhost:4000/book?title=${bookTitle}`, {
            method : "GET",
            }
         )
        let res = await response.json();
        setFoundBooks(res.data.books)
    }
    useEffect( () => { getBookByTitle() }, [bookTitle] )
    return (
        <motion.h1
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
        </motion.h1>
    )
}
export default Search