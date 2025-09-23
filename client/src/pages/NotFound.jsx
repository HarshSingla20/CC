import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-lime-400 to-emerald-500 px-4 text-center">
      <motion.h1
        className="text-8xl md:text-9xl font-extrabold text-white mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl md:text-3xl text-white/90 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you are looking for doesn’t exist.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/">
          <button className="px-8 py-4 text-lg font-semibold text-green-700 bg-white rounded-full shadow-lg hover:bg-white/90 transition-all">
            Return to Home
          </button>
        </Link>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full blur-3xl animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
};

export default NotFound;
