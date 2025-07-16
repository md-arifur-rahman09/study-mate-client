import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const StudySessionDetails = () => {
    const { id } = useParams();
    const { user, loading } = useAuth();
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [reviews, setReviews] = useState([]);

    const { data: session = {}, isLoading } = useQuery({
        queryKey: ['study-session', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/study-sessions/${id}`);
            return res.data;
        }
    });

    // Fetch user role from database
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/users/role/${user.email}`)
                .then(res => {
                    setUserRole(res.data.role);
                })
                .catch(() => setUserRole(null));
        }
    }, [user]);

    // Check if already booked
    useEffect(() => {
        if (user?.email && session?._id) {
            axios.get(`http://localhost:5000/booked-sessions/check?studentEmail=${user.email}&sessionId=${session._id}`)
                .then(res => {
                    setAlreadyBooked(res.data.alreadyBooked);
                })
                .catch(() => setAlreadyBooked(false));
        }
    }, [user, session]);

    // Load reviews
    useEffect(() => {
        if (session?._id) {
            axios.get(`http://localhost:5000/reviews/${session._id}`)
                .then(res => setReviews(res.data))
                .catch(() => setReviews([]));
        }
    }, [session]);

    const now = new Date();
    const registrationStart = new Date(session.registrationStart);
    const registrationEnd = new Date(session.registrationEnd);

    const isBeforeStart = now < registrationStart;
    const isRegistrationOngoing = registrationStart <= now && now <= registrationEnd;
    const isRegistrationEnded = now > registrationEnd;

    const handleBooking = async () => {
        if (!user) {
            return Swal.fire("Login Required", "Please login to book the session", "warning");
        }

        if (userRole === "admin" || userRole === "tutor") {
            return Swal.fire("Access Denied", "Only students can book sessions", "error");
        }

        if (session.registrationFee > 0) {
            return Swal.fire("Redirecting", "You will be taken to the payment page", "info");
        }

        const bookingData = {
            sessionId: session._id,
            sessionTitle: session.title,
            studentEmail: user.email,
            tutorEmail: session.tutorEmail,
            registrationFee: session.registrationFee,
            status: "booked",
            paymentStatus: "free",
            sessionStart: session.classStart || null,
            sessionEnd: session.classEnd || null,
            bookingTime: new Date().toISOString()
        };

        try {
            const res = await axios.post("http://localhost:5000/booked-sessions", bookingData);
            if (res.data.success || res.data.insertedId) {
                Swal.fire("Booked!", "Session booked successfully", "success");
                setAlreadyBooked(true);
            }
        } catch (error) {
            Swal.fire("Oops!", "You have already booked this session.", "warning");
        }
    };

    if (isLoading || loading) return <p className="text-center py-10">Loading...</p>;

    const isDisabled = !user || userRole === "admin" || userRole === "tutor" || alreadyBooked || isBeforeStart || isRegistrationEnded;

    const buttonLabel = !user ? "Login required"
        : userRole === "admin" || userRole === "tutor" ? "Only students can book"
        : alreadyBooked ? "Already Booked"
        : isBeforeStart ? "Upcoming"
        : isRegistrationEnded ? "Registration Closed"
        : "Book Now";

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div className="bg-base-100 shadow-md rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-1">{session.title}</h1>
                <p className="text-gray-600">By: {session.tutorName} ({session.tutorEmail})</p>
                <p className="text-sm text-gray-500 mb-4">Status: {session.status}</p>

                <div className="grid md:grid-cols-2 gap-5">
                    <p><strong>Description:</strong> {session.description}</p>
                    <p><strong>Registration:</strong> {session.registrationStart || "N/A"} → {session.registrationEnd || "N/A"}</p>
                    <p><strong>Class Duration:</strong> {session.classStart || "N/A"} → {session.classEnd || "N/A"}</p>
                    <p><strong>Session Length:</strong> {session.duration || "N/A"}</p>
                    <p><strong>Registration Fee:</strong> {session.registrationFee === 0 ? "Free" : `৳ ${session.registrationFee}`}</p>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleBooking}
                        className={`px-5 py-2 rounded text-white ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={isDisabled}
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-base-100 shadow rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet for this session.</p>
                ) : (
                    <div className="space-y-3 ">
                        {reviews.map((r, idx) => (
                            <div key={idx} className="border p-3 rounded-md">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{r.studentEmail}</span>
                                    <span className="text-yellow-500">⭐ {r.rating}</span>
                                </div>
                                <p className="text-gray-700 mt-1">{r.review}</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(r.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudySessionDetails;
