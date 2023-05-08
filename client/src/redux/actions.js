export const login = (token) => {
    return {
        type: "LOGIN",
        payload : {
            token : token
        }
    }
}
export const logout = () => {
    return {
        type: "LOGOUT",
      }
}

export const addBookFav = (book) => {
    return {
      type: "ADD_BOOK_FAV",
      payload: book
    }
  }

export const remBookFav = (bookId) => {
    return {
        type: "REM_BOOK_FAV",
        payload: bookId
    }
}
