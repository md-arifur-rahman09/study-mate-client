import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useRole from "../hooks/useRole";


const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { role } = useRole();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div
                className={`lg:w-64 w-64 bg-white shadow-md p-4 fixed lg:static z-50 transition-all duration-300 ${isOpen ? "left-0" : "-left-64"
                    } lg:left-0 top-0 h-full`}
            >
                <h2 className="text-xl font-bold mb-6 text-primary">StudyMate</h2>

                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-primary font-bold" : "text-gray-700"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {/* student role menu */}

                    {role === "student" && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/myProfile"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/my-booked-sessions"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    My Booked Sessions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/create-a-note"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                   Create A Note
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manage-notes"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                   Manage Notes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-study-materials"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                  All Study Materials
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Role-Based Menu */}
                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/all-users"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                   All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-study-sessions"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                   All Study Sessions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/tutor-request-lists"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Tutor request list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/approved-tutors"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Approved  Tutors
                                </NavLink>
                            </li>
                        </>
                    )}
                    {/* tutor */}
                    {role === "tutor" && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/create-study-session"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Create Study Session
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/my-study-sessions"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    My Study Sessions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/upload-materials"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Upload Materials
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-materials"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                 View   All Materials
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>

                {/* Close menu button for mobile */}
                <div className="lg:hidden mt-6">
                    <button
                        onClick={toggleMenu}
                        className="text-red-500 flex items-center gap-2"
                    >
                        <FaTimes /> Close
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 ml-0 lg:ml-64 p-4">
                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden mb-4 bg-primary text-white px-3 py-1 rounded"
                >
                    <FaBars />
                </button>

                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
