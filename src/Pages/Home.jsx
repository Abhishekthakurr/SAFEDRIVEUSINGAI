import { motion } from "framer-motion";
import { useState, useRef } from "react";
import HeroSlider from "../components/HeroSlider";
import LocationSearch from "../components/LocationSearch";
import { 
  FaCamera, FaCheck, FaBell, FaCar, FaShieldAlt, 
  FaEye, FaBrain, FaUser, FaClock, FaExclamationTriangle,
  FaChartLine, FaHeadSideMask, FaRoad, FaRegClock
} from "react-icons/fa";

export default function Home() {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [selectedTab, setSelectedTab] = useState("monitor");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const stats = [
    {
      icon: <FaHeadSideMask className="w-8 h-8 text-indigo-500" />,
      title: "Alertness Level",
      value: "Optimal",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      metric: "98/100"
    },
    {
      icon: <FaRegClock className="w-8 h-8 text-emerald-500" />,
      title: "Session Duration",
      value: "2h 15m",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      metric: "Safe Range"
    },
    {
      icon: <FaBell className="w-8 h-8 text-amber-500" />,
      title: "Drowsiness Alerts",
      value: "None",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      metric: "Last 2 hours"
    },
    {
      icon: <FaRoad className="w-8 h-8 text-blue-500" />,
      title: "Drive Score",
      value: "98%",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      metric: "Top 5%"
    }
  ];

  const steps = [
    {
      icon: <FaCamera className="w-8 h-8 text-blue-500" />,
      title: "Enable Camera",
      description: "Grant camera access to start real-time monitoring",
    },
    {
      icon: <FaCheck className="w-8 h-8 text-green-500" />,
      title: "Position Yourself",
      description: "Ensure your face is clearly visible in the camera frame",
    },
    {
      icon: <FaBell className="w-8 h-8 text-yellow-500" />,
      title: "Get Alerts",
      description: "Receive instant notifications when drowsiness is detected",
    },
    {
      icon: <FaCar className="w-8 h-8 text-purple-500" />,
      title: "Drive Safely",
      description: "Stay alert and focused throughout your journey",
    },
  ];

  const handleCameraToggle = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("Camera access denied. Please check permissions.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[750px] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <HeroSlider />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How to Use SafeDrive AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">Driver Dashboard</h2>
                  <p className="text-gray-300 mt-1">Real-time drowsiness detection system</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`flex items-center px-4 py-2 rounded-lg ${
                    cameraActive 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    <FaCamera className="w-5 h-5 mr-2" />
                    {cameraActive ? 'Camera Active' : 'Camera Inactive'}
                  </span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-6 mt-8">
                <button
                  onClick={() => setSelectedTab("monitor")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTab === "monitor"
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Live Monitor
                </button>
                <button
                  onClick={() => setSelectedTab("stats")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTab === "stats"
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Statistics
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-8">
            {/* Main Panel */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  {cameraActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <FaCamera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">Camera feed will appear here</p>
                        <motion.button
                          onClick={handleCameraToggle}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium flex items-center mx-auto"
                        >
                          <FaCamera className="w-5 h-5 mr-2" />
                          Start Monitoring
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Overlay Controls */}
                  {cameraActive && (
                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="flex justify-between items-center">
                        <div className="text-white">
                          <p className="font-medium">Status: Active Monitoring</p>
                          <p className="text-sm text-gray-300">Duration: 2h 15m</p>
                        </div>
                        <motion.button
                          onClick={handleCameraToggle}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium flex items-center"
                        >
                          <FaCamera className="w-5 h-5 mr-2" />
                          Stop Camera
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center">
                    <div className={`${stat.bgColor} p-4 rounded-xl`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <div className="flex items-end justify-between">
                        <p className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-400">{stat.metric}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Location Search Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Find Safe Routes</h2>
              <LocationSearch />
            </motion.div>
          </div>
        </div>
      </section>

          {/* Alert Section */}
          {cameraError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-50 border border-red-200 p-4 rounded-xl"
            >
              <div className="flex items-center">
                <FaExclamationTriangle className="w-5 h-5 text-red-500 mr-3" />
                <p className="text-red-700">{cameraError}</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
