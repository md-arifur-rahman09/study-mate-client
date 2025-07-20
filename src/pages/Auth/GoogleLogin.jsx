import { useContext } from "react";

import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const handleGoogleLogin = () => {
        googleLogin()
            .then(async (res) => {
                const user = res.user;

                // Get JWT Token
                await axios.post("https://study-mate-server-nine.vercel.app/jwt", { email: user.email }, { withCredentials: true });

                // Send to DB if needed
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: "student",
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    status: "active",
                    isVerified: true,
                };

                await axios.post("https://study-mate-server-nine.vercel.app/users", userInfo);
                Swal.fire("Welcome!", "Google login successful", "success");
                navigate(from);
            })
            .catch((err) => {
                // console.log(err.message);
                Swal.fire("Error", err.message, "error");
            });
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-300 p-2 rounded hover:shadow-md transition"
        >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
        </button>
    );
};

export default GoogleLogin;
