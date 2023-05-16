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
      case 'ADD_FAV_BOOK' :
        return {
          ...state,
          books : [...state.books, book]
        }
      case 'REM_FAV_BOOK' :
        return {
          ...state,
          books : state.books.filter((book) => book.id != action.payload)
        }
      default:
        return state;
    }
  };

export default reducer;