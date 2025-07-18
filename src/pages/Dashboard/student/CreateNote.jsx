import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const CreateNote = () => {
  useTitle("Create Note")
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      email: user?.email,
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorName: user?.displayName || "Anonymous",
      userPhoto: user?.photoURL || null,
      status: "active"
    };

    try {
      const res = await axios.post("http://localhost:5000/notes", noteData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Note created successfully", "success");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
        console.log(error)
      Swal.fire("Error", "Failed to create note", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Note</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="label">Your Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="label">Note Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea textarea-bordered w-full"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full text-white rounded"
        >
          Submit Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
