import { motion, type Variants } from "framer-motion";
import { useInView } from "../../hooks/useInView";

const categories = [
  "Programming",
  "AI",
  "Design",
  "Business",
  "Marketing",
  "Robotics",
  "DevOps",
  "System Design",
  "Cybersecurity",
];

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Categories = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="mb-10 text-3xl font-bold"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Categories
        </motion.h2>

        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {categories.map((category) => (
            <motion.div
              key={category}
              className="rounded-xl border p-8"
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {category}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;