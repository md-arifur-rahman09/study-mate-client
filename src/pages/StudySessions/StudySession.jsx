import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const StudySession = () => {
    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ["approved-sessions"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/study-sessions/approved");
            return res.data;
        },
    });
    console.log(sessions)
    const getStatus = (start, end) => {
        if (!start || !end) return "Schedule Not Set";

        const today = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate) || isNaN(endDate)) return "Invalid Date";

        return today >= startDate && today <= endDate ? "Ongoing" : "Closed";
    };


    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.slice(0, 6).map((session) => (
                <div key={session._id} className="bg-white shadow rounded-xl p-4 border">
                    <h2 className="text-xl font-semibold text-primary mb-2">{session.title}</h2>
                    <p><span className="font-bold">Tutor :</span> {session.tutorEmail}</p>
                    <p className="text-gray-700 text-sm mb-2">
                        {session.description.length > 100
                            ? session.description.slice(0, 100) + "..."
                            : session.description}
                    </p>
                    
                  <div className="flex justify-between">
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full mb-3 font-semibold ${getStatus(session.registrationStart, session.registrationEnd) === "Ongoing"
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
    );
};

export default StudySession;
