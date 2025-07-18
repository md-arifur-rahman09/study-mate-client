import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {  useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const ApplyTutor = () => {
    useTitle("Apply Tutor")
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [uploading, setUploading] = useState(false);
   
    const { user } = useAuth();
 

    const onSubmit = async (data) => {

        setUploading(true);


        const photoURL = user?.photoURL;

        const tutorInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            qualification: data.qualification,
            expertise: data.expertise,
            biography: data.biography,
            cvLink: data.cvLink || "",
            facebook: data.facebook || "",
            linkedin: data.linkedin || "",
            website: data.website || "",
            photo: photoURL,
            experienceYears: data.experienceYears || "",
            teachingModes: data.teachingModes || "",
            expectedSalary: data.expectedSalary || "",
            availability: data.availability || "",
            gender: data.gender || "",
            location: data.location || "",
            appliedAt: new Date().toISOString(),
            status: "pending",
        };

        axios.post("http://localhost:5000/tutor-requests", tutorInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Success!", "Your tutor request has been submitted.", "success");
                    reset();
                }
            })
            .catch(error => {
                console.log(error);
            });

        setUploading(false);
    };


    return (
       <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-10">
            <h2 className="text-2xl font-bold mb-6">Apply as Tutor</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label>Name*</label>
                    <input {...register("name", { required: true })} placeholder="Your full name"
                        defaultValue={user?.displayName}
                        className="input input-bordered w-full" readOnly />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>

                <div>
                    <label>Email*</label>
                    <input type="email" {...register("email", { required: true })} placeholder="example@email.com"
                        defaultValue={user?.email}
                        className="input input-bordered w-full" readOnly />
                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                </div>

                <div>
                    <label>Phone*</label>
                    <input {...register("phone", { required: true })} placeholder="+8801234567890" className="input input-bordered w-full" />
                    {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                </div>



                <div>
                    <label>Qualification*</label>
                    <input {...register("qualification", { required: true })} placeholder="e.g., B.Sc in CSE" className="input input-bordered w-full" />
                    {errors.qualification && <p className="text-red-500 text-sm">Qualification is required</p>}
                </div>

                <div>
                    <label>Expertise*</label>
                    <input {...register("expertise", { required: true })} placeholder="e.g., React, AI, Networking" className="input input-bordered w-full" />
                    {errors.expertise && <p className="text-red-500 text-sm">Expertise is required</p>}
                </div>

                <div>
                    <label>Why do you want to be an tutor?*</label>
                    <textarea {...register("biography", { required: true })} placeholder="Share your motivation and experience..." rows={4} className="textarea textarea-bordered w-full" />
                    {errors.biography && <p className="text-red-500 text-sm">This field is required</p>}
                </div>

                <div>
                    <label>CV Link (optional)</label>
                    <input {...register("cvLink")} placeholder="Google Drive or other link" className="input input-bordered w-full" />
                </div>

                <div>
                    <label>Facebook (optional)</label>
                    <input {...register("facebook")} placeholder="Facebook profile link" className="input input-bordered w-full" />
                </div>

                <div>
                    <label>LinkedIn (optional)</label>
                    <input {...register("linkedin")} placeholder="LinkedIn profile link" className="input input-bordered w-full" />
                </div>

                <div>
                    <label>Website (optional)</label>
                    <input {...register("website")} placeholder="Portfolio or website link" className="input input-bordered w-full" />
                </div>

                {/* 🔽 New Fields Below 🔽 */}
                <div>
                    <label>Years of Experience</label>
                    <input {...register("experienceYears")} placeholder="e.g., 3 years" className="input input-bordered w-full" />
                </div>

                <div>
                    <label>Preferred Teaching Mode</label>
                    <select {...register("teachingModes")} className="select select-bordered w-full">
                        <option value="">Select mode</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div>
                    <label>Expected Salary (Monthly)</label>
                    <input {...register("expectedSalary")} placeholder="e.g., 20,000 BDT" className="input input-bordered w-full" />
                </div>

                <div>
                    <label>Availability</label>
                    <input {...register("availability")} placeholder="e.g., Weekends, 6-10 PM" className="input input-bordered w-full" />
                </div>

                <div>
                    <label>Gender</label>
                    <select {...register("gender")} className="select select-bordered w-full">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Location</label>
                    <input {...register("location")} placeholder="e.g., Dhaka, Bangladesh" className="input input-bordered w-full" />
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="btn btn-primary w-full"
                >
                    {uploading ? "Submitting..." : "Apply Now"}
                </button>
            </form>
        </div>
    );
};

export default ApplyTutor;
