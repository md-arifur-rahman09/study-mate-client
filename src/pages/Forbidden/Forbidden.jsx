import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
            <FaBan className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
            <p className="text-gray-600 mb-6">
                You don't have permission to access this page.
            </p>
            <Link
                to="/"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
                Go Home
            </Link>
        </div>
    );
};

export default Forbidden;
