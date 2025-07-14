import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

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
                navigate(from);
            })
            .catch((err) => {
                console.log(err.message);
                Swal.fire("Error!", err.message, "error");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div >
            <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

                <form
                    onSubmit={handleLogin}
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" required className="w-full border p-2 rounded" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" required className="w-full border p-2 rounded" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white p-2 rounded hover:bg-opacity-90"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>


                <GoogleLogin></GoogleLogin>
            </div>
        </div>
    );
};

export default Login;
