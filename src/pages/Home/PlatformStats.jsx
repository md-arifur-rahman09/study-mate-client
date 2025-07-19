import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaFolderOpen } from "react-icons/fa";

const stats = [
  {
    icon: <FaUserGraduate className="text-4xl text-green-600" />,
    label: "Registered Learners",
    value: "12,000+",
  },
  {
    icon: <FaChalkboardTeacher className="text-4xl text-green-600 " />,
    label: "Active Tutors",
    value: "120+",
  },
  {
    icon: <FaBookOpen className="text-4xl text-green-600" />,
    label: "Study Sessions",
    value: "850+",
  },
  {
    icon: <FaFolderOpen className="text-4xl text-green-600 " />,
    label: "Materials Shared",
    value: "3,400+",
  },
];

const PlatformStats = () => {
  return (
    <div className="py-16 ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-2"> Our Impact</h2>
        <p className="text-gray-500 text-lg">See how far we've come with your support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: false }}
            className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-md transition"
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-bold ">{stat.value}</h3>
            <p className="text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlatformStats