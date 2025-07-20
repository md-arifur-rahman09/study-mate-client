import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useTitle from "../../hooks/useTitle";

const AllTutors = () => {
    useTitle("All Tutors")
    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ["approved-tutors"],
        queryFn: async () => {
            const res = await axios.get("https://study-mate-server-nine.vercel.app/tutors?status=approved");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-5">Loading tutors...</p>;

    return (
        <div className="p-4 ">
            <h2 className="text-2xl font-bold mb-4">All Listed Tutors</h2>
           <div className="overflow-x-auto">
             {tutors.length === 0 ? (
                <p className="text-gray-500">No approved tutors found.</p>
            ) : (
                <table className="min-w-full table-auto ">
                    <thead className="bg-gray-200 text-sm">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Expertise</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor) => (
                            <tr key={tutor._id} className=" hover:bg-gray-50 text-sm">
                                <td className="px-4 py-2">{tutor.name}</td>
                                <td className="px-4 py-2">{tutor.email}</td>
                                <td className="px-4 py-2">{tutor.expertise}</td>
                                <td className="px-4 py-2">{tutor.phone}</td>
                                <td className="px-4 py-2">{tutor.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
           </div>
        </div>
    );
};

export default AllTutors;
