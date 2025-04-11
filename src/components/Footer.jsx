import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaArrowUp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoverLink, setHoverLink] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const links = {
    Company: [
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' }
    ],
    Resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Blog', path: '/blog' },
      { name: 'Support', path: '/support' },
      { name: 'Privacy Policy', path: '/privacy' }
    ],
    Product: [
      { name: 'Features', path: '/features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Use Cases', path: '/use-cases' },
      { name: 'Updates', path: '/updates' }
    ]
  };

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaFacebook />, url: 'https://facebook.com' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { icon: <FaGithub />, url: 'https://github.com' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 relative">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Stay Updated with SafeDrive</h3>
            <p className="text-gray-300 mb-6">
              Get the latest updates on road safety and AI technology
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-md">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 mt-4"
              >
                Thanks for subscribing! 🎉
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="block mb-6">
              <span className="text-2xl font-bold text-blue-500">SafeDrive</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Making roads safer with AI-powered drowsiness detection technology.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    onHoverStart={() => setHoverLink(`${category}-${index}`)}
                    onHoverEnd={() => setHoverLink(null)}
                  >
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-white transition-colors relative block"
                    >
                      {item.name}
                      {hoverLink === `${category}-${index}` && (
                        <motion.span
                          layoutId="underline"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {new Date().getFullYear()} SafeDrive. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, color: '#3B82F6' }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
}
