export const LOGIN = (token) => {
    return {
        type: "LOGIN",
        payload : {
            token : token
        }
    }
}
export const LOGOUT = () => {
    return {
        type: "LOGOUT",
      }
}

export const ADD_BOOK_FAV = (bookId) => {
    return {
      type: "ADD_BOOK_FAV",
      payload: bookId
    }
  }

  export const REM_BOOK_FAV = (bookId) => {
    return {
        type: "REM_BOOK_FAV",
        payload: bookId
    }
}
export const TOGGLE_BOOK_FAV = (bookId) => {
  return {
      type: "TOGGLE_BOOK_FAV",
      payload: bookId
  }
}

export const SET_USER_DETAILS = (userDetails) => {
    return {
      type: 'SET_USER_DETAILS',
      payload: userDetails
    };
  };