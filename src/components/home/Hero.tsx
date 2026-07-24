import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-slate-50 py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold dark:text-gray-100"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Learn Without Limits
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Explore thousands of courses from expert instructors.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;