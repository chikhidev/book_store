import "../css/login.css"

const Login = () => {
    return (
        <div className="popup form-popup">
            <form>
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
                    <div className="input-grp">
                        <input placeholder="Email" />
                    </div>
                    <div className="input-grp">
                        <input placeholder="Password" />
                    </div>
                    <div className="input-grp">
                        <button className="sign-in-btn form-primary-btn">Sign In</button>
                    </div>
                </div>
                <div className="form-footer">
                    <span>Don't have an account?</span>
                    <button className="register-btn form-primary-btn">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Login