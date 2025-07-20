import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateSessionForm = ({ session, onClose, refetch }) => {
    const [formData, setFormData] = useState({
        title: session.title || "",
        description: session.description || "",
        classStartDate: session.classStartDate || "",
        classEndDate: session.classEndDate || "",
        sessionDuration: session.sessionDuration || "",
        registrationFee: session.registrationFee || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // validation: only allow positive number for fee
        if (name === "registrationFee" && (isNaN(value) || Number(value) < 0)) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.patch(
                `https://study-mate-server-nine.vercel.app/study-sessions/${session._id}`,
                formData,
                { withCredentials: true }
            );

            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated", "Session updated successfully", "success");
                refetch();
                onClose();
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded w-full max-w-lg shadow-md"
            >
                <h3 className="text-xl font-bold mb-4">Update Study Session</h3>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Session Title"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Session Description"
                    />
                    <input
                        type="date"
                        name="classStartDate"
                        value={formData.classStartDate}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="date"
                        name="classEndDate"
                        value={formData.classEndDate}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="sessionDuration"
                        value={formData.sessionDuration}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Session Duration (e.g. 4 weeks)"
                    />
                    <input
                        type="text"
                        name="registrationFee"
                        value={formData.registrationFee}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Registration Fee (0 = free)"
                    />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSessionForm;
