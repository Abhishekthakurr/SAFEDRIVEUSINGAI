import { motion } from "framer-motion";
import { FaCar, FaBell, FaChartLine, FaMobile, FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaCar className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Continuous analysis of driver behavior and alertness levels using advanced AI technology."
    },
    {
      icon: <FaBell className="h-8 w-8" />,
      title: "Instant Alerts",
      description: "Immediate audio and visual notifications when signs of drowsiness are detected."
    },
    {
      icon: <FaChartLine className="h-8 w-8" />,
      title: "Performance Analytics",
      description: "Detailed insights into driving patterns and safety metrics over time."
    },
    {
      icon: <FaMobile className="h-8 w-8" />,
      title: "Mobile Integration",
      description: "Seamless connection with your mobile device for alerts and statistics."
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: "Advanced Security",
      description: "Enterprise-grade security measures to protect your driving data."
    },
    {
      icon: <FaHeadset className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any questions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive solutions for driver safety and drowsiness prevention
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 mt-16 text-center"
      >
        <div className="bg-blue-600 text-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Drive Safer?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of drivers who trust SafeDrive for their safety
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get Started Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
