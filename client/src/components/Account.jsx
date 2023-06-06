import store from "../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../redux/actions";
import ChangeAvatar from "./ChangeAvatar";
import { getHumanDate } from "../js";
import { Link } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  let details = useSelector((state) => state.userDetails);
  const [{ username, email, isAdmin, createdAt, bio, avatar }, setDetails] = useState(details);

  const deleteUser = async () => {
    const req = fetch(`http://localhost:4000/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await req.json();
    console.log(data);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action ne peut pas être annulée.\nmais votre magasin restera, à chaque fois que vous déciderez d'y retourner vous y retrouverez vos produits"
    );

    if (confirmDelete) {
      try {
        await deleteUser();
        handleLogout();
      } catch (error) {
        console.log('Error deleting account:', error);
      }
    }
  };

  const setAvatar = (newAvatar) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      avatar: newAvatar,
    }));
  };

  console.log(details);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    store.dispatch(LOGOUT());
    navigate("/login");
  };

  const handleRequestAdmin = () => {
    // Add your logic here to send a request to become an admin
    // This can be an API call or a Redux action dispatch, depending on your implementation
    console.log("Requesting to be an admin...");
  };

  return (
    <div className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 md:px-24" id="panel">
      <div className="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
        <div className="w-full pb-6 mx-auto removable">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-6/12 mb-4">
              <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                  <div className="flex flex-wrap -mx-3">
                    <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div className="relative flex flex-col flex-auto min-w-0 py-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border">
                      <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-auto max-w-full px-3">
                          <div className="text-base ease-soft-in-out h-24 w-24 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                            <img
                              src={"http://localhost:4000" + avatar}
                              alt="profile_image"
                              className={`w-full shadow-soft-sm rounded-xl`}
                            />
                          </div>
                        </div>
                        <div className="flex-none w-auto max-w-full px-3 py-2">
                          <div className="h-full">
                            <h5 className="mb-1">{username}</h5>
                            <p className="mb-0 font-semibold leading-normal text-sm">
                              {isAdmin && (
                                <div className="">
                                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                    admin
                                  </span>
                                </div>
                              )}
                              
                              <Link to="/edit_profile" type="button" className="py-2 focus:outline-none text-blue-700 hover:text-blue-800 focus:ring-4">
                                Edit profile
                              </Link>
                            </p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                      <a href="javascript:;" data-target="tooltip_trigger" data-placement="top">
                        <i className="leading-normal fas fa-user-edit text-sm text-slate-400" aria-hidden="true"></i>
                      </a>
                      <div
                        data-target="tooltip"
                        className="px-2 py-1 text-center text-white bg-black rounded-lg text-sm hidden"
                        role="tooltip"
                        data-popper-placement="top"
                      >
                        Edit Profile
                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow=""></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-auto p-4">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative block py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                      <strong className="text-slate-700">User Name:</strong> &nbsp; {username}
                    </li>
                    <li className="relative block py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Email:</strong> &nbsp; {email}
                    </li>
                    <li className="relative block py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Member Since :</strong> &nbsp; {getHumanDate(createdAt)}
                    </li>
                  </ul>
                  <hr className="h-px my-6 bg-transparent bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                  <p className="leading-normal text-sm">{bio.length == 0 ? "Pas de biographie" : bio}</p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full px-3 xl:w-6/12">
              <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <h6 className="font-bold leading-tight uppercase text-xs text-slate-500">Account</h6>
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                      <div className="min-h-6 mb-0.5 block pl-0">
                        <ChangeAvatar setAvatar={setAvatar} />
                      </div>
                    </li>
                  </ul>
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <div className="py-4">
                      <button
                        onClick={handleLogout}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Logout
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        type="button"
                        className="focus:outline-none text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete account
                      </button>
                      {!isAdmin && (
                                <button
                                  onClick={handleRequestAdmin}
                                  type="button"
                                  className="p-2 bg-green-400 rounded-lg focus:outline-none text-white hover:text-blue-800 focus:ring-4"
                                >
                                  Request Admin
                                </button>
                              )}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
