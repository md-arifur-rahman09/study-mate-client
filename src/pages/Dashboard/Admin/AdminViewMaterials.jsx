import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import useTitle from "../../../hooks/useTitle";

const AdminViewMaterials = () => {
  useTitle("All Uploaded Materials");

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
          if (res.data.success || res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The material has been deleted.", "success");
            setMaterials((prev) => prev.filter((item) => item._id !== id));
          } else {
            Swal.fire("Error", "Failed to delete material", "error");
          }
        });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Uploaded Materials</h2>

      {materials.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No materials found.</div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-auto w-full">
            <thead className="bg-base-200 text-[13px] uppercase">
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
                  <td className="max-w-[120px] truncate">{item.title}</td>
                  <td>{item.sessionId}</td>
                  <td className="max-w-[140px] truncate">{item.tutorEmail}</td>
                  <td>
                    <a
                      href={item.driveLink}
                      title="View"
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
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
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

export default AdminViewMaterials;
