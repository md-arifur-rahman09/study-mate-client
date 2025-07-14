import { Link, NavLink } from "react-router";
import { useContext } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user)
  
  
    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire("Logged Out", "You have been logged out", "success");
            })
            .catch((err) => {
                Swal.fire("Error", err.message, "error");
            });
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/applyInstructor">Apply Instructor</NavLink></li>
            {user ? (
                <>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li className="bg-red-400"><button  onClick={handleLogout}>Logout</button></li>
                </>
            ) : (
                <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li className="bg-blue-400"><NavLink to="/register">Register</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar  bg-white text-black px-4 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <Link to="/" className="text-xl font-bold text-primary">StudyMate</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 text-base font-medium">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user && (
                    <div className="flex items-center gap-2">
                        <img title={user?.email} src={user?.photoURL} alt="profile" className="w-8 h-8 rounded-full" />
                      
                    </div>
                )}
                <div className="dropdown dropdown-end lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                    >
                        {navLinks}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
