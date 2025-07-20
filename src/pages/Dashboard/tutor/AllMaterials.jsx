import { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const AllMaterials = () => {
  useTitle("All Uploaded Materials")
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit,  setValue } = useForm();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/material?tutorEmail=${user.email}`,{
          withCredentials: true
        })
        .then((res) => setMaterials(res.data))
        .catch(error=> {
          console.log(error)
        })
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This material will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/materials/${id}`).then((res) => {
          if (res.data.success) {
            setMaterials(materials.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Material has been deleted.", "success");
          } else {
            Swal.fire("Failed", "Could not delete material.", "error");
          }
        });
      }
    });
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setShowModal(true);
    setValue("title", material.title);
    setValue("driveLink", material.driveLink);
  };

  const onSubmit = (data) => {
    axios
      .patch(`http://localhost:5000/materials/${editingMaterial._id}`, {
        title: data.title,
        driveLink: data.driveLink,
        updatedAt: new Date().toISOString(),
      })
      .then((res) => {
        if (res.data.success) {
          const updated = materials.map((item) =>
            item._id === editingMaterial._id
              ? { ...item, title: data.title, driveLink: data.driveLink }
              : item
          );
          setMaterials(updated);
          setShowModal(false);
          Swal.fire("Updated!", "Material updated successfully.", "success");
        } else {
          Swal.fire("Error", "Failed to update material.", "error");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Uploaded Materials</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Session ID</th>
              <th>Drive Link</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.sessionId}</td>
                <td>
                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td>
                  <img src={item.imageUrl} alt="material" className="w-16 h-16 rounded" />
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-sm btn-info"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Material</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Title"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                {...register("driveLink", { required: true })}
                placeholder="Google Drive Link"
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMaterials;
