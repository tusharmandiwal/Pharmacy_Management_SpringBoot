import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';
import { API_ENDPOINTS } from '../config/api';

const OrdersPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('hasShownWelcome');
    if (!hasShown) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasShownWelcome', 'true');
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.DRUG.GET_ALL);
        setInventoryItems(response.data);
      } catch (error) {
        setAlertMsg('Failed to load inventory. Please try again later.');
        setTimeout(() => setAlertMsg(''), 1500);
      }
      setLoading(false);
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    let updatedCart;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      return updatedCart;
    });

    axios.post(API_ENDPOINTS.CART.ADD, {
      drugId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
      .then(() => {
        setAlertMsg(`${product.name} added to cart`);
        setTimeout(() => setAlertMsg(''), 1200);
      })
      .catch(() => {
        setAlertMsg('Failed to add to cart on server');
        setTimeout(() => setAlertMsg(''), 1200);
      });
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={handleCloseWelcome}
              aria-label="Close welcome popup"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4 text-cyan-600">🛒</span>
              <h2 className="text-2xl font-extrabold text-cyan-700 mb-2">Welcome to Pharmacare!</h2>
              <p className="text-slate-600 text-lg mb-4">Browse and order your medicines with ease. We're here to help you stay healthy!</p>
              <button
                className="mt-2 bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-full font-semibold shadow transition"
                onClick={handleCloseWelcome}
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        {alertMsg && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-cyan-50 border border-cyan-200 text-cyan-800 px-8 py-3 rounded-xl shadow-lg z-50 text-lg font-semibold flex items-center gap-3 transition animate-fadeIn">
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
            </svg>
            <span>{alertMsg}</span>
          </div>
        )}
        
        <section className="relative px-2 sm:px-6 xl:px-0 mt-10 mb-10 min-h-[80vh] z-10 flex-grow">
        
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 animate-fadeIn">
              <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                Premium Quality Medicines
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent leading-tight">
                Your Health,<br />Our Mission
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Fast, secure, and reliable medicine ordering platform. Quality assured pharmaceutical products delivered to your doorstep.
              </p>

              {/* Features Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Easy Ordering</p>
                    <p className="text-sm text-gray-600">Quick processing</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Quality Assured</p>
                    <p className="text-sm text-gray-600">Verified authentic</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.16 5.314l4.73-4.73a1 1 0 011.414 0l12 12a1 1 0 010 1.414l-12 12a1 1 0 01-1.414 0l-4.73-4.73M4.16 5.314l4.73-4.73a1 1 0 011.414 0l12 12a1 1 0 010 1.414l-12 12a1 1 0 01-1.414 0l-4.73-4.73" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Best Prices</p>
                    <p className="text-sm text-gray-600">Competitive rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-800 drop-shadow">
              <span className="inline-block align-middle mr-2">🛒</span>
              Order Products
            </h2>
            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded-lg border border-cyan-200 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400 transition bg-white text-gray-800"
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <svg className="animate-spin h-10 w-10 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400 text-lg">No products found.</div>
                ) : (
                  filteredItems.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg border border-gray-200 transition duration-300 flex flex-col h-full"
                      style={{ animationDelay: `${item.id % 10 * 50}ms` }}
                    >
                      <div className="w-16 h-16 rounded-lg bg-cyan-100 flex items-center justify-center mb-4 mx-auto">
                        <span className="text-3xl font-bold text-cyan-700">{item.name[0]}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 text-center">
                        {item.description || <span className="italic text-gray-400">No description</span>}
                      </p>
                      <p className="text-2xl font-bold text-cyan-600 mb-3 text-center">
                        ₹{item.price}
                      </p>
                      {item.expiryDate && (
                        <p className="text-sm text-gray-700 mb-4 text-center bg-gray-50 px-3 py-2 rounded border border-gray-200">
                          <span className="font-semibold">Expires:</span> {item.expiryDate}
                        </p>
                      )}
                      <button
                        onClick={() => addToCart(item)}
                        className="mt-auto w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 text-base"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
        <UserFooter />
      </div>
      {/* Fade-in animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
};

export default OrdersPage;