// src/routes/AdminRoute.jsx



import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../pages/Forbidden/Forbidden";
import Loading from "../pages/Loading/Loading";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) return <Loading />;

  if (user && role === "admin") return children;

  if (user && role !== "admin") return <Forbidden />;

  return <Navigate to="/login" replace />;
};

export default AdminRoute;
