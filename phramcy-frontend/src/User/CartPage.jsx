import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMode, setPaymentMode] = useState("COD"); // default to COD
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.CART.GET, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart items");
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Update quantity
  const updateQuantity = async (drugId, currentQuantity, type) => {
    try {
      const token = localStorage.getItem("token");
      if (type === "decrease" && currentQuantity <= 1) return; 

      let url = "";
      if (type === "increase") {
        url = API_ENDPOINTS.CART.INCREASE(drugId);
      } else if (type === "decrease") {
        url = API_ENDPOINTS.CART.DECREASE(drugId);
      } else {
        return;
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.CART.DECREASE(id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setCartItems((prev) => prev.filter((item) => (item.drugId || item.id) !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.CART.CLEAR, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Place order and pass response to payment page
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        API_ENDPOINTS.ORDER.PLACE(paymentMode),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cartItems }),
        }
      );
      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      if (paymentMode === "COD") {
        alert("Order placed successfully! You can view your order history.");
        navigate("/userHistory");
      } else {
        navigate(`/payment/${data.orderId || ""}`, { state: data });
      }
    } catch (err) {
      alert("Failed to place order. Please try again.");
      console.error("Error placing order:", err);
    }
  };

  window.dispatchEvent(new Event('cart-updated'));

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-cyan-100">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-6">
            <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping Cart
            </h2>
          </div>
          
          <div className="p-4 sm:p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-cyan-50 rounded-full p-4 mb-4">
                  <svg className="w-20 h-20 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h6a1 1 0 011 1v7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2">Your cart is empty</h3>
                <p className="text-cyan-600 text-sm">Add items to start your shopping journey</p>
              </div>
            ) : (
              <>
                <ul className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100 hover:shadow-md transition-all duration-200 relative group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-cyan-900 mb-1 truncate group-hover:text-cyan-700 transition-colors">
                            {item.name || item.productName}
                          </h4>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-cyan-700">
                              ₹{item.price.toFixed(2)}
                            </span>
                            <span className="text-cyan-400">•</span>
                            <span className="text-cyan-800 font-medium">
                              Total: ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-cyan-50 rounded-lg p-1">
                            <button
                              className="bg-white text-cyan-800 w-7 h-7 rounded-md hover:bg-cyan-100 flex items-center justify-center text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              onClick={() => updateQuantity(item.drugId || item.id, item.quantity, 'decrease')}
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-cyan-900">
                              {item.quantity}
                            </span>
                            <button
                              className="bg-white text-cyan-800 w-7 h-7 rounded-md hover:bg-cyan-100 flex items-center justify-center text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              onClick={() => updateQuantity(item.drugId || item.id, item.quantity, 'increase')}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-600 transition-colors focus:outline-none"
                            onClick={() => removeItem(item.drugId || item.id)}
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-cyan-100 pt-6">
                  <div className="bg-gradient-to-r from-cyan-50/80 to-blue-50/80 rounded-xl p-4 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div>
                        <p className="text-sm text-cyan-600 mb-1">Total Amount</p>
                        <div className="text-2xl font-bold text-cyan-900">
                          ₹{total.toFixed(2)}
                        </div>
                      </div>
                      <div className="w-full sm:w-auto">
                        <p className="text-sm text-cyan-600 mb-1 hidden sm:block">Payment Method</p>
                        <select
                          value={paymentMode}
                          onChange={e => setPaymentMode(e.target.value)}
                          className="w-full bg-white border border-cyan-200 rounded-lg px-4 py-2 text-sm text-cyan-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                        >
                          <option value="ONLINE">Online Payment</option>
                          <option value="COD">Cash on Delivery</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                    <button
                      className="text-cyan-600 hover:text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-50/50 transition-colors text-sm font-medium flex items-center justify-center gap-2 focus:outline-none"
                      onClick={clearCart}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear Cart
                    </button>
                    <button
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:from-cyan-700 hover:to-blue-700 active:shadow-inner transition-all text-sm font-medium flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      onClick={placeOrder}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;