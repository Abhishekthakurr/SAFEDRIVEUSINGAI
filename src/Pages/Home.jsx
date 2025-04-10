import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import { FaCamera, FaCheck, FaBell, FaCar, FaShieldAlt } from "react-icons/fa";

export default function Home() {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 1280,
          height: 720,
          facingMode: "user"
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please make sure you have granted camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleCameraToggle = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />
      
      {/* Camera Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Safe Journey Now
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Our AI-powered system monitors your alertness in real-time, ensuring you stay safe on the road. 
              Just enable your camera and let SafeDrive be your guardian angel.
            </p>
            
            <motion.button
              onClick={handleCameraToggle}
              className={`group relative inline-flex items-center px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 ${
                cameraActive 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-blue-600 hover:bg-blue-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCamera className="w-6 h-6 mr-3" />
              <span>{cameraActive ? "Stop Camera" : "Analyze Video"}</span>
              <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:scale-105 transition-transform"></div>
            </motion.button>

            {/* Camera Feed Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-4 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-black/40 rounded-lg relative">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-blue-200">Click "Start Camera" to begin monitoring</p>
                  </div>
                )}
              </div>
              {cameraActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-green-500/20 backdrop-blur-sm rounded-lg"
                >
                  <p className="text-green-100 flex items-center justify-center">
                    <FaCheck className="w-5 h-5 mr-2" />
                    Camera is active and monitoring
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How to Use SafeDrive
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with SafeDrive in just a few simple steps and ensure your safety on every journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-blue-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white rounded-2xl shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center p-1 rounded-full bg-blue-50">
              <FaShieldAlt className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">
                Your safety is our top priority
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
