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

export const ADD_BOOK_FAV = (book) => {
    return {
      type: "ADD_BOOK_FAV",
      payload: book
    }
  }

export const REM_BOOK_FAV = (bookId) => {
    return {
        type: "REM_BOOK_FAV",
        payload: bookId
    }
}

export const SET_USER_DETAILS = (userDetails) => {
    return {
      type: 'SET_USER_DETAILS',
      payload: userDetails
    };
  };