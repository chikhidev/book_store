import {useSearchParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from './Card'
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
        <h1>
            {
                foundBooks.length > 0 ? 
                    foundBooks.map(
                        book => {
                            return (<Card book={book} />)
                    } )
                : ""
            }
        </h1>
    )
}
export default Search