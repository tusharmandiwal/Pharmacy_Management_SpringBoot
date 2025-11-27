import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Package, CheckCircle, Clock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import UserFooter from "../components/UserFooter";
import { API_ENDPOINTS } from "../config/api";

const Payment = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const fetchOrder = async () => {
      if (order) return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const orderRes = await fetch(API_ENDPOINTS.ORDER.GET_BY_ID(orderId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!orderRes.ok) throw new Error("Failed to fetch order details");
        const orderData = await orderRes.json();
        setOrder(orderData);
      } catch (err) {
        alert("Error loading order details.");
        setOrder(null);
      }
      setLoading(false);
    };

    if (orderId) fetchOrder();
    // eslint-disable-next-line
  }, [orderId]);

  const isPaid = order?.pstatus === "PAID";

  return (
    <>
      <Navbar />
      <section className="relative px-5 xl:px-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className={`relative w-full max-w-4xl mx-auto py-10 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {isPaid ? (
                    <div className="bg-green-400/30 p-4 rounded-2xl backdrop-blur-sm animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                  ) : (
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                      <CreditCard className="w-10 h-10" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">
                      {isPaid ? 'Payment Complete!' : 'Secure Payment'}
                    </h2>
                    <p className="text-cyan-100 mt-1 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      256-bit SSL Encrypted
                    </p>
                  </div>
                </div>
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-cyan-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-lg font-medium text-slate-600">Loading payment details...</p>
                </div>
              ) : !order ? (
                <div className="text-center py-20">
                  <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <p className="text-xl font-semibold text-red-600">Order not found</p>
                  <button
                    onClick={() => navigate("/userHistory")}
                    className="mt-6 text-cyan-600 hover:text-cyan-700 font-medium underline"
                  >
                    Return to Order History
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Order Summary Card */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="w-6 h-6 text-cyan-600" />
                      <h3 className="text-2xl font-bold text-slate-800">Order Summary</h3>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-100 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-cyan-200">
                        <span className="text-slate-600 font-medium">Order ID</span>
                        <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg font-semibold text-cyan-700">
                          #{order.id}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-3 border-b border-cyan-200">
                        <span className="text-slate-600 font-medium">Status</span>
                        <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg font-semibold">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-600">{order.status}</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-3 border-b border-cyan-200">
                        <span className="text-slate-600 font-medium">Payment Status</span>
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-lg font-semibold ${
                          isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {isPaid ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          {order.pstatus}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xl font-bold text-slate-800">Total Amount</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                          ₹{order.totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Drugs List */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 w-2 h-2 rounded-full"></span>
                        Items Ordered
                      </h4>
                      <ul className="space-y-3">
                        {order.drugDetails?.map((drug, idx) => (
                          <li key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="bg-cyan-100 text-cyan-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                                {drug.quantity}x
                              </div>
                              <span className="font-medium text-slate-700">{drug.name}</span>
                            </div>
                            <span className="font-bold text-blue-600">₹{drug.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Payment Action Card */}
                  <div className="flex flex-col justify-center">
                    {isPaid ? (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 text-center space-y-6">
                        <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                          <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-green-700 mb-2">
                            Payment Successful!
                          </h3>
                          <p className="text-green-600 text-lg">
                            Your order is being processed
                          </p>
                        </div>
                        <div className="pt-4 border-t border-green-200">
                          <p className="text-sm text-slate-600 mb-4">
                            A confirmation email has been sent to your registered email address.
                          </p>
                          <button
                            onClick={() => navigate("/userHistory")}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full flex items-center justify-center gap-2"
                          >
                            View Order History
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-blue-200 space-y-6">
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <CreditCard className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            Complete Your Payment
                          </h3>
                          <p className="text-slate-600">
                            Click below to proceed to secure payment gateway
                          </p>
                        </div>

                        <div className="space-y-4">
                          <a
                            href={order.paymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 text-white px-8 py-5 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-center text-lg group"
                          >
                            <span className="flex items-center justify-center gap-3">
                              Proceed to Payment
                              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </a>

                          <button
                            onClick={() => navigate("/userHistory")}
                            className="w-full text-cyan-600 hover:text-cyan-700 font-semibold py-3 hover:bg-cyan-50 rounded-xl transition-colors"
                          >
                            View Order History
                          </button>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-blue-200 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            <span>Secure</span>
                          </div>
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            <span>Encrypted</span>
                          </div>
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-500" />
                            <span>Fast</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <UserFooter />
     
    </>
  );
};

export default Payment;