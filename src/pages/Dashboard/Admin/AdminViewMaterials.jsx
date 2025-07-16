import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AdminViewMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/materials").then((res) => {
      setMaterials(res.data || []);
      setLoading(false);
    });
  }, []);

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:5000/materials/${id}`).then((res) => {
        console.log(res.data); // debug purpose
        if (res.data.success || res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The material has been deleted.", "success");
          setMaterials((prev) => prev.filter((item) => item._id !== id)); // update UI
        } else {
          Swal.fire("Error", "Failed to delete material", "error");
        }
      });
    }
  });
};

  if (loading) return <Loading />;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Uploaded Materials</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Session ID</th>
              <th>Tutor Email</th>
              <th>Drive Link</th>
              <th>Image</th>
              <th>Uploaded</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.sessionId}</td>
                <td>{item.tutorEmail}</td>
                <td>
                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td>
                  <img
                    src={item.imageUrl}
                    alt="material"
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {materials.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No materials found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewMaterials;
