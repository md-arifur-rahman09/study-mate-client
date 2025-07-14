import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useRole from "../hooks/useRole";


const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { role } =useRole();

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
                            to="/dashboard/myCourses"
                            className={({ isActive }) =>
                                isActive ? "text-primary font-bold" : "text-gray-700"
                            }
                        >
                            My Courses
                        </NavLink>
                    </li>

                    {/* Role-Based Menu */}
                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/manage-users"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manage-courses"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Manage Courses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/instructor-request-lists"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                  Instructor request list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/approved-instructors"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                Approved  Instructors
                                </NavLink>
                            </li>
                        </>
                    )}

                    {role === "instructor" && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/add-course"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    Add Course
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/my-courses"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-bold" : "text-gray-700"
                                    }
                                >
                                    My Created Courses
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
