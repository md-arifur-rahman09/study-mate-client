import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const { signInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    signInUser(email, password)
      .then(async () => {
        await axios.post("http://localhost:5000/jwt", { email }, { withCredentials: true });
        Swal.fire("Welcome!", "Login successful", "success");
        navigate(location.state || '/');
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <Link  to="/register" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </div>

        <div className="divider">OR</div>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
