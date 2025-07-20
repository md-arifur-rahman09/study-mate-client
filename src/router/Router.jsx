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
import CreateNote from "../pages/Dashboard/student/CreateNote.jsx";
import ManageNotes from "../pages/Dashboard/student/ManageNotes.jsx";
import AllStudyMaterials from "../pages/Dashboard/student/AllStudyMaterials.jsx";

import AllMaterials from "../pages/Dashboard/tutor/AllMaterials.jsx";
import AdminViewMaterials from "../pages/Dashboard/Admin/AdminViewMaterials.jsx";
import PaymentPage from "../pages/Payment/PaymentPage.jsx";
import UploadMaterials from "../pages/Dashboard/tutor/UploadMaterials.jsx";
import TermsOfUse from "../pages/Footer/TermsOfUse.jsx";
import PrivacyPolicy from "../pages/Footer/PrivacyPolicy.jsx";
import CookiePolicy from "../pages/Footer/CookiePolicy.jsx";




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
              element:<PrivateRoute> <ApplyTutor></ApplyTutor></PrivateRoute>
            },
            {
                path: 'study-sessions/:id',
                element: <StudySessionDetails></StudySessionDetails>
            },
            {
                path: '/all-study-sessions',
                Component: AllStudySessions
            },
            {
                path: 'all-tutors',
                Component: AllTutors
            },
            {
  path: '/terms',
  Component: TermsOfUse
},
{
  path: '/privacy',
  Component: PrivacyPolicy
},
{
  path: '/cookie-policy',
  Component: CookiePolicy
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
                Component: MyBookedSessions
            },
            {
                path: 'create-a-note',
                Component: CreateNote
            },
            {
                path: 'manage-notes',
                Component: ManageNotes
            },
            {
                path: 'all-study-materials',
                Component: AllStudyMaterials
            },
            {
                path: 'payment/:id',
                Component:PaymentPage
            },
            //only admin routes
              {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-study-sessions',
                element: <AdminRoute><StudySessionList></StudySessionList></AdminRoute>
            },
          
            {
                path: 'tutor-request-lists',
                element: <AdminRoute><TutorRequestList></TutorRequestList></AdminRoute>

            },
            {
                path: 'approved-tutors',
                element: <AdminRoute> <ApprovedTutors></ApprovedTutors></AdminRoute>
            },
            {
                path: 'view-all-materials',
                element: <AdminRoute><AdminViewMaterials></AdminViewMaterials></AdminRoute>
            },
            // turor only route
            {
                path: 'create-study-session',
                element: <TutorRoute><CreateStudySession></CreateStudySession></TutorRoute>
            },
            {
                path: 'my-study-sessions',
                element: <TutorRoute> <MyStudySessions></MyStudySessions></TutorRoute>
            },
            {
                path: 'upload-materials',
                element: <TutorRoute><UploadMaterials></UploadMaterials></TutorRoute>
            },
            {
                path: 'all-materials',
                element: <TutorRoute><AllMaterials></AllMaterials></TutorRoute>
            }
        ]

    },

    {
        path: '*',
        Component: NotFound
    },
    {
        path:'/payment/:id',
        Component: PaymentPage
    },

   
])