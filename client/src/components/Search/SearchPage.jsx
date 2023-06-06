import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookCard from "../BookCard";
import ThreeDotsWave from "../FramerMotion/ThreeDotWave";
import { display } from "../../js";
import { motion } from "framer-motion";
import { SERVER_ENDPOINT } from "../../js";
import { fetchWithTimeout } from "../../js";
import Refresh from "../Error/Refresh";

const SearchPage = () => {
  const [currSearchPage, setCurrSearchPage] = useState(1);
  const [searchResCount, setSearchResCount] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [isSearchSuccess, setIsSearchSuccess] = useState(null);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [foundBooks, setFoundBooks] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(null);
  const [buttonsState, setButtonsState] = useState({
    prev: false,
    next: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [query, setQuery] = useState("title");

  const handleSearchBtnClick = (e) => {
    if (searchQuery.length === 0) {
      setSearchError(true);
      setIsSearchSuccess(null);
    } else {
      setLoading(true);
      setCurrSearchPage(1);
      setSearchError(false);
      setTimeout(() => {
        getBooks(setSearchQuery);
      }, 500);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length === 0) {
      setIsSearchSuccess(null);
    } else {
      setLoading(true);
      setCurrSearchPage(1);
      setSearchError(false);
      setTimeout(() => {
        getBooks(setSearchQuery);
      }, 500);
    }
  };

  const handlePaginationNext = (e) => {
    if (currSearchPage !== totalPages) {
      setCurrSearchPage(currSearchPage + 1);
      setFoundBooks([]);
      getBooks();
    } else {
      alert(1);
    }
  };

  const handlePaginationPrev = (e) => {
    if (currSearchPage !== 1) {
      setCurrSearchPage(currSearchPage - 1);
      getBooks();
      setFoundBooks([]);
    } else {
      alert(1);
    }
  };

  const getBooks = async () => {
    try {
      let responseBooks = await fetch(
        `${SERVER_ENDPOINT}/book?${query}=${searchQuery}&page=${currSearchPage}`
      );
      let resBooks = await responseBooks.json();

      setFoundBooks(resBooks.data.books);
      setSearchResCount(resBooks.totalBooksCount);
      setTotalBooksCount(resBooks.totalBooksCount);
      setTotalPages(resBooks.totalPages);
      setIsSearchSuccess(true);
      console.log(resBooks);
      setLoading(false);
    } catch (err) {
      setIsSearchSuccess(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    setButtonsState({
      prev: currSearchPage === 1,
      next: currSearchPage === totalPages,
    });
  }, [currSearchPage, totalPages]);

  return (
    <motion.div
      className="flex justify-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!isError ? (
        <div className="">
          <div className={`pt-2 relative mx-12  text-gray-600  flex`}>
            <input
              className={` ${
                searchError ? " border-2 border-red-500 search-error" : "border-2 border-pink-500"
              } w-full h-16 px-5 mr-16 rounded-lg  text-md focus:outline-none `}
              onChange={handleSearchChange}
              value={searchQuery}
              type="search"
              name="search"
              placeholder="Search"
            />
            <button onClick={(e) => handleSearchBtnClick(e)}>
              <SearchRoundedIcon sx={{ color: "#444" }} />
            </button>
          </div>

          {isSearchSuccess == null ? (
            <h3 className="text-center mt-9 text-gray-600 font-normal">
              Tape quelque chose...
            </h3>

          ) : !loading ? (
            <>
            
              <div className="flex items-center mt-4">

                      {/* books */}
                      <h4 className="px-12 ">{`showing results of: ${searchQuery}`}</h4>
                      <h6 className="px-12">{`results: ${totalBooksCount}  (${currSearchPage} of ${totalPages})`}</h6>

                        {/* pagination */}
                      {totalPages > 1 && !loading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-1/12 flex justify-between"
                        >
                          <button
                            disabled={buttonsState.prev}
                            className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded cursor-pointer disabled:opacity-25"
                            onClick={handlePaginationPrev}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                              />
                            </svg>
                          </button>
                        </motion.div>
                      ) : (
                        ""
                      )}

              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 flex w-full align-center justify-center flex-row flex-wrap  gap-5 md:h-3/4 overflow-y-hidden"
              >
                {foundBooks.length > 0 ? (
                  foundBooks?.map((book) => {
                    return (
                      <Link to={`book/${book._id}`} className="flex flex-wrap md:flex-no-wrap w-full">
                        <img
                          className="bg-green-800 object-cover w-full rounded-lg w-52"
                          src={`${SERVER_ENDPOINT}${book.imageUrl}`}
                          alt=""
                        />
                        <div className="flex flex-col py-4 md:p-4 leading-normal">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 ">
                            {book.title}
                          </h5>
                          <p className="mb-3 font-normal text-gray-700 ">
                            {display(book.description, 100)}
                          </p>
                          <Link className="text-blue-500">{book.publisher}</Link>
                          <div className="flex flex-wrap my-2">
                            <span className="mr-2 bg-gray-100 text-gray-800 font-medium mr-2 px-2.5 py-0.5 rounded">
                              {book.language}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <ThreeDotsWave />
                )}
              </motion.div>

              
            </>
          ) : (
            <ThreeDotsWave />
          )}
        </div>
      ) : (
        <Refresh />
      )}
    </motion.div>
  );
};

export default SearchPage;
