import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../assets/images/logo.png";
import { API_ENDPOINTS } from "../config/api";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        if (!token) {
          setCartCount(0);
          return;
        }
        const res = await fetch(API_ENDPOINTS.CART.GET, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 404 || res.status === 204) {
          setCartCount(0);
          return;
        }
        if (!res.ok) {
          setCartCount(0);
          return;
        }
        const cart = await res.json();
        const total = Array.isArray(cart)
          ? cart.filter(item => (item.quantity || 1) > 0)
                .reduce((sum, item) => sum + (item.quantity || 1), 0)
          : 0;
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    if (token) {
      window.addEventListener('storage', updateCartCount);
      window.addEventListener('cart-updated', updateCartCount);
    }
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, [token]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    localStorage.removeItem('hasShownWelcome');
    navigate('/login');
  };

  return (
    <header className="header bg-gradient-to-r from-white via-slate-100 to-blue-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
   
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-blue-200 shadow" />
          <Link
            to="/orderpage"
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-700 via-cyan-600 to-green-500 bg-clip-text text-transparent"
          >
            Pharmacare
          </Link>
        </div>

        {/* Spacer to push nav and cart to right */}
        <div className="flex-1"></div>

        {/* Navigation Links + Cart Icon */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-8">
            {token && (
              <Link
                to="/userhistory"
                className="text-lg font-semibold text-blue-900 hover:text-cyan-700 transition-colors duration-300"
              >
                Orders
              </Link>
            )}
            {!token ? (
              <Link
                to="/login"
                className="text-lg font-semibold text-blue-900 hover:text-cyan-700 transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                className="text-lg font-semibold text-blue-900 hover:text-pink-600 transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </nav>
          <div className="relative flex items-center">
            <Link to="/cart" className="relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-700 hover:text-cyan-700 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h6a1 1 0 011 1v7" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

      
        <div className="md:hidden flex items-center ml-2">
          <button className="text-3xl text-blue-700 hover:text-cyan-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;