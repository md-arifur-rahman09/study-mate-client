import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedInstructors = () => {
    const { data: instructors = [], isPending, error,refetch } = useQuery({
        queryKey: ['approved-instructors'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/approved-instructors");
            return res.data;
        }
    });

    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
            title: "Deactivate this instructor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axios.patch(`http://localhost:5000/instructor-deactivate/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Instructor deactivated", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Failed to deactivate", "error");
        }
    };


    if (isPending) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">Error loading instructors</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Approved Instructors</h2>

            <div className="overflow-x-auto">
                <table className="table w-full bg-white shadow rounded">
                    <thead>
                        <tr className="bg-primary text-white text-sm">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Expertise</th>
                            <th>Experience</th>
                            <th>Phone</th>
                            <th>Profile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((inst, index) => (
                            <tr key={inst._id} className="hover:bg-gray-100 text-sm">
                                <td>{index + 1}</td>
                                <td>{inst.name}</td>
                                <td>{inst.email}</td>
                                <td>{inst.expertise}</td>
                                <td>{inst.experienceYears}</td>
                                <td>{inst.phone}</td>
                                <td>
                                    <img
                                        src={inst.photo}
                                        alt={inst.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td><button
                                    onClick={() => handleDeactivate(inst._id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    Deactivate
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {instructors.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No approved instructors yet.</p>
                )}
            </div>
        </div>
    );
};

export default ApprovedInstructors;
