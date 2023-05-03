import {useState} from "react"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleLogin = (e) => {
      e.preventDefault();
      setLoading(true)
      fetch('http://127.0.0.1:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
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
<div className='flex justify-center items-center w-screen h-screen'>
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <div className="welcome-msg">
        Welcome Back
        <div className="line-break"></div>
        to <span className="primary-color">BookStore</span>
    </div>

    <span className="sign-in-msg">
        Sign in to your account below.
    </span>
  </div>

    <form onSubmit={handleLogin} className="mx-auto mb-0 mt-8 max-w-md space-y-4">

        <div className="form-hero">
            <div className="input-grp">
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                    <input
                    type="email"
                    className="w-full bg-gray-300/20 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                    setEmail(e.target.value)
                    }}
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
            </div>
            <div className="input-grp">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
                <input
                type="password"
                className="w-full bg-gray-300/20 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                setPassword(e.target.value)
                }}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
                </span>
            </div>
            </div>
            <div className="input-grp">
                <div className="relative">
                    <button className="sign-in-btn form-primary-btn">Sign In</button>
                </div>
            </div>
        </div>
        <div className="form-header">
            
        </div>
    <p className={`text-sm flex items-center ${error ? 'text-red-700' : 'text-green-700'}` } >
        {
          error ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        }
      {message}
    </p>
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        No account?
        <a className="underline" href="">Sign up</a>
      </p>
      <button
        type="submit"
        className="sign-in-btn form-primary-btn  inline-block rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white"
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
  </form>
</div>
</div>

);
}

export default Login;