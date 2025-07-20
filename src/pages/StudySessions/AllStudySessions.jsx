import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import {
  FaUserGraduate,
  FaRegStickyNote,
  FaCalendarCheck,
  FaCalendarTimes,
  FaClock,
  FaBookOpen,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const AllStudySessions = () => {
  useTitle("All Study Sessions");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["approved-sessions", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `https://study-mate-server-nine.vercel.app/study-sessions/approved?page=${currentPage}&limit=${itemsPerPage}`
      );
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <FaCalendarCheck className="mr-1" />;
      case "Closed":
        return <FaCalendarTimes className="mr-1" />;
      case "Schedule Not Set":
        return <FaClock className="mr-1" />;
      default:
        return null;
    }
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading)
    return <p className="text-center text-lg text-gray-600 py-10">🔄 Loading sessions...</p>;

  if (sessions.length === 0)
    return (
      <h2 className="text-center text-3xl mt-10 font-semibold text-red-600">
        🚫 No sessions available at the moment.
      </h2>
    );

  return (
    <div>
      <h2 className="text-center my-10 text-4xl font-extrabold text-primary flex items-center justify-center gap-2">
       All Study Sessions
      </h2>

      <div className="px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((session) => {
          const status = getStatus(session.registrationStart, session.registrationEnd);
          return (
            <div 
              key={session._id}
              className="flex flex-col bg-gradient-to-tr from-white to-gray-50 shadow-lg rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
            >
             <div className="flex-1">
               <h2 className="text-2xl font-bold text-primary mb-2">{session.title}</h2>

              <p className="mb-2 text-sm text-gray-500 flex items-center gap-2">
                <FaUserGraduate /> <span className="font-medium">Tutor:</span> {session.tutorEmail}
              </p>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed flex items-start gap-2">
                <FaRegStickyNote className="mt-1" />
                {session.description.length > 80
                  ? session.description.slice(0, 80) + "..."
                  : session.description}
              </p>

             </div>
             
               <div className="flex  justify-between items-center">
                <span
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold ${
                    status === "Ongoing"
                      ? "bg-green-200 text-green-900"
                      : status === "Schedule Not Set"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {getStatusIcon(status)} {status}
                </span>

                <Link
                  to={`/study-sessions/${session._id}`}
                  className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-opacity-80 transition"
                >
                   Read More
                </Link>
              </div>
             </div>
           
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 my-12">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`btn px-4 py-2 rounded-full flex items-center gap-1 ${
            currentPage === 1
              ? "btn-disabled cursor-not-allowed opacity-50"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          <FaArrowLeft /> Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageClick(page + 1)}
            className={`btn px-3 py-1 rounded-full text-sm ${
              currentPage === page + 1
                ? "bg-primary text-white font-bold"
                : "bg-gray-100 hover:bg-primary hover:text-white"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`btn px-4 py-2 rounded-full flex items-center gap-1 ${
            currentPage === totalPages
              ? "btn-disabled cursor-not-allowed opacity-50"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllStudySessions;
