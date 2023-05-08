let initialState = {
    books : [],
    favBooks : [],
    loginStatus : false,
    token: ""
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
          loginStatus: false
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