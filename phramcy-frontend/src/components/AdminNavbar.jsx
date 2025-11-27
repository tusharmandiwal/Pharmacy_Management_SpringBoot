import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="header bg-cyan-600 text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 pl-4">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-white shadow" />
          <Link
            to="/admin/dashboard"
            className="text-2xl font-extrabold tracking-wide text-white"
          >
            Pharmacare
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/admin/inventory"
            className="text-lg font-semibold transition-colors duration-300 hover:text-cyan-200 relative group"
          >
            Inventory
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-200 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/admin/supplier"
            className="text-lg font-semibold transition-colors duration-300 hover:text-cyan-200 relative group"
          >
            Supplier
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-200 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/admin/report"
            className="text-lg font-semibold transition-colors duration-300 hover:text-cyan-200 relative group"
          >
            Report
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-200 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/admin/users"
            className="text-lg font-semibold transition-colors duration-300 hover:text-cyan-200 relative group"
          >
            Users
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-200 group-hover:w-full transition-all duration-300"></span>
          </Link>
          {!token ? (
            <Link
              to="/login"
              className="text-lg font-semibold transition-colors duration-300 hover:text-cyan-200 relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-lg font-semibold transition-colors duration-300 hover:text-pink-200 bg-transparent border-none cursor-pointer px-3 py-1 rounded hover:bg-cyan-700"
            >
              Sign Out
            </button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="text-3xl text-white hover:text-cyan-200 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-cyan-700 border-t border-cyan-500">
          <div className="flex flex-col p-4">
            <Link
              to="/admin/inventory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold py-3 px-4 transition-colors duration-300 hover:bg-cyan-600 rounded"
            >
              Inventory
            </Link>
            <Link
              to="/admin/supplier"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold py-3 px-4 transition-colors duration-300 hover:bg-cyan-600 rounded"
            >
              Supplier
            </Link>
            <Link
              to="/admin/report"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold py-3 px-4 transition-colors duration-300 hover:bg-cyan-600 rounded"
            >
              Report
            </Link>
            <Link
              to="/admin/users"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold py-3 px-4 transition-colors duration-300 hover:bg-cyan-600 rounded"
            >
              Users
            </Link>
            {!token ? (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold py-3 px-4 transition-colors duration-300 hover:bg-cyan-600 rounded"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="text-lg font-semibold py-3 px-4 transition-colors duration-300 hover:text-pink-200 hover:bg-cyan-600 bg-transparent border-none cursor-pointer text-left rounded"
              >
                Sign Out
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default AdminNavbar;