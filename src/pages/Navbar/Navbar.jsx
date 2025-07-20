import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const { user, logout } = useAuth();
     const [userRole, setUserRole] = useState(null);

      useEffect(() => {
        if (!user?.email) return;

        axios.get(`https://study-mate-server-nine.vercel.app/users/role/${user.email}`)
            .then(res => {
                // console.log("User Role:", res.data.role);
                setUserRole(res.data.role);
            })
            .catch(() => setUserRole(null));
    }, [user?.email]);

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
            <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
            <li><NavLink to="/all-study-sessions" className="hover:text-primary">All Sessions</NavLink></li>
            <li><NavLink to="/all-tutors" className="hover:text-primary">All Tutors</NavLink></li>
            {userRole === 'student' && <li><NavLink to="/applyTutor" className="hover:text-primary">Apply Tutor</NavLink></li>}
            {user && <li><NavLink to="/dashboard" className="hover:text-primary">Dashboard</NavLink></li>}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-10 lg:px-16">
            {/* Left Start */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navLinks}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl text-primary font-bold">StudyMate</Link>
            </div>

            {/* Center Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium">
                    {navLinks}
                </ul>
            </div>

            {/* Right Side */}
            <div className="navbar-end space-x-3">
                {user ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={user?.photoURL}
                            title={user?.displayName || user?.email}
                            alt="profile"
                            className="w-9 h-9 rounded-full border-2 border-primary"
                        />
                        <button onClick={handleLogout} className="btn sm: btn-sm lg:btn-md bg-red-500 text-white hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <NavLink to="/login" className="btn  btn-outline btn-sm">Login</NavLink>
                        <NavLink to="/register" className="btn btn-primary btn-sm text-white">Register</NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
