import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Use same container as pages for perfect alignment */}
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10 py-4 bg-green-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Skillify
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/services" className="hover:text-blue-500">Services</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          <Link to="/register" className="hover:text-blue-500">Register</Link>
        </div>

        {/* Mobile Menu Button (optional, placeholder for later) */}
        <div className="md:hidden">
          {/* You can add a hamburger icon here later */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
