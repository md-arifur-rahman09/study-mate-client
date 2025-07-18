import { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const ManageNotes = () => {
  useTitle("Manage Notes")
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/notes/${user.email}`)
        .then((res) => setNotes(res.data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      axios.delete(`http://localhost:5000/notes/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          setNotes(notes.filter((note) => note._id !== id));
          Swal.fire("Deleted!", "Your note has been deleted.", "success");
        }
      })
      .catch(error=> {
        console.log(error);

      })
    }
  };

  const handleUpdate = () => {
    const { _id, title, description } = selectedNote;
    axios
      .put(`http://localhost:5000/notes/${_id}`, {
        title,
        description,
        updatedAt: new Date(),
      })
      .then((res) => {
        if (res.data.modifiedCount ) {
          const updated = notes.map((n) =>
            n._id === _id ? { ...n, title, description } : n
          );
          setNotes(updated);
          Swal.fire("Updated!", "Your note has been updated.", "success");
          setIsModalOpen(false);
        }
      });
  };
if(notes.length=== 0){
    return <h2 className="text-2xl font-semibold text-center">No notes yet created!</h2>
}
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Personal Notes</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note._id}>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => {
                      setSelectedNote({ ...note });
                      setIsModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Note</h3>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              value={selectedNote.title}
              onChange={(e) =>
                setSelectedNote({ ...selectedNote, title: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              rows={4}
              value={selectedNote.description}
              onChange={(e) =>
                setSelectedNote({
                  ...selectedNote,
                  description: e.target.value,
                })
              }
            ></textarea>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageNotes;
