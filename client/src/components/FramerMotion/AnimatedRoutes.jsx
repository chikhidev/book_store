import { Route, Routes, Navigate, useLocation} from "react-router-dom";

import { Home, Categories } from "../../App";
import FeaturedSlider from '../FeaturedSlider';
import CategorySlider from '../CategorySlider';
import Login from '../Login';
import Register from '../Register';
import CreateBookForm from '../CreateBookForm';
import Search from '../Search';
import Favorite from '../Favorite';
import Account from '../Account';
import SingleBook from '../SingleBook';
import NewBooks from '../NewBooks';
import { AnimatePresence } from "framer-motion" 
const AnimatedRoutes = ({isLogged}) => {
    const location = useLocation()
    return (
        <AnimatePresence >
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>} />
                <Route path="/categories" element={<Categories/>} />
                <Route path="/categories/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/new" element={<NewBooks/>} />
                <Route path="/new/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/account" element={<Account/>} />
                <Route path="/favorite" element={isLogged ? <Favorite/> : <Navigate to="/login" />} />
                <Route path="/fav/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/book/:id" element={<SingleBook/>} />
                <Route path="/store/book/create" element={isLogged ? <CreateBookForm/> : <Navigate to="/login" /> } />
                <Route path="/login" element={isLogged ? <Navigate to="/"/> : <Login />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/search" element={<Search />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/search/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/register" element={isLogged ? <Navigate to="/"/> : <Register />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes