import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";
import useTitle from "../../hooks/useTitle";
import { useNavigate } from "react-router";

const Register = () => {
  useTitle("Register");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const navigate=useNavigate();

 

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

                axios.post("http://localhost:5000/users", userInfo)
                  .then(res => {
                   console.log(res.data);
                   navigate('/')
                  })
                  .catch((err) => {
                    Swal.fire("DB Error", err.message, "error");
                  });
              })
              .catch((err) => {
                Swal.fire("Update Error", err.message, "error");
              });
          })
          .catch((err) => {
            Swal.fire("Registration Error", err.message, "error");
          });
      })
      .catch((err) => {
        Swal.fire("Image Upload Error", err.message, "error");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-3xl font-bold text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Profile Photo</span>
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              required
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              className="input input-bordered w-full"
              placeholder="Enter a strong password"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="btn btn-primary w-full"
          >
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>

        <div className="divider">OR</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
