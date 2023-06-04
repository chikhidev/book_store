import {useSearchParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import ThreeDotsWave from './FramerMotion/ThreeDotWave'
import NewBookCard from './NewBookCard'
import "../css/search.css"

const CategoryPage = () => {
    const [currSearchPage, setCurrSearchPage] = useState(1)
    const [categoryName, setCategoryName] = useState("")
    const [searchResCount, setSearchResCount] = useState(0)
    const [totalBooksCount, setTotalBooksCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [foundCatBooks, setFoundCatBooks] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [buttonsState, setButtonsState] = useState({
        prev : false,
        next : false
    })
    const [categoryQuery, setCategoryQuery] = useState(searchParams.get("name"))
    const handlePaginationNext = (e) => {
        if (currSearchPage != totalPages)
            setCurrSearchPage(currSearchPage+1)
    }
    const handlePaginationPrev = (e) => {
        if (currSearchPage != 1)
            setCurrSearchPage(currSearchPage-1)
    }
    // fetch that book
    const getCatBooks = async () => {
        let response = await fetch(`http://localhost:4000/category?name=${categoryQuery}&page=${currSearchPage}`, {
            method : "GET",
            }
         )
        let res = await response.json();
        setCategoryName(res.data.categories[0].name)
        setFoundCatBooks(res.data.categories[0].books)
    }
    useEffect( () => { getCatBooks();}, [searchParams.get("name"), categoryQuery, currSearchPage] )
   
    return (
        <div className='search-container w-full flex flex-col justify-center items-center mx-auto my-20'>
            <div className='search-count text-2xl font-semibold'>
                {categoryName.length > 0 ? `${categoryName} : ` : <ThreeDotsWave />}
            </div>
            <motion.div
                className='search-result flex flex-wrap justify-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {foundCatBooks.length > 0 ? (
                foundCatBooks.map((book) => {
                    return <NewBookCard book={book} />;
                })
                ) : (
                <ThreeDotsWave />
                )}
            </motion.div>
        </div>

    )
}
export default CategoryPage