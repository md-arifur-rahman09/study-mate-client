import { useForm } from "react-hook-form";

import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const CreateStudySession = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const sessionData = {
      title: data.title,
      tutorName: user.displayName,
      tutorEmail: user.email,
      description: data.description,
      registrationStart: data.registrationStart,
      registrationEnd: data.registrationEnd,
      classStart: data.classStart,
      classEnd: data.classEnd,
      duration: data.duration,
      registrationFee: 0, // default, only admin can change
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:5000/study-sessions", sessionData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Study session created!", "success");
        // reset();
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to create session", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Create Study Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1">Session Title</label>
          <input {...register("title", { required: true })} className="input" />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        <div>
          <label className="block mb-1">Tutor Name</label>
          <input value={user?.displayName || ""} disabled className="input bg-gray-100" />
        </div>

        <div>
          <label className="block mb-1">Tutor Email</label>
          <input value={user?.email || ""} disabled className="input bg-gray-100" />
        </div>

        <div>
          <label className="block mb-1">Session Description</label>
          <textarea {...register("description", { required: true })} rows={4} className="input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Registration Start Date</label>
            <input type="date" {...register("registrationStart", { required: true })} className="input" />
          </div>
          <div>
            <label className="block mb-1">Registration End Date</label>
            <input type="date" {...register("registrationEnd", { required: true })} className="input" />
          </div>
          <div>
            <label className="block mb-1">Class Start Date</label>
            <input type="date" {...register("classStart", { required: true })} className="input" />
          </div>
          <div>
            <label className="block mb-1">Class End Date</label>
            <input type="date" {...register("classEnd", { required: true })} className="input" />
          </div>
        </div>

        <div>
          <label className="block mb-1">Session Duration</label>
          <input {...register("duration", { required: true })} placeholder="e.g. 3 months" className="input" />
        </div>

      

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateStudySession;
