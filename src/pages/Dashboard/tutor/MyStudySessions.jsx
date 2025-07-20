import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const MyStudySessions = () => {
    const { user } = useAuth();
    useTitle("My Study Sessions")

    const { data: sessions = [], refetch, isLoading } = useQuery({
        queryKey: ['my-study-sessions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/my-study-sessions?email=${user.email}`, {
                withCredentials: true
            });
            return res.data;
        }
    });

    const handleReapply = async (id) => {
        const confirm = await Swal.fire({
            title: "Reapply this session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reapply",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axios.patch(`http://localhost:5000/study-sessions/reapply/${id}`, {}, {
                withCredentials: true
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Reapplied successfully", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Failed to reapply", "error");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (sessions.length === 0) {
        return <h2 className="text-center font-semibold text-3xl ">No Approved Study sessions yet!</h2>;
    }


    return (
        <div className=" p-4">
            <h2 className="text-2xl font-bold mb-4">My Study Sessions</h2>
     <div className="overflow-x-auto w-full">
              <table className="min-w-full table-auto table ">
                <thead className="bg-gray-200 text-sm text-left">
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Registration</th>
                        <th>Class</th>
                        <th>Duration</th>
                        <th>Fee</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((s) => (
                        <tr key={s._id}>
                            <td>{s.title}</td>
                            <td className={`font-semibold capitalize ${s.status === 'approved' ? 'text-green-600' : 'text-red-500'}`}>
                                {s.status}
                            </td>
                            <td>{s.registrationStart} - {s.registrationEnd}</td>
                            <td>{s.classStart} - {s.classEnd}</td>
                            <td>{s.sessionDuration}</td>
                            <td>{s.registrationFee === 0 ? "Free" : `৳${s.registrationFee}`}</td>
                            <td>
                                {s.status === "rejected" && (
                                    <button
                                        onClick={() => handleReapply(s._id)}
                                        className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600"
                                    >
                                        Reapply
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
    );
};

export default MyStudySessions;
