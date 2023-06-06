import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ThreeDotsWave from "./FramerMotion/ThreeDotWave";
import BookCard from "./BookCard";
import "../css/search.css";
import store from "../redux/store";
import { SERVER_ENDPOINT } from "../js";

const Favorite = () => {
  const [favs, setFavs] = useState([]); // Accessing favBooks from Redux store
  const loginStatus = useSelector((state) => state.loginStatus);
  const [logged, setLogged] = useState(loginStatus);
  const [selected, setSelected] = useState([]);
  const [seeSelection, setSeeSelection] = useState(false);

  const userToken = useSelector((state) => state.token);
  const dispatch = useDispatch();

  //selection --------------------------------
  const handleCardClick = (e, id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If the book is already selected, remove it from the array
        return prevSelected.filter((selectedBook) => selectedBook !== id);
      } else {
        // If the book is not selected, add it to the array
        return [...prevSelected, id];
      }
    });
  };

  const unfavoriteSelectedBooks = async () => {
    try {
      await Promise.all(
        selected.map(async (id) => {
          const response = await fetch(`${SERVER_ENDPOINT}/fav/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          // Process the response as needed
          console.log("Unfavorited item with ID:", id);
        })
      );
      fetchFavBooks();
      setSelected([]);
    } catch (error) {
      console.error("Error unfavoriting selected books:", error);
    }
  };
  

  const unfavoriteItem = async (id) => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/fav/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      // Process the response as needed
      console.log("Unfavorited item with ID:", id);
      fetchFavBooks()
    } catch (error) {
      console.error("Error unfavoriting item:", error);
    }
  };

  //fetching ---------------------------------
  const fetchFavBooks = async () => {
    let books = await fetch(`${SERVER_ENDPOINT}/fav`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    let res = await books.json();
    setFavs(res.data);
  };

  useEffect(() => {
    logged ? fetchFavBooks() : null;
  }, [favs, userToken]); // Re-fetch books when favBooks changes in the Redux store

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loginStatus);
    });

    return unsubscribe;
  }, [loginStatus]);

  return (
    <div className="md:px-32 duration-200">
      <div className="">
        

        <div className="flex">

            <div className="md:flox">
                <h3 className="flex mx-18 px-4">Mes fourites</h3>
                <div>
                  <label htmlFor="" className={`mx-4 ${!seeSelection && "hidden"}`}>
                    livres sélectionnés : {selected.length}
                  </label>
                </div>
            </div>

            <div className=" md:flex justify-end">
                <div className="flex flex-wrap">
                    <div>
                      <div className="flex mx-18 px-4 py-2 border-2 border-blue-500 rounded-xl hover:bg-blue-400 hover:text-white cursor-pointer duration-200"
                        onClick={() =>setSeeSelection(!seeSelection)}
                      >
                        {
                          seeSelection ? "Annuler" : "Sélecteur"
                        }

                      </div>
                    </div>

                    <div>
                      {seeSelection && selected.length > 0 && (
                            <button
                              className="flex md:ml-4 mx-18 px-4 py-2 border-2 border-red-500 rounded-xl hover:bg-red-500 hover:text-white cursor-pointer duration-200"
                              onClick={unfavoriteSelectedBooks}
                            >
                              Unfavorite Selected
                            </button>
                          )}
                    </div>



                </div>
            </div>


        </div>



        <motion.div
          className="search-result flex flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {favs.length > 0 ? (
            favs.map((fav) => (
              <div className="w-56 flex flex-wrap relative">

                <button
                  className="absolute top-8 right-8 bg-white rounded-xl p-2 z-10 hover:scale-110 duration-200"
                  onClick={(e) => {
                    unfavoriteItem(fav.book._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <BookCard book={fav.book} key={fav.book._id} />

                <div class={`flex items-center px-4 duration-200 ${!seeSelection && "hidden"}`}>
                  <input
                    id=""
                    type="checkbox"
                    onClick={(e) => {
                      handleCardClick(e, fav.book._id);
                    }}
                    value=""
                    className="absolute top-8 left-8 w-8 h-8 text-blue-600 bg-blue-500 rounded-xl focus:ring-blue-500 "
                  />
                </div>

              </div>
            ))
          ) : (
            <ThreeDotsWave />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Favorite;
