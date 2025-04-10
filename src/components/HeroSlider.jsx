import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hslider from "../assets/Hslider1.jpeg";
import Hslider2 from "../assets/Hslider2.avif";
import Hslider3 from "../assets/Hslider3.jpg";

const slides = [
  {
    title: "Drive Safe, Stay Alert",
    subtitle: "AI-Powered Drowsiness Detection",
    description: "Our advanced AI monitors your alertness in real-time, ensuring your safety on every journey.",
    image: Hslider,
    stats: ["98% Accuracy", "24/7 Monitoring", "Real-time Alerts"],
  },
  {
    title: "Advanced Eye Tracking",
    subtitle: "Monitoring Driver Fatigue in Real-Time",
    description: "Cutting-edge computer vision technology tracks eye movements and blink patterns to detect early signs of fatigue.",
    image: Hslider2,
    stats: ["0.5s Response", "Multi-Driver Support", "Night Vision"],
  },
  {
    title: "Your Safety, Our Priority",
    subtitle: "Prevent Accidents Before They Happen",
    description: "Join thousands of drivers who trust SafeDrive to keep them alert and protected on the road.",
    image: Hslider3,
    stats: ["10K+ Users", "Zero False Alarms", "24/7 Support"],
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full h-[calc(100vh-64px)] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
        >
          {/* Background Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          {/* Content Container */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              <div className="max-w-3xl">
                {/* Title Animation */}
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {slides[index].title}
                </motion.h1>

                {/* Subtitle Animation */}
                <motion.p
                  className="text-xl md:text-2xl text-blue-400 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {slides[index].subtitle}
                </motion.p>

                {/* Description Animation */}
                <motion.p
                  className="text-lg md:text-xl text-gray-300 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {slides[index].description}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {slides[index].stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                    >
                      <p className="text-white font-medium">{stat}</p>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                    Get Started
                  </button>
                  <button className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm font-medium">
                    Learn More
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={prevSlide}
              className="p-2 m-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={nextSlide}
              className="p-2 m-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-0 right-0">
            <div className="flex justify-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === index ? "bg-blue-600 w-8" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
