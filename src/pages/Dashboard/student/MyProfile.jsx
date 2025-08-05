// src/pages/Dashboard/MyProfile.jsx

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import useTitle from "../../../hooks/useTitle";




const MyProfile = () => {
    useTitle("My Profile")
    const { user, loading } = useAuth();

    const { data: userInfo, isPending } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ["user-info", user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://study-mate-server-nine.vercel.app/users/role/${user.email}`);
            const extraRes = await axios.get(`https://study-mate-server-nine.vercel.app/users/details/${user.email}`);
            return {
                ...extraRes.data,
                role: res.data.role,
            };
        },
    });

    if (loading || isPending) return <Loading />;

    const { name, email, photo, role, createdAt, lastLogin, status } = userInfo;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md max-w-xl mx-auto">
            <div className="flex flex-col items-center">
                <img
                    src={photo}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border"
                />
                <h2 className="text-2xl font-bold mt-4">{name}</h2>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-sm mt-2 px-4 py-1 bg-gray-100 rounded text-gray-800 font-semibold capitalize">
                    Role: {role}
                </p>
            </div>

            <div className="mt-6 text-sm text-gray-700 space-y-1">
                <p><strong>Account Created:</strong> {new Date(createdAt).toLocaleString()}</p>
                {/* <p><strong>Last Login:</strong> {new Date(lastLogin).toLocaleString()}</p> */}
                <p><strong>Status:</strong> {status}</p>
            </div>
        </div>
    );
};

export default MyProfile;
