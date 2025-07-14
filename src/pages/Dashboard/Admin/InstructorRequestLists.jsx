import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const InstructorRequestList = () => {
    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['instructor-requests'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/instructor-requests?status=pending");
            return res.data;
        }
    });

    const handleAction = async (id, action) => {
        const confirm = await Swal.fire({
            title: `${action === 'approved' ? "Approve" : "Reject"} Request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axios.patch(`http://localhost:5000/instructor-requests/${id}`, {
                status: action
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", `Request ${action}ed`, "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Pending Instructor Requests</h2>
            {requests.length === 0 ? (
                <p className="text-gray-500">No pending requests.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead>
                            <tr className="bg-gray-200 text-sm text-left">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Expertise</th>
                                <th>CV</th>
                                <th>Applied At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id}>
                                    <td>{req.name}</td>
                                    <td>{req.email}</td>
                                    <td>{req.phone}</td>
                                    <td>{req.expertise}</td>
                                    <td>
                                        <Link
                                            to={req.cvLink}
                                            target="_blank"
                                            className="text-blue-500 underline"
                                        >
                                            View CV
                                        </Link>
                                    </td>
                                    <td>{new Date(req.appliedAt).toLocaleString()}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleAction(req._id, "approved")}
                                            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(req._id, "rejected")}
                                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InstructorRequestList;
