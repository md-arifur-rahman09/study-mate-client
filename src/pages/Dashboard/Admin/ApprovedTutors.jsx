import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../Loading/Loading";

const ApprovedTutors = () => {
    useTitle("Approved Tutors")
    const { data: tutors = [], isPending, error, refetch } = useQuery({
        queryKey: ['approved-tutors'],
        queryFn: async () => {
            const res = await axios.get("https://study-mate-server-nine.vercel.app/approved-tutors", {
                withCredentials: true
            });
            return res.data;
        }
    });

    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
            title: "Deactivate this tutor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axios.patch(`https://study-mate-server-nine.vercel.app/tutor-deactivate/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Tutor deactivated", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Failed to deactivate", "error");
        }
    };


    if (isPending) return <Loading></Loading>;
    if (error) return <p className="text-center text-red-500 py-10">Error loading tutors</p>;
    if (tutors.length === 0) {
        return <h2 className="text-center text-3xl font-semibold  mt-10">No Tutors found.</h2>

    }

    return (
        <div >
            <h2 className="text-3xl font-semibold mb-4  ">Approved Tutors</h2>

            <div className="overflow-x-auto">
                <table className="table w-full bg-white shadow rounded">
                    <thead>
                        <tr className="bg-gray-100 text-sm">
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
                        {tutors.map((inst, index) => (
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
                {tutors.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No approved tutors yet.</p>
                )}
            </div>
        </div>
    );
};

export default ApprovedTutors;
