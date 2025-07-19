import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animation2 from "../../assets/Education2.json";
import animation3 from "../../assets/Education3.json";
import animation4 from "../../assets/Education4.json";
import { Link } from "react-router";

const animations = [ animation2, animation3,animation4];

const AnimatedBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % animations.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" py-10 px-4 sm:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Text Section */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
            Discover, Learn & Grow
          </h1>
          <p className="text-lg text-gray-700">
            StudyMate connects passionate tutors with curious learners. Your educational journey begins here.
          </p>
          <div className="flex gap-4 flex-wrap">
          <Link to='/all-study-sessions'>
            <button className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
              Explore Classes
            </button>
          </Link>
          <Link to='/applyTutor'>
          
            <button  className="border border-primary text-primary px-6 py-2 rounded hover:bg-primary hover:text-white transition">
              Join as Tutor
            </button></Link>
          </div>
        </div>

        {/* Animated Illustration */}
        <div>
          <Lottie animationData={animations[current]} loop={true} style={{ height: "360px" }} />
        </div>
      </div>
    </section>
  );
};

export default AnimatedBanner;
