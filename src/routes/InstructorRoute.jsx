// src/routes/InstructorRoute.jsx

import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../pages/Forbidden/Forbidden";
import Loading from "../pages/Loading/Loading";


const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) return <Loading />;

  if (user && role === "instructor") return children;

  if (user && role !== "instructor") return <Forbidden />;

  return <Navigate to="/login" replace />;
};

export default InstructorRoute;
