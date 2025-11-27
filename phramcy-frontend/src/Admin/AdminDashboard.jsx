import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const AdminDashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [drugCount, setDrugCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('hasShownAdminWelcome');
    if (!hasShown) {
      setShowWelcome(true);
    }

    const fetchStats = async () => {
      try {
        const [ordersRes, drugsRes, usersRes] = await Promise.all([
          fetch(API_ENDPOINTS.ORDER.COUNT),
          fetch(API_ENDPOINTS.DRUG.COUNT),
          fetch(API_ENDPOINTS.USER.COUNT),
        ]);
        const orders = await ordersRes.json();
        const drugs = await drugsRes.json();
        const users = await usersRes.json();

        setOrderCount(
          typeof orders === "number"
            ? Math.round(orders)
            : Array.isArray(orders)
              ? orders.length
              : orders && typeof orders.count === "number"
                ? Math.round(orders.count)
                : 0
        );
        setDrugCount(
          typeof drugs === "number"
            ? Math.round(drugs)
            : Array.isArray(drugs)
              ? drugs.length
              : drugs && typeof drugs.count === "number"
                ? Math.round(drugs.count)
                : 0
        );
        setUserCount(
          typeof users === "number"
            ? Math.round(users)
            : Array.isArray(users)
              ? users.length
              : users && typeof users.count === "number"
                ? Math.round(users.count)
                : 0
        );
      } catch {
        setOrderCount(0);
        setDrugCount(0);
        setUserCount(0);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasShownAdminWelcome', 'true');
  };

  const stats = [
    {
      icon: "📦",
      label: "Total Orders",
      value: orderCount,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      icon: "💊",
      label: "Total Drugs",
      value: drugCount,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      icon: "👥",
      label: "Total Users",
      value: userCount,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    }
  ];

  const quickActions = [
    { 
      href: "/admin/report", 
      label: "Orders", 
      icon: "📊"
    },
    { 
      href: "/admin/inventory", 
      label: "Inventory", 
      icon: "📦"
    },
    { 
      href: "/admin/supplier", 
      label: "Suppliers", 
      icon: "🏢"
    },
    { 
      href: "/admin/users", 
      label: "Users", 
      icon: "👥"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              onClick={handleCloseWelcome}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👋</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Welcome Back, Admin!</h2>
              <p className="text-slate-600 mb-6">Ready to manage your pharmacy system efficiently</p>
              <button
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
                onClick={handleCloseWelcome}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of your pharmacy system</p>
          </div>
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("hasShownAdminWelcome");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg p-8 mb-12 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h2>
              <p className="text-cyan-50 text-lg">Manage your pharmacy operations efficiently and effectively</p>
            </div>
            <div className="hidden md:block text-6xl">👨‍💼</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6">System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center text-3xl`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                    Live
                  </span>
                </div>
                <div className={`text-sm font-semibold ${stat.textColor} mb-2 uppercase tracking-wide`}>{stat.label}</div>
                <div className="text-4xl font-bold text-slate-800">
                  {loading ? (
                    <div className="h-10 w-20 bg-slate-200 animate-pulse rounded"></div>
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="group bg-slate-100 hover:bg-slate-200 rounded-xl p-6 transition-all hover:shadow-md text-center border border-slate-200"
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                  {action.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} PharmaCare Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;