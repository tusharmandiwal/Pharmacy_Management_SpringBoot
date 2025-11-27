import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import UserFooter from "../components/UserFooter";
import loginImg from "../assets/images/back.png";
import { API_ENDPOINTS } from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const url = `${API_ENDPOINTS.USER.LOGIN}?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await res.json();
      const token = result.token;
      localStorage.setItem("token", token);

      const decodedPayload = JSON.parse(atob(token.split(".")[1]));
      const userRole = decodedPayload.role?.toLowerCase();

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "doctor") {
        navigate("/orderpage");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        <section className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="hidden lg:block relative bg-gradient-to-br from-blue-500 to-cyan-500 overflow-hidden">
                <img
                  src={loginImg}
                  alt="Login illustration"
                  className="w-full h-full object-cover opacity-90"
                  style={{ minHeight: 500 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Pharmacare</h2>
                  <p className="text-blue-50 text-sm">Your trusted pharmacy partner</p>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex flex-col justify-center px-8 py-12 sm:px-10">
                <div className="w-full max-w-sm mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Sign in to your Pharmacare account
                  </p>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <form onSubmit={submitHandler} className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-cyan-500" />
                        <input
                          type="email"
                          id="email"
                          placeholder="you@example.com"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-3.5 w-5 h-5 text-cyan-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="••••••••"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-gray-400 hover:text-cyan-600 transition"
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-cyan-500"
                        />
                        <span className="text-gray-600">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-cyan-600 hover:text-cyan-700 font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition"
                      >
                        Create one
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <UserFooter />
      </div>
    </>
  );
};

export default Login;