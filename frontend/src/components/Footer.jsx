// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Skillify</h2>
          <p className="text-gray-400">Hire trusted local professionals for all your needs — plumbing, electrical, beauty, carpentry, and more.</p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Plumber</a></li>
            <li><a href="#" className="hover:text-white">Electrician</a></li>
            <li><a href="#" className="hover:text-white">Beautician</a></li>
            <li><a href="#" className="hover:text-white">Carpenter</a></li>
            <li><a href="#" className="hover:text-white">Painter</a></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Connect with Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
          <h4 className="font-semibold mb-2">Subscribe</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none"
          />
          <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Subscribe
          </button>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-8 py-4 text-center text-gray-500">
        &copy; 2025 Skillify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
