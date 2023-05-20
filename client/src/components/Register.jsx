import "../css/forms.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const verifyUserInput = (e) => {
    e.preventDefault()
    if (firstName.trim().length < 2)
    {
        setError("bad first name")
        return false;
    }
    if (lastName.trim().length < 2)
    {
        setError("bad first name")
        return false;
    }
    if (!username.trim() || !/^[a-zA-Z0-9]+$/.test(username))
    {
        setError("bad username")
        return false;
    }
    if (password.trim().length < 8 || password != confirm )
    {
        setError("bad password")
        return false;
    }
     handleRegister(e)
  }
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true)
    fetch('http://127.0.0.1:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setError(!data.success)
        setMessage(data.data.message ? data.data.message : data.data[0].message)
        setLoading(false)
        console.log(data);
      });
  };

  return (
    <div className="register popup">
        <form className="form-popup" onSubmit={verifyUserInput}>
            <div className="form-header">
            <div className="welcome-msg">
                Welcome, 
                <span className="primary-color">New User</span>
            </div>
            <span className="sign-in-msg">
                Register and make your account now .
            </span>
            </div>
            <div className="form-hero">
                <div className="form-grp">
                    {/* first name */}
                    <div className="input-grp first-name relative">
                        <input
                        value = {firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="rounded-lg text-sm shadow-sm"
                        required
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                        </span>
                    </div>
                    {/* last name */}
                    <div className="input-grp last-name relative">
                        <input
                        placeholder="Last Name"
                        className="rounded-lg text-sm shadow-sm"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M22 12h-6l-2 3h-4l-2-3H2"
                            />
                        </svg>
                        </span>
                    </div>
                </div>
                <div className="form-grp">
                    {/* email */}
                    <div className="input-grp email relative">
                        <input
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            className="rounded-lg text-sm shadow-sm"
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="form-grp">
                    {/* username */}
                    <div className="input-grp username relative">
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                type="text"
                                className="rounded-lg text-sm shadow-sm"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                    />
                                </svg>
                            </span>
                    </div>
                    {/* age */}
                    <div className="input-grp age relative">
                            <input
                                placeholder="Age"
                                type="number"
                                className="rounded-lg text-sm shadow-sm"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                    />
                                </svg>
                            </span>
                    </div>
                </div>
                <div className="form-grp">
                    {/* address */}
                    <div className="input-grp address relative">
                        <input
                            placeholder="Address"
                            type="text"
                            className="rounded-lg text-sm shadow-sm"
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="form-grp">
                    {/* password */}
                    <div className="input-grp password relative">
                        <input
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="rounded-lg text-sm shadow-sm"
                        type="password"
                        required
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                        </span>
                    </div>
                    {/* confirm */}
                    <div className="input-grp confirm relative">
                        <input
                        placeholder="Confirm"
                        className="rounded-lg text-sm shadow-sm"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        type="password"
                        required
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M22 12h-6l-2 3h-4l-2-3H2"
                            />
                        </svg>
                        </span>
                    </div>
                </div>
                {/* error */}
                <div className="form-error">
                    {error ? <span>{error}</span> : ""}
                </div>
                {/* register btn */}
                <div className="btn-grp">
                    <button
                        type="submit"
                        className="register-btn"
                    >
                    {
                    loading ? 'loading...'
                    : 
                    <span className='flex items-center '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Register
                    </span>
                    }
                </button>
                </div>
            </div>
                    
            <div className="form-footer">
                Already have an account?
                <Link to="/login">
                    <button className="footer-login-btn form-primary-btn">Login</button>
                </Link>
            </div>
        </form>
    </div>
    )
}

export default Register