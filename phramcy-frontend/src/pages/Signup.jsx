import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import signupImg from "../assets/images/signup.gif";
import { API_ENDPOINTS } from "../config/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'doctor'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role.toUpperCase()
    };

    try {
      const response = await fetch(API_ENDPOINTS.USER.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      alert(`Registration successful! Welcome, ${result.name}`);
    } catch (error) {
      console.error(error);
      alert('Error during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-slate-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative px-5 xl:px-0 py-12">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Image Section */}
            <div className="hidden lg:block">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 overflow-hidden h-[600px]">
                <figure className="h-full relative">
                  <img 
                    src={signupImg} 
                    alt="Signup" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
                </figure>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-10">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-700 mb-2">
                  Create an account
                </h3>
                <p className="text-slate-500 text-sm">Join our pharmacy management system</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-5">
                {/* Name Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-slate-700 placeholder:text-slate-400 transition text-sm"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-slate-700 placeholder:text-slate-400 transition text-sm"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <input
                      type="text"
                      placeholder="+91 1234567890"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-slate-700 placeholder:text-slate-400 transition text-sm"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-slate-700 placeholder:text-slate-400 transition text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Features */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>Secure Registration</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>Easy Management</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-slate-600 pt-2">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-cyan-600 hover:text-cyan-700 font-semibold underline transition"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </section>
  );
};

export default Signup;