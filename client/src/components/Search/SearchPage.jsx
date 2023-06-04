import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BookCard from "../BookCard";
import ThreeDotsWave from "../FramerMotion/ThreeDotWave";
import { display } from "../../js";
const SearchPage = ()=> {
  
  const [currSearchPage, setCurrSearchPage] = useState(1)
  const [searchResCount, setSearchResCount] = useState(0)
  const [totalBooksCount, setTotalBooksCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [foundBooks, setFoundBooks] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(null)
  const [buttonsState, setButtonsState] = useState({
      prev : false,
      next : false
  })
    const [searchQuery, setSearchQuery] = useState("")
    const [searchError, setSearchError] = useState(false)

  const handleSearchChange = (e) => {
    setLoading(true)
    setSearchQuery(e.target.value)
    setCurrSearchPage(1)
    // Delay the execution of getBooks after 500ms
    setTimeout(() => {
      getBooks(setSearchQuery);
    }, 500);
  }
  const handlePaginationNext = (e) => {
    if (currSearchPage != totalPages)
    {
        setCurrSearchPage(currSearchPage+1)
        setFoundBooks([])
        getBooks()
    }
    else {
      alert(1);
    }
  }
  const handlePaginationPrev = (e) => {
      if (currSearchPage != 1)
      {
          setCurrSearchPage(currSearchPage-1)
          getBooks()
          setFoundBooks([])
        }
      else {
        alert(1);
      }
  }
  const getBooks = async () => {
    let response = await fetch(`http://localhost:4000/book?title=${searchQuery}&page=${currSearchPage}`, {
        method : "GET",
        }
     )
    let res = await response.json();
    setFoundBooks(res.data.books)
    setSearchResCount(res.totalBooksCount)
    setTotalBooksCount(res.totalBooksCount)
    setTotalPages(res.totalPages)
    setLoading(false)
  }
  
  useEffect(() => {
    setButtonsState({
      prev: currSearchPage === 1,
      next: currSearchPage === totalPages,
    });
  }, [currSearchPage, totalPages]);
    return (
        <div className="flex justify-center flex-col">
            <div className= {`pt-2 relative mx-auto text-gray-600 ${searchError ? "search-error" : ""}`}>
              <input className=" h-16 px-5 mr-16 rounded-lg text-sm focus:outline-none"
                onChange={handleSearchChange}
                value={searchQuery} 
                type="search" name="search" placeholder="Search"/>
                  <button onClick={getBooks}>
                      < SearchRoundedIcon sx={{ color :'#444' }} />
                  </button>
            </div>
            {!loading ?
              <>
                <div className="p-5 d-flex w-full align-center justify-center flex-row flex-wrap  gap-5 ">
                  {foundBooks.length > 0 ?
                    foundBooks?.map(book => {
                        return (
                          <Link to={`book/${book._id}`} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 lg:w-5/12 w-full">
                            <img className=" bg-green-800 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={"http://localhost:4000" + book.imageUrl} alt="" />
                            <div className="flex  flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 ">{book.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{display(book.description, 100)}</p>
                            </div>
                          </Link>
                          )
                    }) : <ThreeDotsWave />
                  }
                </div> 
                { totalPages > 1 ? 
                  <div className="w-1/12 mx-auto flex justify-between">
                    <button
                        disabled={buttonsState.prev}
                        className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded cursor-pointer disabled:opacity-25"
                        onClick={handlePaginationPrev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                          />
                        </svg>
                    </button>
                    <button
                        disabled={buttonsState.next}
                        className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded cursor-pointer disabled:opacity-25"
                        onClick={handlePaginationNext}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                          />
                        </svg>
                    </button>
                  </div>
                : "" }
              </>
            : <><h1 className="d-flex absolute w-100 h-50 justify-center items-center">Loading</h1></>
          }
        </div>
    )
}

export default SearchPage