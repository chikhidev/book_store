let initialState = {
    books : [],
    favBooks : [],
    loginStatus : false,
    token: "",
    userDetails : {
      avatar : "",
      _id : "",
      email : "",
      username : "",
      isAdmin : false,
      createdAt : ""
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          token: action.payload.token,
          loginStatus: true
        };
      case 'LOGOUT':
        return {
          ...state,
          token: "",
          loginStatus: false,
          userDetails : {
            avatar : "",
            bio : "",
            createdAt : "",
            email : "",
            isAdmin : false,
            username : "",
            _id : "",
          }
        };
      case 'SET_FEATURED_BOOKS':
        return {
          ...state,
          books: action.payload.books,
        };
        case 'SET_USER_DETAILS':
          return {
            ...state,
            userDetails: action.payload
          };
        case 'ADD_BOOK_FAV':
          return {
            ...state,
            favBooks: [...state.favBooks, action.payload]
          };
        case 'REM_BOOK_FAV' :
          return {
            ...state,
            favBooks : state.favBooks.filter((book) => book._id != action.payload)
          }
          case 'TOGGLE_BOOK_FAV':
            const bookIndex = state.favBooks.indexOf(action.payload);
            let updatedFavBooks;
            if (bookIndex !== -1) {
              // Book exists in favBooks, remove it
              updatedFavBooks = [...state.favBooks.slice(0, bookIndex), ...state.favBooks.slice(bookIndex + 1)];
            } else {
              // Book doesn't exist in favBooks, add it
              updatedFavBooks = [...state.favBooks, action.payload];
            }
            return {
              ...state,
              favBooks: updatedFavBooks
            };
          
          return {
            ...state,
            favBooks: updatedFavBooks
          }
      default:
        return state;
    }
  };

export default reducer;