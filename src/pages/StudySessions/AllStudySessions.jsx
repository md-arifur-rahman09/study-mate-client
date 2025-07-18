import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router"; 
import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const AllStudySessions = () => {
  useTitle('All Study Sessions')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["approved-sessions", currentPage],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/study-sessions/approved?page=${currentPage}&limit=${itemsPerPage}`);
      return res.data;
    },
  });

  const sessions = data.sessions || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  const getStatus = (start, end) => {
    if (!start || !end) return "Schedule Not Set";
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate)) return "Invalid Date";
    return today >= startDate && today <= endDate ? "Ongoing" : "Closed";
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (sessions.length === 0) {
    return <h2 className="text-center text-3xl mt-6 lg:mt-10  font-semibold">There is no session right now.</h2>
  }

  return (
    <div>
      <h2 className="text-center my-6 text-4xl font-bold">All Study Sessions</h2>

      <div className="px-10 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {sessions.map((session) => (
          <div key={session._id} className="bg-white shadow rounded-xl p-4 border">
            <h2 className="text-xl font-semibold text-primary mb-2">{session.title}</h2>
            <p><span className="font-bold">Tutor :</span> {session.tutorEmail}</p>
            <p className="text-gray-700 text-sm mb-2">
              {session.description.length > 80
                ? session.description.slice(0, 80) + "..."
                : session.description}
            </p>
            <div className="flex justify-between items-center">
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${getStatus(session.registrationStart, session.registrationEnd) === "Ongoing"
                  ? "bg-green-100 text-green-800"
                  : getStatus(session.registrationStart, session.registrationEnd) === "Schedule Not Set"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                {getStatus(session.registrationStart, session.registrationEnd)}
              </span>

              <Link
                to={`/study-sessions/${session._id}`}
                className="inline-block text-white bg-primary px-4 py-1.5 text-sm rounded hover:bg-opacity-90"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-10">
        <div className="join">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
          >
            « Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageClick(page + 1)}
              className={`join-item btn ${currentPage === page + 1 ? "btn-active" : ""}`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            className={`join-item btn ${currentPage === totalPages ? "btn-disabled" : ""}`}
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllStudySessions;
