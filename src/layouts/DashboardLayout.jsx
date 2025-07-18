import { useState } from "react";
import { NavLink, Outlet } from "react-router"; 
import { FaBars, FaTimes } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { role } = useRole();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "block bg-primary text-white font-semibold px-4 py-2 rounded transition"
            : "block text-gray-600 hover:bg-gray-200 px-4 py-2 rounded transition";

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div
                className={`lg:w-64 w-64 bg-white shadow-lg p-4 fixed lg:static z-50 transition-all duration-300 ease-in-out ${isOpen ? "left-0" : "-left-64"
                    } lg:left-0 top-0 h-full overflow-y-auto`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">StudyMate</h2>
                    <button
                        className="lg:hidden text-red-500"
                        onClick={toggleMenu}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <ul className="space-y-1">
                    <li>
                        <NavLink to="/" className={navLinkClass}>
                            Home
                        </NavLink>
                    </li>

                    {role === "student" && (
                        <>
                            <li><NavLink to="/dashboard/myProfile" className={navLinkClass}>My Profile</NavLink></li>
                            <li><NavLink to="/dashboard/my-booked-sessions" className={navLinkClass}>My Booked Sessions</NavLink></li>
                            <li><NavLink to="/dashboard/create-a-note" className={navLinkClass}>Create A Note</NavLink></li>
                            <li><NavLink to="/dashboard/manage-notes" className={navLinkClass}>Manage Notes</NavLink></li>
                            <li><NavLink to="/dashboard/all-study-materials" className={navLinkClass}>All Study Materials</NavLink></li>
                        </>
                    )}

                    {role === "admin" && (
                        <>
                            <li><NavLink to="/dashboard/all-users" className={navLinkClass}>All Users</NavLink></li>
                            <li><NavLink to="/dashboard/all-study-sessions" className={navLinkClass}>All Study Sessions</NavLink></li>
                            <li><NavLink to="/dashboard/tutor-request-lists" className={navLinkClass}>Tutor Request List</NavLink></li>
                            <li><NavLink to="/dashboard/approved-tutors" className={navLinkClass}>Approved Tutors</NavLink></li>
                            <li><NavLink to="/dashboard/view-all-materials" className={navLinkClass}>View All Materials</NavLink></li>
                        </>
                    )}

                    {role === "tutor" && (
                        <>
                            <li><NavLink to="/dashboard/create-study-session" className={navLinkClass}>Create Study Session</NavLink></li>
                            <li><NavLink to="/dashboard/my-study-sessions" className={navLinkClass}>My Study Sessions</NavLink></li>
                            <li><NavLink to="/dashboard/upload-materials" className={navLinkClass}>Upload Materials</NavLink></li>
                            <li><NavLink to="/dashboard/all-materials" className={navLinkClass}>View All Materials</NavLink></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-1 ml-0 lg:ml- p-4 min-h-screen bg-gray-50">
                {/* Topbar for mobile */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={toggleMenu}
                        className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaBars /> Menu
                    </button>
                </div>

                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
