import "../css/forms.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import store from '../redux/store';
import { LOGIN, LOGOUT, SET_USER_DETAILS } from '../redux/actions';

const Login = () => {
    console.log(`login status is => ${store.getState().loginStatus}`);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // will come from jwt
    const verifyUserInput = (e) => {
        e.preventDefault()
        if (!email.trim())
        {
            setError("bad email")
            return false;
        }
        if (password.trim().length < 8 )
        {
            setError("bad password")
            return false;
        }
        handleLogin(e)
    }
    const fetchAndSetUserDetails = async (token) => {
        let userDetailsResponse = await fetch(`http://localhost:4000/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
        });
        let res = await userDetailsResponse.json();
        if (res.success) {
            store.dispatch(SET_USER_DETAILS(res.data));
        }
        else {
            console.warn("error setting user details...")
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
        const response = await fetch('http://127.0.0.1:4000/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            password
            })
        });
        const data = await response.json();
        setError(!data.success);
        setMessage(data.data.message ? data.data.message : data.data[0].message);
        setLoading(false);
    
        if (data.success) {
            localStorage.setItem('token', data.data.token);
            store.dispatch(LOGIN(data.data.token));
            fetchAndSetUserDetails(data.data.token)
            navigate("/");
            setTimeout(function() {
            localStorage.removeItem('token');
            }, 1000 * 60 * 5); // after 5 min
        }
        } catch (error) {
        // Handle any error that occurred during the fetch request
            console.error(error);
        }
    };
    return (
        <div className="login popup">
            <form onSubmit={verifyUserInput} className="form-popup">
                <div className="form-header">
                    <div className="welcome-msg">
                        Welcome Back
                        <div className="line-break"></div>
                        to <span className="primary-color">BookStore</span>
                    </div>
                    <span className="sign-in-msg">
                        Sign in to your account below.
                    </span>
                </div>

                <div className="form-hero">
                    <div className="input-grp relative">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full rounded-lg text-sm shadow-sm"
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

                    <div className="input-grp relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            className="w-full rounded-lg text-sm shadow-sm"
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
                    {/* error */}
                    <div className="form-error">
                        {error ? <span>{error}</span> : ""}
                    </div>
                    <div className="btn-grp">
                        <button
                            type="submit"
                            className="sign-in-btn form-primary-btn  inline-block rounded-lg bg-blue-500  text-sm font-medium text-white"
                        >
                        {
                        loading ? 'loading...'
                        : 
                        <span className='flex items-center '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Sign in
                        </span>
                        }
                    </button>
                    </div>
                </div>
                
                <div className="form-footer">
                    Don't have an account?
                    <Link to="/register">
                        <button className="footer-register-btn form-primary-btn">
                            Register
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login