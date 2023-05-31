import store from "../redux/store";
import { SET_CATEGORIES } from "../redux/actions";

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

const capitalize = (str) => {
  if ( str.length != 1 ) 
    return str[0].toUpperCase() + str.slice(1)
  return str.toUpperCase();
}

function mergeArraysRandomly(...arrays) {
  let merged = [].concat(...arrays); // Concatenate all arrays into a single array

  for (let i = merged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [merged[i], merged[j]] = [merged[j], merged[i]]; // Swap elements at indices i and j
  }

  return merged;
}




let swiperBreakPoints = {
    1666: {
    slidesPerView: 6,
    },
    1366: {
    slidesPerView: 5,
    },
    1000: {
    slidesPerView: 4,
    },
    768: {
    width: 768,
    slidesPerView: 3,
    },
    400: {
    slidesPerView : 2
    },
    200: {
        slidesPerView : 1
    }
}
const getCategories = async (setFnc) => {
  let books = await fetch(`http://localhost:4000/category`, {
      method : "GET",
      headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      },
  })
  let res = await books.json();
  // first cat only, cause may find more ..
  let categories = res.data.categories
  store.dispatch(SET_CATEGORIES(categories))
  setFnc(categories)
}

const getCategory = async (categoryId) => {
  try {
      const category = await fetch(`http://localhost:4000/category/${categoryId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
      });
      const res = await category.json();
      let cat = await res.data.category;
      return cat;
  } catch (error) {
      console.log("Error retrieving category:", error);
      return null;
  }
};

export {
  display, capitalize, 
  mergeArraysRandomly,
  swiperBreakPoints,
  getCategories,
  getCategory}
