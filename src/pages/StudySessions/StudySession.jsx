import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import {
  FaUserGraduate,
  FaInfoCircle,
  FaCalendarCheck,
  FaClock,
  FaCalendarTimes,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import Loading from "../Loading/Loading";


const StudySession = () => {
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["approved-sessions"],
    queryFn: async () => {
      const res = await axios.get("https://study-mate-server-nine.vercel.app/studySession/approved");
      return res.data;
    },
  });
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleDateString();
  };

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

  if (isLoading) return <Loading ></Loading>;

  return (
    <div className="max-w-6xl mx-auto ">
      <h2 className="text-3xl md:text-4xl text-primary font-bold text-center my-10 flex items-center justify-center gap-2">
         Current Study Sessions
      </h2>

      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.slice(0, 6).map((session) => 
         {
          const status = getStatus(session.registrationStart, session.registrationEnd);
          return (
            <div
              key={session._id}
              className="flex flex-col bg-white rounded-xl shadow-md border border-gray-200 p-5 mt-3 hover:shadow-lg transition duration-300 ease-in-out "
            >
             <div className="flex-1 ">
                 <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                <FaInfoCircle /> {session.title}
              </h3>

              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaUserGraduate /> <span className="font-medium">Tutor:</span> {session.tutorEmail}
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-2 flex items-start gap-2">
                <FaInfoCircle className="mt-1" />
                {session.description.length > 100
                  ? session.description.slice(0, 100) + "..."
                  : session.description}
              </p>
         <p className="flex items-center gap-2">
          <FaCalendarAlt /> Reg. Start: {formatDate(session.registrationStart)}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt /> Reg. End: {formatDate(session.registrationEnd)}
        </p>

             </div>
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                    status === "Ongoing"
                      ? "bg-green-200 text-green-800"
                      : status === "Schedule Not Set"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {getStatusIcon(status)} {status}
                </span>

                <Link
                  to={`/study-sessions/${session._id}`}
                  className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          );
        }
        )}
      </div>
    </div>
  );
};

export default StudySession;
