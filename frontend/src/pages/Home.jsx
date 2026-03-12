import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/slices/userSlice";


const Home = () => {
    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        //remove user from redux
        dispatch(logoutUser())
        navigate("/login");
    }

    return (
        <div>
            <div>
                <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
                    <div className="justify-between px-4 mx-auto  md:items-center md:flex md:px-8 ">
                        <div>
                            <div className="flex items-center justify-between py-3 md:py-5 md:block">
                                {/* LOGO */}
                                <div onClick={() => navigate('/')}>
                                    <h2 className="text-2xl cursor-pointer text-cyan-600 font-bold ">LOGO</h2>
                                </div>
                                {/* HAMBURGER BUTTON FOR MOBILE */}
                                <div className="md:hidden">
                                    <button
                                        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                        onClick={() => setNavbar(!navbar)}
                                    >
                                        {navbar ? (
                                            <img src="/close.svg" width={30} height={30} alt="logo" />
                                        ) : (
                                            <img
                                                src="/hamburger-menu.svg"
                                                width={30}
                                                height={30}
                                                alt="logo"
                                                className="focus:border-none active:border-none"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'
                                    }`}
                            >
                                <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                                    {user.role === "admin" && (
                                        <li className="mt-3 cursor-pointer pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                            <div onClick={() => navigate("/users")}>
                                                Users
                                            </div>
                                        </li>
                                    )}

                                    <button onClick={handleLogout} className=" cursor-pointer px-4 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
                                        Logout
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="flex items-center justify-center h-screen bg-gray-900">
                <Outlet />

            </div>
        </div>
    )
}

export default Home