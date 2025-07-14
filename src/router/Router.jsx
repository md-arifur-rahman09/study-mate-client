import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/Errors/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyCourses from "../pages/Dashboard/MyCourses";
import AdminRoute from "../routes/AdminRoute";
import ManageCourses from "../pages/Dashboard/Admin/ManageCourses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import InstructorRoute from "../routes/InstructorRoute";
import AddCourse from "../pages/Dashboard/Instructor/AddCourse";
import MyCreatedCourses from "../pages/Dashboard/Instructor/MyCreatedCourses";
import ApplyInstructor from "../pages/Dashboard/Instructor/ApplyInstructor";
import InstructorRequestList from "../pages/Dashboard/Admin/InstructorRequestLists";
import ApprovedInstructors from "../pages/Dashboard/Admin/ApprovedInstructors";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },

            {
                path: 'login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },

            {
                path: 'applyInstructor',
                Component: ApplyInstructor
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            // only student routes
            {
                path: 'myProfile',
                Component: MyProfile
            },
            {
                path: 'myCourses',
                Component: MyCourses
            },
            //only admim routes
            {
                path: 'manage-courses',
                element: <AdminRoute><ManageCourses></ManageCourses></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'instructor-request-lists',
                element: <AdminRoute><InstructorRequestList></InstructorRequestList></AdminRoute>

            },
            {
                path:'approved-instructors',
            element:<AdminRoute> <ApprovedInstructors></ApprovedInstructors></AdminRoute>
            },
            // instructor only route
            {
                path: 'add-course',
                element: <InstructorRoute><AddCourse></AddCourse></InstructorRoute>
            },
            {
                path: 'my-courses',
                element: <InstructorRoute> <MyCreatedCourses></MyCreatedCourses></InstructorRoute>
            }
        ]

    },

    {
        path: '*',
        Component: NotFound
    }
])