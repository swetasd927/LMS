import { Link } from "react-router-dom";
import { ArrowUp, GraduationCap } from "lucide-react";
import { useInView } from "../../hooks/useInView";

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

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="group inline-flex items-center text-sm text-slate-400 transition-colors duration-200 hover:text-white">
    <span className="relative">
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
);

const Footer = () => {
  const { ref, inView } = useInView<HTMLElement>();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
      className={`relative border-t border-white/10 bg-linear-to-b from-slate-900 to-slate-950 text-slate-300 ${
        inView ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
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
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
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
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:text-left">
          <p>LMS Platform © 2026. All rights reserved.</p>
          <div className="flex gap-5">
            <FooterLink to="/privacy" label="Privacy" />
            <FooterLink to="/terms" label="Terms" />
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute -top-5 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 sm:right-10"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
};

export default Footer;