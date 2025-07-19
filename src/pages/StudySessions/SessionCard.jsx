import {
  FaUserGraduate,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
} from "react-icons/fa";

const SessionCard = ({ session }) => {
  const {
    _id,
    title,
    tutorName,
    tutorEmail,
    description,
    registrationStart,
    registrationEnd,
    classStart,
    classEnd,
    duration,
    registrationFee,
    status,
    createdAt,
    updatedAt,
    reappliedAt,
  } = session;


  const statusColor =
    status === "approved" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100";

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <FaCheckCircle /> {title}
      </h2>

      <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
        <FaUserGraduate /> Tutor: {tutorName}
      </p>

      <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
        <FaEnvelope /> Email: {tutorEmail}
      </p>

      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {description.length > 100 ? description.slice(0, 100) + "..." : description}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
       
        <p className="flex items-center gap-2">
          <FaClock /> Class Start: {formatDate(classStart)}
        </p>
        <p className="flex items-center gap-2">
          <FaClock /> Class End: {formatDate(classEnd)}
        </p>
        <p className="flex items-center gap-2">
          <FaClock /> Duration: {duration || "N/A"}
        </p>
        <p className="flex items-center gap-2">
          <FaMoneyBillAlt /> Fee: {registrationFee === 0 ? "Free" : `$${registrationFee}`}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
        <span><FaEdit /> Created: {formatDate(createdAt)}</span>
        <span><FaEdit /> Updated: {formatDate(updatedAt)}</span>
        <span><FaEdit /> Reapplied: {formatDate(reappliedAt)}</span>
      </div>

      <span className={`inline-block px-3 py-1 rounded-full font-bold ${statusColor}`}>
        {status.toUpperCase()}
      </span>
    </div>
  );
};

export default SessionCard;
