import { Link } from "react-router-dom";
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

const Footer = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <footer
      ref={ref}
      className={`border-t bg-gray-50 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              LMS
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Learn new skills online with courses from expert instructors.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>LMS Platform © 2026. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4 sm:mt-0">
            <div className="mt-2 flex justify-center gap-4 sm:mt-0">
              <Link to="/privacy" className="hover:text-indigo-600">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-indigo-600">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
