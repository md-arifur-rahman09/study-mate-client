import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sadia Rahman",
    feedback:
      "StudyMate truly changed the way I study! I cracked my university admission test with their guided sessions.",
    rating: 5,
    image: "https://i.ibb.co/yPcYrpL/student1.jpg",
  },
  {
    name: "Arif Hossain",
    feedback:
      "The tutors are amazing and materials are very helpful. I loved the real-time session interaction!",
    rating: 4,
    image: "https://i.ibb.co/2hFrvQ6/student2.jpg",
  },
  {
    name: "Mehjabin Nahar",
    feedback:
      "From HSC preparation to university guidelines, StudyMate has been my best decision so far.",
    rating: 5,
    image: "https://i.ibb.co/pbP1h7D/student3.jpg",
  },
];

const StudentTestimonials = () => {
  return (
    
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-primary font-bold text-center mb-12"
        >
          What Our Students Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once:false }}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold mb-1">{t.name}</h4>
              <div className="flex justify-center mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{t.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
  
  );
};

export default StudentTestimonials;
