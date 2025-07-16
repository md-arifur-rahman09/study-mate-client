import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const UploadMaterials = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [sessions, setSessions] = useState([]);



  // Load all approved sessions using useEffect
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/study-sessions/approved?tutorEmail=${user.email}`)
        .then((res) => setSessions(res.data || []))
        .catch(error=> {
            console.log(error);
        })
    }
  }, [user]);

const onSubmit = (data) => {
  const imageFile = data.image[0];
  const formData = new FormData();
  formData.append("image", imageFile);

  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

  axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData)
    .then((res) => {
      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        const materialInfo = {
          title: data.title,
          sessionId: data.sessionId,
          tutorEmail: user.email,
          imageUrl,
          driveLink: data.driveLink,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        axios.post("http://localhost:5000/materials", materialInfo)
          .then((res) => {
            if (res.data.success || res.data.insertedId) {
              Swal.fire("Success", "Material uploaded successfully", "success");
              reset();
            }
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire("Error", "Failed to save material", "error");
          });
      }
    })
    .catch((err) => {
      console.log(err.message);
      Swal.fire("Error", "Image upload failed", "error");
    });
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Upload Study Materials</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Select Approved Session</label>
          <select
            {...register("sessionId", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select session</option>
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Tutor Email</label>
          <input
            type="text"
            readOnly
            defaultValue={user.email}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Material Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter title"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Google Drive Link</label>
          <input
            type="text"
            {...register("driveLink", { required: true })}
            placeholder="Paste Google Drive link"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Upload Material
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
