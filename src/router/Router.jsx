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
            {
                path:'manage-courses',
                element: <AdminRoute><ManageCourses></ManageCourses></AdminRoute>
            },
            {
                path:'manage-users',
                element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }
        ]

    },
    
    {
        path:'*',
        Component: NotFound
    }
])