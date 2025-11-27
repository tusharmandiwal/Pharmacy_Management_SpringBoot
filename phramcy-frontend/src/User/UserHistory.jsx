import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Clock, Package, CreditCard, CheckCircle, XCircle, AlertCircle, X, Calendar, DollarSign, Pill } from 'lucide-react';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from '../config/api';

const UserHistory = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [modalDrugs, setModalDrugs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [animate, setAnimate] = useState(false);

  let userEmail = '';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.email || decoded.sub || '';
    } catch {
      userEmail = '';
    }
  }

  const fetchUserOrders = async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(API_ENDPOINTS.ORDER.GET_BY_EMAIL(userEmail));
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setAnimate(true);
    fetchUserOrders();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      setAlertMsg(decodeURIComponent(message));
      setTimeout(() => setAlertMsg(''), 1500);
    }
  }, [location.search]);

  const closeModal = () => setModalDrugs(null);

  const getStatusConfig = (status) => {
    const configs = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, iconColor: 'text-yellow-500' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, iconColor: 'text-green-500' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, iconColor: 'text-red-500' },
    };
    return configs[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertCircle, iconColor: 'text-gray-500' };
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-slate-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className={`relative flex-grow p-4 md:p-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-10 mt-6">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-2.5 rounded-xl shadow-md">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-700">
                Order History
              </h2>
            </div>
            <p className="text-slate-500 text-base">Track and manage your past orders</p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-cyan-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-base font-medium text-slate-600">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-slate-200 text-center">
                <div className="bg-gradient-to-br from-cyan-100/60 to-blue-100/60 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Package className="w-10 h-10 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Orders Yet</h3>
                <p className="text-slate-500 text-base">Start shopping to see your order history here</p>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="hidden lg:block overflow-x-auto">
                <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden border border-slate-200">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      <tr>
                        <th className="py-3 px-5 text-left text-sm font-semibold">Order ID</th>
                        <th className="py-3 px-5 text-left text-sm font-semibold">Date</th>
                        <th className="py-3 px-5 text-left text-sm font-semibold">Total</th>
                        <th className="py-3 px-5 text-left text-sm font-semibold">Status</th>
                        <th className="py-3 px-5 text-left text-sm font-semibold">Payment</th>
                        <th className="py-3 px-5 text-left text-sm font-semibold">Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, idx) => {
                        const statusConfig = getStatusConfig(order.status);
                        const StatusIcon = statusConfig.icon;
                        
                        return (
                          <tr
                            key={order.id}
                            className={`${idx % 2 === 0 ? "bg-cyan-50/50" : "bg-white/50"} hover:bg-cyan-100/50 transition-colors`}
                          >
                            <td className="px-6 py-4 border-b border-slate-200">
                              <span className="font-mono text-sm font-semibold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-lg">
                                #{order.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 border-b border-slate-200">
                              <div className="flex items-center gap-2 text-slate-700">
                                <Calendar className="w-4 h-4 text-cyan-500" />
                                <span className="font-medium">{order.orderDate}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 border-b border-slate-200">
                              <div className="flex items-center gap-1">
                               
                                <span className="text-xl font-bold text-cyan-700">₹{order.totalPrice}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 border-b border-slate-200">
                              <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold ${statusConfig.bg} ${statusConfig.text}`}>
                                <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 border-b border-slate-200">
                              {order.pstatus === "SUCCESSFULL" ? (
                                <span className="inline-flex items-center gap-2 text-green-700 font-bold bg-green-100 px-3 py-2 rounded-xl">
                                  <CheckCircle className="w-4 h-4" />
                                  Paid
                                </span>
                              ) : order.paymentMethod === "COD" ? (
                                <span className="inline-flex items-center gap-2 text-yellow-700 font-bold bg-yellow-100 px-3 py-2 rounded-xl">
                                  <CreditCard className="w-4 h-4" />
                                  Cash on Delivery
                                </span>
                              ) : (
                                <a
                                  href={order.paymentLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105"
                                >
                                  <CreditCard className="w-4 h-4" />
                                  Pay Now
                                </a>
                              )}
                            </td>
                            <td
                              className="px-6 py-4 border-b border-slate-200 cursor-pointer"
                              onClick={() => setModalDrugs(order.drugDetails)}
                            >
                              <div className="space-y-1">
                                {order.drugDetails.slice(0, 2).map((drug, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    <Pill className="w-3 h-3 text-cyan-500" />
                                    <span className="font-medium text-slate-700">{drug.name}</span>
                                    <span className="text-slate-500">×{drug.quantity}</span>
                                    <span className="text-cyan-600 font-semibold">₹{drug.price}</span>
                                  </div>
                                ))}
                                {order.drugDetails.length > 2 && (
                                  <button className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold underline">
                                    +{order.drugDetails.length - 2} more items
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={order.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-md border border-slate-200">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-mono text-xs font-medium text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg">
                          #{order.id}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor}`} />
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                          <span className="text-xs">{order.orderDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-semibold text-cyan-700">₹{order.totalPrice}</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-3">
                        {order.pstatus === "SUCCESSFULL" ? (
                          <div className="inline-flex items-center gap-1.5 text-green-700 text-xs font-semibold bg-green-50 px-3 py-1.5 rounded-lg mb-2">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Paid
                          </div>
                        ) : order.paymentMethod === "COD" ? (
                          <div className="inline-flex items-center gap-1.5 text-yellow-700 text-xs font-semibold bg-yellow-50 px-3 py-1.5 rounded-lg mb-2">
                            <CreditCard className="w-3.5 h-3.5" />
                            Cash on Delivery
                          </div>
                        ) : (
                          <a
                            href={order.paymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all mb-2"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Pay Now
                          </a>
                        )}
                        
                        <button
                          onClick={() => setModalDrugs(order.drugDetails)}
                          className="block w-full text-cyan-600 hover:text-cyan-700 font-medium text-xs underline"
                        >
                          View {order.drugDetails.length} item(s)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Modal */}
        {modalDrugs && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative animate-scaleIn border border-cyan-200 max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                onClick={closeModal}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Order Items
                </h3>
              </div>
              
              <div className="space-y-3">
                {modalDrugs.map((drug, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-5 border border-cyan-200 hover:border-cyan-300 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">{drug.name[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 text-lg">{drug.name}</h4>
                          {drug.description && (
                            <p className="text-xs text-slate-500 mt-1">{drug.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-cyan-200">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-600 text-sm">
                          Quantity: <span className="font-bold text-cyan-700">{drug.quantity}</span>
                        </span>
                      </div>
                      <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        ₹{drug.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Alert */}
        {alertMsg && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2.5 border border-white/10 backdrop-blur-sm">
              <div className="bg-white/15 p-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">{alertMsg}</span>
              <button
                className="ml-3 bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-lg text-sm font-medium transition"
                onClick={() => setAlertMsg("")}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
      <UserFooter />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default UserHistory;