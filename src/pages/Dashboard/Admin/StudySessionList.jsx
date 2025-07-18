import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateSessionForm from "./UpdateSessionForm";
import useTitle from "../../../hooks/useTitle";

const StudySessionList = () => {
    useTitle("Study Sessions List")
    const [approveModal, setApproveModal] = useState(null);
    const [rejectModal, setRejectModal] = useState(null);
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const { data: sessions = [], refetch, isLoading } = useQuery({
        queryKey: ["admin-all-sessions"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/study-sessions", {
                withCredentials: true,
            });
            return res.data;
        },
    });

    const handleApproveSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(
                `http://localhost:5000/study-sessions/approve/${approveModal._id}`,
                { registrationFee: parseFloat(amount) },
                { withCredentials: true }
            );
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Session approved", "success");
                refetch();
            }
        } catch {
            Swal.fire("Error", "Failed to approve", "error");
        }
        setApproveModal(null);
        setAmount(0);
    };

    const handleRejectSubmit = async (e) => {
        e.preventDefault();
        try {
            const rejectionData = {
                sessionId: rejectModal._id,
                tutorEmail: rejectModal.tutorEmail,
                rejectionReason: reason,
                feedback,
            };
            const res = await axios.post("http://localhost:5000/rejected-sessions", rejectionData);
            if (res.data.success) {
                Swal.fire("Rejected", "Session rejected", "success");
                refetch();
            }
        } catch {
            Swal.fire("Error", "Failed to reject", "error");
        }
        setRejectModal(null);
        setReason("");
        setFeedback("");
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });
        if (!confirm.isConfirmed) return;

        try {
            const res = await axios.delete(`http://localhost:5000/study-sessions/${id}`, {
                withCredentials: true,
            });
            if (res.data.deletedCount > 0) {
                Swal.fire("Deleted", "Session deleted", "success");
                refetch();
            }
        } catch {
            Swal.fire("Error", "Failed to delete", "error");
        }
    };

    if (isLoading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">All Study Sessions</h2>
            <table className="table w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th>Title</th>
                        <th>Tutor</th>
                        <th>Status</th>
                        <th>Fee</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions
                        .filter(s => s.status !== "rejected")
                        .map((s) => (
                            <tr key={s._id}>
                                <td>{s.title}</td>
                                <td>{s.tutorName}</td>
                                <td className="capitalize">{s.status}</td>
                                <td>{s.registrationFee === 0 ? "Free" : `৳${s.registrationFee}`}</td>
                                <td className="space-x-2">
                                    {s.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => setApproveModal(s)}
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setRejectModal(s)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {s.status === "approved" && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setSelectedSession(s);
                                                    setShowUpdateModal(true);
                                                }}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Update
                                            </button>

                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Approve Modal */}
            {approveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleApproveSubmit}
                        className="bg-white p-6 rounded shadow-md w-full max-w-md"
                    >
                        <h3 className="text-lg font-semibold mb-4">Approve Session</h3>
                        <label className="block mb-2">Fee  ($0 = Free)</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;

                                // Allow only digits (no letters, no symbols)
                                if (!/^\d*$/.test(value)) return;

                                // Prevent values less than 1
                                if (parseInt(value) < 1 && value !== "") return;

                                setAmount(value);
                            }}
                            className="w-full border p-2 rounded mb-4"
                            placeholder="Enter registration fee"
                            required
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setApproveModal(null)}
                                className="bg-gray-500 px-4 py-1 rounded text-white"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-green-600 px-4 py-1 rounded text-white">
                                Confirm Approve
                            </button>
                        </div>
                    </form>
                </div>
            )}



            {/* Reject Modal */}
            {rejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleRejectSubmit}
                        className="bg-white p-6 rounded shadow-md w-full max-w-md"
                    >
                        <h3 className="text-lg font-semibold mb-4">Reject Session</h3>

                        <label className="block mb-1">Rejection Reason</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                            className="w-full border p-2 rounded mb-4"
                        />

                        <label className="block mb-1">Feedback</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                            className="w-full border p-2 rounded mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setRejectModal(null)}
                                className="bg-gray-500 px-4 py-1 rounded text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-red-600 px-4 py-1 rounded text-white"
                            >
                                Submit Reject
                            </button>
                        </div>
                    </form>
                </div>
            )}


            {showUpdateModal && (
                <UpdateSessionForm
                    session={selectedSession}
                    onClose={() => setShowUpdateModal(false)}
                    refetch={refetch}
                />
            )}

        </div>
    );
};

export default StudySessionList;
