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


import TutorRequestList from "../pages/Dashboard/Admin/TutorRequestLists";

import TutorRoute from "../routes/InstructorRoute";


import ApplyTutor from "../pages/Dashboard/tutor/ApplyTutor";
import ApprovedTutors from "../pages/Dashboard/Admin/ApprovedTutors.jsx";
import CreateStudySession from "../pages/Dashboard/tutor/CreateStudySession.jsx";
import MyStudySessions from "../pages/Dashboard/tutor/MyStudySessions.jsx";
import StudySessionList from "../pages/Dashboard/Admin/StudySessionList.jsx";


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
                path: 'applyTutor',
                Component: ApplyTutor
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
            //only admin routes
            {
                path: 'all-study-sessions',
                element: <AdminRoute><StudySessionList></StudySessionList></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'tutor-request-lists',
                element: <AdminRoute><TutorRequestList></TutorRequestList></AdminRoute>

            },
            {
                path:'approved-tutors',
            element:<AdminRoute> <ApprovedTutors></ApprovedTutors></AdminRoute>
            },
            // turor only route
            {
                path: 'create-study-session',
                element: <TutorRoute><CreateStudySession></CreateStudySession></TutorRoute>
            },
            {
                path: 'my-study-sessions',
                element: <TutorRoute> <MyStudySessions></MyStudySessions></TutorRoute>
            }
        ]

    },

    {
        path: '*',
        Component: NotFound
    }
])