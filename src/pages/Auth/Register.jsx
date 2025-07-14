import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.photo.files[0];

    if (password.length < 6) {
      return Swal.fire("Error", "Password must be at least 6 characters", "error");
    }

    setUploading(true);

    const imageData = new FormData();
    imageData.append("image", imageFile);
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

    axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, imageData)
      .then((imgbbRes) => {
        const photoURL = imgbbRes.data.data.url;

        createUser(email, password)
          .then((res) => {
            console.log(res.user);
            updateUserProfile({ displayName: name, photoURL })
              .then(() => {
                const currentTime = new Date().toISOString();

                const userInfo = {
                  name,
                  email,
                  photo: photoURL,
                  role: "student",
                  createdAt: currentTime,
                  lastLogin: currentTime,
                  status: "active",
                  isVerified: false,
                };

                axios
                  .post("http://localhost:5000/users", userInfo)
                  .then(() => {
                    axios
                      .post("http://localhost:5000/jwt", { email }, { withCredentials: true })
                      .then(() => {
                        Swal.fire("Success!", "Registration complete", "success");
                        navigate("/");
                      })
                      .catch((err) => {
                        console.log(err);
                        Swal.fire("JWT Error", err.message, "error");
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    Swal.fire("DB Error", err.message, "error");
                  });
              })
              .catch((err) => {
                console.log(err.message);
                Swal.fire("Update Error", err.message, "error");
              });
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire("Registration Error", err.message, "error");
          });
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire("Image Upload Error", err.message, "error");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-primary text-white p-2 rounded hover:bg-opacity-90"
        >
          {uploading ? "Uploading..." : "Register"}
        </button>
      </form>
      <GoogleLogin></GoogleLogin>
    </div>
  );
};

export default Register;
