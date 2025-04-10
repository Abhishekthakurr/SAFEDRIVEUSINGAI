import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="w-48 h-12 relative">
              <span className="text-2xl font-bold text-blue-600">SafeDrive</span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="text-gray-600 hover:text-gray-900 flex flex-col items-center">
              <FaUser size={20} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              <FaUser size={20} />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t`}>
        <div className="px-4 pt-2 pb-4 space-y-3">
          <Link to="/" className="block text-gray-600 hover:text-gray-900 py-2">
            Home
          </Link>
          <Link to="/about" className="block text-gray-600 hover:text-gray-900 py-2">
            About
          </Link>
          <Link to="/services" className="block text-gray-600 hover:text-gray-900 py-2">
            Services
          </Link>
          <Link to="/contact" className="block text-gray-600 hover:text-gray-900 py-2">
            Contact
          </Link>
          <Link to="/signup" className="block text-gray-600 hover:text-gray-900 py-2">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
