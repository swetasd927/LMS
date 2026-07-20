import { Link } from "react-router-dom";
import { ArrowUp, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../animations/variants";

const footerLinks = {
  Platform: [
    { label: "Explore Courses", to: "/courses" },
    { label: "Become an Instructor", to: "/register" },
  ],
  Support: [
    { label: "Help Center", to: "/help-center" },
    { label: "Contact Us", to: "/contact-us" },
  ],
};

const columnVariants = fadeInUp;
const containerVariants = staggerContainer(0.1, 0);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="group inline-flex items-center text-sm text-slate-400 transition-colors duration-200 hover:text-white">
    <span className="relative">
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-linear-to-b from-slate-900 to-slate-950 text-slate-300">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 py-14"
      >
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <motion.div variants={columnVariants} className="col-span-2 sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-500 text-white">
                <GraduationCap size={18} />
              </span>
              <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                LMS
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Learn new skills online with courses from expert instructors,
              anytime, anywhere.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <motion.div key={section} variants={columnVariants}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to} label={link.label} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={columnVariants}
          className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:text-left"
        >
          <p>LMS Platform © 2026. All rights reserved.</p>
          <div className="flex gap-5">
            <FooterLink to="/privacy" label="Privacy" />
            <FooterLink to="/terms" label="Terms" />
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className="absolute -top-5 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 sm:right-10"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
};

export default Footer;