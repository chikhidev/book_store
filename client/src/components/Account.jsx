import store from "../redux/store"
import { useState } from "react"
import { useSelector } from "react-redux"
const Account  = () => {
    let details = useSelector(state => state.userDetails)
    const [{ username, email, isAdmin, createdAt, bio, avatar }, setDetails] = useState(details) 
    return (
        <div>
            <div>username : {username}</div>
            <div>email : {email}</div>
            <div>strength : {isAdmin ? "admin" : "user"}</div>
            <div>createdAt : {createdAt}</div>
            <div>bio : {bio}</div>
            <div>(token, tho soon will be  removeed) : {localStorage.getItem("token")}</div>
            <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" />
        </div>
    )
}
export default Account