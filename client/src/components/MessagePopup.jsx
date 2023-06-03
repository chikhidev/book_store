import { useSearchParams } from "react-router-dom"
import "../css/message-popup.css"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { getHumanDate } from "../js";
import { useNavigate } from "react-router-dom";

const MessagePopup = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isRead, setIsRead] = useState();
  const [success, setIsSuccess] = useState(false);
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(params.id);
  const showIfExists = ({elem}) => {
    elem ? <div className={`${elem}`}>{elem}</div> : ""
  }
  const fetchMessage = async () => {
    try {
      let response = await fetch(`http://localhost:4000/inbox/message/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let res = await response.json();
      console.log(res);
      setContent(res.data.content);
      setEmail(res.data.sender.email)
      setUsername(res.data.sender.username)
      setIsRead(res.data.isRead);
      setCreatedAt(getHumanDate(res.data.createdAt))
      setIsSuccess(true)
    } catch (error) {
      console.error(error);
    }
  };
  const toggleIsRead = async () => {
    try {
      let response = await fetch(`http://localhost:4000/inbox/message/647b52ce8dd5e653db23c72d`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let res = await response.json();
      setContent(res.data.content);
      setIsRead(res.data.isRead);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [id]);

  return (
    <div className="message-popup">
      {success ? (
        <div className="message-container">
            <div className="close-btn" onClick={() => navigate("/")}>x</div>
            <div className="content">{content}</div>
            <div className="email">{email}</div>
            <div className="username">{username}</div>
            <div className="createdAt">{createdAt}</div>
            <div className="isRead">
                read ? 
                <input type="checkbox" checked={isRead} onClick={() => toggleIsRead()} />        
            </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MessagePopup
