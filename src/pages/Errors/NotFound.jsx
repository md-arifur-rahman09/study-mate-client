import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
                    Oops! Page not found
                </h2>
                <p className="text-gray-600 mt-2 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
                >
                    <FaArrowLeft />
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
