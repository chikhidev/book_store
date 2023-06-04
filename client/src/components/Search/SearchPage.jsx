import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchPage = ()=>{
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchError, setIsSearchError] = useState(false)
    const [foundBooks, setFoundBooks] = useState([])


  const getBooks = async () => {
    let response = await fetch(`http://localhost:4000/book?title=${bookTitle}&page=${currSearchPage}`, {
        method : "GET",
        }
     )
    let res = await response.json();
    setFoundBooks(res.data.books)
  }


    const handleSearchQuery = (searchQuery.length > 2) ? (`/search?name=${searchQuery}`) : (`/`)
    return(
        <div className="flex justify-center">
              


                <div className= {`pt-2 relative mx-auto text-gray-600 ${isSearchError ? "search-error" : ""}`}>
                  <input className=" h-16 px-5 mr-16 rounded-lg text-sm focus:outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery} 
                    type="search" name="search" placeholder="Search"/>
                  
                        <button onClick={getBooks}>
                            < SearchRoundedIcon sx={{ color :'#444' }} />
                        </button>
                    
                </div>



            </div>
    )
}

export default SearchPage