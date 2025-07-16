import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/Errors/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";


import AdminRoute from "../routes/AdminRoute";




import TutorRequestList from "../pages/Dashboard/Admin/TutorRequestLists";

import TutorRoute from "../routes/InstructorRoute";


import ApplyTutor from "../pages/Dashboard/tutor/ApplyTutor";
import ApprovedTutors from "../pages/Dashboard/Admin/ApprovedTutors.jsx";
import CreateStudySession from "../pages/Dashboard/tutor/CreateStudySession.jsx";
import MyStudySessions from "../pages/Dashboard/tutor/MyStudySessions.jsx";
import StudySessionList from "../pages/Dashboard/Admin/StudySessionList.jsx";
import AllUsers from "../pages/Dashboard/Admin/AllUsers.jsx";
import StudySessionDetails from "../pages/StudySessions/StudySessionDetails.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import AllStudySessions from "../pages/StudySessions/AllStudySessions.jsx";
import AllTutors from "../pages/tutors/AllTutors.jsx";
import MyProfile from "../pages/Dashboard/student/MyProfile.jsx";
import MyBookedSessions from "../pages/Dashboard/student/MyBookedSessions.jsx";


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
            },
            {
                path:'study-sessions/:id',
                element: <PrivateRoute><StudySessionDetails></StudySessionDetails></PrivateRoute>
            },
            {
                path: '/all-study-sessions',
        Component: AllStudySessions
            },
            {
                path: 'all-tutors',
                Component: AllTutors
            }
        ],
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
                path: 'my-booked-sessions',
                Component:MyBookedSessions
            },
            //only admin routes
            {
                path: 'all-study-sessions',
                element: <AdminRoute><StudySessionList></StudySessionList></AdminRoute>
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
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