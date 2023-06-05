import { Route, Routes, Navigate, useLocation} from "react-router-dom";
import EditUserProfile from "../EditUserProfile";
import { Home, Categories } from "../../App";
import FeaturedSlider from '../FeaturedSlider';
import CategorySlider from '../CategorySlider';
import MessagePopup from "../MessagePopup";
import CategoryPage from "../CategoryPage";
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import CreateBookForm from '../CreateBookForm';
import Favorite from '../Favorite';
import Account from '../Account';
import SingleBook from '../SingleBook';
import NewBooks from '../NewBooks';
import SearchPage from "../Search/SearchPage";
import { AnimatePresence } from "framer-motion" 
import NotFound from "../NotFound";
const AnimatedRoutes = ({isLogged}) => {
    const location = useLocation()
    return (
        <AnimatePresence >
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={isLogged ? <Navigate to="/"/> : <Login />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/register" element={isLogged ? <Navigate to="/"/> : <Register />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/categories" element={<Categories/>} />
                <Route path="/category/" element={<CategoryPage />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/categories/category/" element={<CategoryPage />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/categories/category/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/categories/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/new" element={<NewBooks/>} />
                <Route path="/new/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/new/category" element={<CategoryPage />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/fav/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/book/:id" element={<SingleBook/>} />
                <Route path="/inbox/message/:id" element={<MessagePopup />} />
                <Route path="/search" element={<SearchPage />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                <Route path="/search/book/:id" element={<SingleBook />} />    {/* If user is logged in, then redirect to home page, else go to login page */}
                    {/* If user is logged in, then redirect to home page, else go to login page */}

                {/* If user is logged in, then redirect to home page, else go to login page */}

                <Route path="/account"
                    element={isLogged ? <Account /> : <Navigate to="/login" />}
                    />
                <Route path="/edit_profile"
                    element={isLogged ? <EditUserProfile /> : <Navigate to="/login" />}
                    />
                <Route path="/favorite" element={isLogged ? <Favorite /> : <Navigate to="/login" />} />
                <Route
                    path="/book/create"
                    element={isLogged ? <CreateBookForm /> : <Navigate to="/login" />}
                />
            </Routes>

        </AnimatePresence>
    )
}
export default AnimatedRoutes