import { CheckCircle, AlertCircle, Lock, CreditCard, FileText, Gavel, Mail, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import UserFooter from "../components/UserFooter";

const Terms = () => {
  const terms = [
    {
      icon: CheckCircle,
      title: "Eligibility",
      description: "You must be at least 18 years old and a legal resident of your jurisdiction to use PharmaCare. By accessing our platform, you confirm that you meet these requirements and are legally capable of entering into binding agreements.",
    },
    {
      icon: Lock,
      title: "Account Responsibility",
      description: "You are responsible for maintaining the confidentiality of your account credentials and password. You agree to notify us immediately of any unauthorized access or breach. You are liable for all activities conducted under your account.",
    },
    {
      icon: FileText,
      title: "Prescription Requirements",
      description: "Certain medications require valid prescriptions from licensed healthcare providers. Uploading false, forged, expired, or invalid prescriptions is strictly prohibited and may result in account suspension or legal action.",
    },
    {
      icon: CheckCircle,
      title: "Order Acceptance & Fulfillment",
      description: "All orders are subject to availability, verification, and approval by our partner pharmacies and healthcare providers. PharmaCare reserves the right to refuse or cancel any order that violates these terms or poses a safety risk.",
    },
    {
      icon: CreditCard,
      title: "Payment & Charges",
      description: "All payments must be made through approved payment methods on our platform. PharmaCare is not responsible for fees, delays, or issues arising from third-party payment processors. Refunds are subject to our refund policy.",
    },
    {
      icon: AlertCircle,
      title: "Prohibited Use",
      description: "You agree not to misuse PharmaCare including, but not limited to: fraudulent transactions, hacking, spreading malware, violating intellectual property rights, harassment, or any illegal activities.",
    },
  ];

  const additionalTerms = [
    {
      title: "Privacy & Data Protection",
      description: "Your personal and medical data is handled according to our Privacy Policy and applicable healthcare regulations. PharmaCare implements industry-standard security measures to protect your information.",
      link: "/privacy",
      linkText: "View Privacy Policy"
    },
    {
      title: "Limitation of Liability",
      description: "To the fullest extent permitted by law, PharmaCare shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform, including delayed deliveries or medication-related issues.",
    },
    {
      title: "Changes to Terms",
      description: "PharmaCare may update these terms and conditions at any time. Updated terms will be posted on this page with a new 'Last updated' date. Your continued use of the platform constitutes acceptance of the modified terms.",
    },
    {
      title: "Intellectual Property",
      description: "All content, logos, trademarks, and designs on PharmaCare are the property of PharmaCare or its partners. You may not reproduce, distribute, or use any of our intellectual property without explicit written permission.",
    },
    {
      title: "Termination",
      description: "PharmaCare reserves the right to terminate or suspend your account at any time for violations of these terms, illegal activities, or any conduct deemed harmful to our platform or other users.",
    },
    {
      title: "Governing Law",
      description: "These terms and conditions are governed by and construed in accordance with applicable local and national laws. Any disputes shall be resolved through appropriate legal channels.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        <section className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Gavel className="w-12 h-12 text-cyan-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please read these terms and conditions carefully before using PharmaCare. By accessing our platform, you agree to be bound by all these terms.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: October 2024
              </p>
            </div>

            {/* Main Terms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {terms.map((term, idx) => {
                const Icon = term.icon;
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
                          {term.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {term.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Terms */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-blue-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Terms
              </h2>

              <div className="space-y-6">
                {additionalTerms.map((item, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-200 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {idx + 1}. {item.title}
                    </h3>
                    <p className="text-gray-700 mb-3">
                      {item.description}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-700 font-medium text-sm transition"
                      >
                        {item.linkText}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg p-8 text-white text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Questions About Our Terms?
              </h2>
              <p className="mb-4 text-blue-50">
                If you have any questions or concerns about these terms and conditions, please contact our support team.
              </p>
              <a
                href="mailto:support@pharmacare.com"
                className="inline-flex items-center gap-2 bg-white text-cyan-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                <Mail className="w-5 h-5" />
                support@pharmacare.com
              </a>
            </div>

            {/* Acceptance Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-cyan-600 rounded-lg">
              <p className="text-gray-800">
                <span className="font-semibold text-gray-900">Your Acceptance:</span> By using PharmaCare, creating an account, placing orders, or otherwise accessing our platform, you expressly acknowledge that you have read, understood, and agree to be bound by all terms and conditions outlined in this agreement.
              </p>
            </div>
          </div>
        </section>
        <UserFooter />
      </div>
    </>
  );
};

export default Terms;