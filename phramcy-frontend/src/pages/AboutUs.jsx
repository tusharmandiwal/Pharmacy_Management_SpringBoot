import { Pill, Briefcase, BarChart3, Shield, Zap, Users, Mail, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import UserFooter from "../components/UserFooter";

const AboutUs = () => {
  const features = [
    {
      icon: Pill,
      title: "Inventory Management",
      description: "Real-time tracking of pharmaceutical inventory with automated stock levels and alerts"
    },
    {
      icon: Briefcase,
      title: "Doctor Orders",
      description: "Streamlined ordering system for doctors with prescription verification and approval workflow"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive sales reports, stock analysis, and business insights"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA-compliant platform with encrypted data and regulatory adherence"
    },
    {
      icon: Zap,
      title: "Fast Fulfillment",
      description: "Automated order processing and efficient delivery management for pharmacies"
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Dedicated interfaces for doctors, pharmacy staff, and administrators"
    }
  ];

  const userTypes = [
    {
      role: "Doctors",
      description: "Place orders, manage prescriptions, and track deliveries through an intuitive dashboard",
      color: "from-blue-500 to-blue-600"
    },
    {
      role: "Pharmacies",
      description: "Manage inventory, process orders, update stock, and generate business analytics",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      role: "Administrators",
      description: "Oversee the entire system, manage users, and ensure compliance and smooth operations",
      color: "from-blue-600 to-cyan-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Doctors" },
    { number: "200+", label: "Pharmacy Partners" },
    { number: "50K+", label: "Orders Processed" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        <section className="flex-grow flex flex-col">
          {/* Hero Section */}
          <div className="flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-5xl text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">PharmaCare</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                PharmaCare is a comprehensive pharmacy management system that streamlines drug ordering for healthcare professionals and pharmacy operations. We connect doctors, pharmacies, and administrators to create an efficient, transparent, and secure ecosystem.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-4 py-12 bg-white/50">
            <div className="w-full max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-8 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-blue-50">
                    To revolutionize pharmacy management by providing doctors, pharmacies, and healthcare providers with an efficient, secure, and user-friendly platform for ordering, inventory management, and business analytics.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose PharmaCare?</h3>
                  {[
                    "Streamlined ordering process for healthcare professionals",
                    "Real-time inventory tracking and stock management",
                    "Secure prescription verification and compliance",
                    "Comprehensive analytics and business reporting",
                    "Dedicated support for doctors and pharmacies"
                  ].map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Types Section */}
          <div className="px-4 py-16 bg-white/50">
            <div className="w-full max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                Built for Multiple Users
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userTypes.map((user, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-blue-100 overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${user.color} h-24`} />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {user.role}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {user.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="px-4 py-16">
            <div className="w-full max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                Core Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-blue-100 hover:border-cyan-300"
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg w-fit mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="px-4 py-16 bg-blue-50">
            <div className="w-full max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                How PharmaCare Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Doctors Order</h3>
                  <p className="text-gray-700">
                    Doctors place orders through the secure platform with prescription details and quantities
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Processes</h3>
                  <p className="text-gray-700">
                    Pharmacies receive, verify, and process orders with real-time inventory updates
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Track & Deliver</h3>
                  <p className="text-gray-700">
                    Orders are fulfilled and tracked with notifications for doctors and pharmacies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Pharmacy?
              </h2>
              <p className="text-lg text-blue-50 mb-6">
                Join thousands of doctors and pharmacies using PharmaCare to streamline operations and improve efficiency.
              </p>
              <a
                href="mailto:support@pharmacare.com"
                className="inline-flex items-center gap-2 bg-white text-cyan-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                <Mail className="w-5 h-5" />
                Get Started Today
              </a>
            </div>
          </div>
        </section>
        <UserFooter />
      </div>
    </>
  );
};

export default AboutUs;