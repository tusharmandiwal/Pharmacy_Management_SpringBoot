import { Shield, Lock, Eye, FileText, Mail, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import UserFooter from "../components/UserFooter";

const Policy = () => {
  const policyItems = [
    {
      icon: FileText,
      title: "Information Collection",
      description: "We collect information you provide when you register, place orders, or contact support. This may include your name, email, address, phone number, payment details, and prescription information.",
    },
    {
      icon: Eye,
      title: "Usage of Information",
      description: "Your data is used to process orders, provide pharmacy services, improve our platform, send order updates, and communicate important health and service-related information with you.",
    },
    {
      icon: Shield,
      title: "Data Sharing",
      description: "We do not sell your personal information. Data may be shared with licensed pharmacies, healthcare providers, delivery partners, and payment processors only as necessary to fulfill your orders and provide services.",
    },
    {
      icon: Lock,
      title: "Security",
      description: "We use industry-standard encryption, secure servers, and advanced security protocols to protect your data from unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      icon: Clock,
      title: "Cookies & Tracking",
      description: "Our site uses cookies to enhance your experience, remember preferences, and analyze site usage. You can disable cookies in your browser settings at any time.",
    },
    {
      icon: Shield,
      title: "Your Rights",
      description: "You have the right to access, correct, or request deletion of your personal data. You can also opt out of marketing communications. Contact us to exercise these rights.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        <section className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-cyan-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your privacy and data security are our top priorities. This policy explains how PharmaCare collects, uses, and protects your information.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: October 2024
              </p>
            </div>

            {/* Policy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {policyItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-blue-100 hover:border-cyan-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-blue-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Policy Updates
                  </h3>
                  <p className="text-gray-700">
                    We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will post any updates on this page with an updated "Last updated" date. Your continued use of PharmaCare following such modifications constitutes your acceptance of the updated policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Children's Privacy
                  </h3>
                  <p className="text-gray-700">
                    PharmaCare is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal information, we will take steps to delete such information immediately.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Third-Party Links
                  </h3>
                  <p className="text-gray-700">
                    Our platform may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review the privacy policies of any external sites before providing your information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    HIPAA Compliance
                  </h3>
                  <p className="text-gray-700">
                    PharmaCare complies with applicable healthcare privacy regulations, including standards for protecting sensitive health information. We maintain strict confidentiality of all prescription and medical data.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">
                Questions About Your Privacy?
              </h2>
              <p className="mb-4 text-blue-50">
                If you have any questions or concerns about this privacy policy or how we handle your data, please don't hesitate to contact us.
              </p>
              <a
                href="mailto:support@pharmacare.com"
                className="inline-flex items-center gap-2 bg-white text-cyan-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                <Mail className="w-5 h-5" />
                support@pharmacare.com
              </a>
            </div>

            {/* Acceptance */}
            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-cyan-600 rounded">
              <p className="text-gray-800">
                <span className="font-semibold text-gray-900">Acceptance:</span> By registering for and using PharmaCare services, you acknowledge that you have read, understood, and agree to be bound by this privacy policy.
              </p>
            </div>
          </div>
        </section>
        <UserFooter />
      </div>
    </>
  );
};

export default Policy;