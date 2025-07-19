import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../Loading/Loading";

const MyBookingSessions = () => {
  useTitle("My Booked Sessions");
  const { user } = useAuth();
  const [bookedSessions, setBookedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  useEffect(() => {
    if (user?.email) {
      setLoading(true); // ✅ Ensure loading starts before API call
      axios
        .get(
          `http://localhost:5000/booked-sessions/user/${user.email}?page=${currentPage}&limit=${limit}`
        )
        .then((res) => {
          setBookedSessions(res.data.data);
          setTotalCount(res.data.total);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Failed to fetch sessions", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [user, currentPage]);

  const totalPages = Math.ceil(totalCount / limit);

  const handleSubmitReview = async () => {
    if (!review || rating < 1 || rating > 5) {
      return Swal.fire("Error", "Provide valid review and rating", "warning");
    }

    const reviewData = {
      sessionId: selectedSession.sessionId,
      studentEmail: user.email,
      review,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:5000/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted successfully", "success");
        setSelectedSession(null);
        setReview("");
        setRating(5);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  // ✅ Loading first
  if (loading) {
    return <Loading />;
  }

  // ✅ Then no sessions check
  if (!loading && bookedSessions.length === 0) {
    return (
      <h2 className="text-center text-2xl md:text-3xl font-semibold mt-10">
        There are no booked sessions!
      </h2>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Booked Sessions</h2>

      {/* ✅ Table wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto w-full">
  <table className="min-w-full table-auto table table-zebra">

          <thead className="bg-base-200 text-sm">
            <tr>
              <th>Title</th>
              <th>Tutor</th>
              <th>Start</th>
              <th>End</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookedSessions.map((s) => (
              <tr key={s._id}>
                <td>{s.sessionTitle}</td>
                <td>{s.tutorEmail}</td>
                <td>{s.sessionStart || "N/A"}</td>
                <td>{s.sessionEnd || "N/A"}</td>
                <td>{s.paymentStatus}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => setSelectedSession(s)}
                  >
                    <FaEye className="inline mr-1" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join mt-6 flex justify-center flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            className={`join-item btn btn-xs ${currentPage === page ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Review Modal */}
      {selectedSession && (
        <dialog id="review_modal" className="modal modal-open">
          <div className="modal-box w-full max-w-[95vw] max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <h3 className="font-bold text-xl mb-2">{selectedSession.sessionTitle}</h3>
            <p><strong>Tutor:</strong> {selectedSession.tutorEmail}</p>
            <p><strong>Start:</strong> {selectedSession.sessionStart || "N/A"}</p>
            <p><strong>End:</strong> {selectedSession.sessionEnd || "N/A"}</p>
            <p><strong>Fee:</strong> {selectedSession.registrationFee === 0 ? "Free" : `৳${selectedSession.registrationFee}`}</p>

            <div className="mt-4">
              <label className="block mb-1 font-semibold">Your Review</label>
              <textarea
                className="textarea textarea-bordered w-full mb-2"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              <label className="block mb-1 font-semibold">Rating (1-5)</label>
              <input
                type="number"
                className="input input-bordered w-full mb-4"
                value={rating}
                min={1}
                max={5}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
              <div className="modal-action">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedSession(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmitReview}>
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

    </div>
  );
};

export default MyBookingSessions;
