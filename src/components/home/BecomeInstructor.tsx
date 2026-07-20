import { motion } from "framer-motion";

const BecomeInstructor = () => {
  return (
    <section className="bg-indigo-600 py-20 text-white">
      <motion.div
        className="mx-auto max-w-7xl px-6 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold">Become an Instructor</h2>

        <p className="mt-4">Share your knowledge with thousands of students.</p>
      </motion.div>
    </section>
  );
};

export default BecomeInstructor;