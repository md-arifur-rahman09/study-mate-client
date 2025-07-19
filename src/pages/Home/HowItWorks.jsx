import { FaUserPlus, FaSearch, FaCreditCard, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus className="text-4xl text-green-600" />,
    title: "Create Account",
    desc: "Sign up as a learner or tutor in just a few clicks using your email or Google account.",
  },
  {
    icon: <FaSearch className="text-4xl text-green-600" />,
    title: "Browse Sessions",
    desc: "Explore hundreds of study sessions by topic, tutor, or duration that suit your needs.",
  },
  {
    icon: <FaCreditCard className="text-4xl text-green-600" />,
    title: "Register or Pay",
    desc: "Register for free or pay a small fee to join premium study sessions securely via Stripe.",
  },
  {
    icon: <FaGraduationCap className="text-4xl text-green-600" />,
    title: "Join & Learn",
    desc: "Join live classes, download resources, and collaborate with fellow learners seamlessly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-gray-800"
        >
          🧩 How <span className="text-blue-600">StudyMate</span> Works?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}
              className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 border border-blue-100"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
