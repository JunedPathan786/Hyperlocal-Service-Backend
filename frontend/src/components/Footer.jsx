// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Skillify</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your trusted platform for connecting with verified local professionals. Quality service delivered to your doorstep with transparent pricing and guaranteed satisfaction.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Verified Pros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#careers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/service/2" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/service/3" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/service/4" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Carpentry
                </Link>
              </li>
              <li>
                <Link to="/service/1" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Beauty & Salon
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#safety" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
              />
              <button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-gray-900 font-semibold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="#facebook" 
                  className="w-10 h-10 bg-white border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-gray-600" />
                </a>
                <a 
                  href="#twitter" 
                  className="w-10 h-10 bg-white border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-gray-600" />
                </a>
                <a 
                  href="#instagram" 
                  className="w-10 h-10 bg-white border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-gray-600" />
                </a>
                <a 
                  href="#linkedin" 
                  className="w-10 h-10 bg-white border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-gray-600" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} Skillify. All rights reserved.
            </p>
            
            {/* Payment Methods or Additional Links */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#privacy" className="hover:text-gray-900 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-gray-900 transition-colors">
                Terms
              </a>
              <a href="#sitemap" className="hover:text-gray-900 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;