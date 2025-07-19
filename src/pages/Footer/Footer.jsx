import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="footer grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-300">
          {/* Logo & Description */}
          <div>
            <Link to='/' className="text-2xl font-bold text-primary">StudyMate</Link>
            <p className="text-sm mt-2 text-gray-600">
              Your trusted companion for collaborative learning. Join live sessions, explore materials, and grow together!
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <span className="footer-title">Platform</span>
            <Link to="/all-study-sessions" className="link link-hover">Study Sessions</Link>
            <Link to="/all-tutors" className="link link-hover">Tutors</Link>
            <Link to="/register" className="link link-hover">Join as Learner</Link>
            <Link to="/applyTutor" className="link link-hover">Become a Tutor</Link>
          </div>

          {/* Quick Access */}
          {/* <div>
            <span className="footer-title">Quick Access</span>
            <Link to="/login" className="link link-hover">Login</Link>
            <Link to="/dashboard/myProfile" className="link link-hover">My Profile</Link>
           
           
          </div> */}

          {/* Social & Legal */}
          <div>
           
            <span className="footer-title">Legal</span>
            <a className="link link-hover" href="/terms">Terms of Use</a>
            <a className="link link-hover" href="/privacy">Privacy Policy</a>
            <a className="link link-hover" href="/cookie-policy">Cookie Policy</a>
          </div>

          <div>
             <span className="footer-title">Connect</span>
            <div className="flex gap-4 text-xl text-primary mb-4">
             <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
  <FaFacebookF className="hover:text-blue-600 transition" />
</a>
<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
  <FaTwitter className="hover:text-sky-400 transition" />
</a>
<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
  <FaLinkedinIn className="hover:text-blue-700 transition" />
</a>
<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
  <FaInstagram className="hover:text-pink-600 transition" />
</a>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center mt-6 pb-6 gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} StudyMate. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
