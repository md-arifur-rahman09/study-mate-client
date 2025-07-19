import { FaChalkboardTeacher, FaBrain, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
    {
        icon: <FaUsers className="text-4xl text-green-600" />,
        title: "Real-Time Collaboration",
        desc: "Instantly connect with peers and share study materials in real-time using our smart collaborative tools.",
    },
    {
        icon: <FaChalkboardTeacher className="text-4xl text-green-600" />,
        title: "Expert Tutors Support",
        desc: "Get guidance from verified tutors across multiple subjects with flexible session booking options.",
    },
    {
        icon: <FaBrain className="text-4xl text-green-600" />,
        title: "Smart Session Recommendations",
        desc: "Personalized study session suggestions based on your interests, activity, and academic goals.",
    },
];

const WhyChooseStudyMate = () => {
    return (
        <section className="py-16 px-4 " id="why-choose">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-12 text-gray-800"
                >
                    🎓 Why Choose <span className="text-blue-600">StudyMate?</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: false }}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseStudyMate;
