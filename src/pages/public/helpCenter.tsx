import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Input } from "antd";
import { Search, LifeBuoy } from "lucide-react";

import { faqData } from "../../data/faq.data";

const HelpCenter = () => {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqData;

    return faqData
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#1c1d1f] px-6 py-16 text-center text-white">
        <LifeBuoy size={40} className="mx-auto mb-4 text-indigo-400" />
        <h1 className="text-3xl font-bold md:text-4xl">Help Center</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          Search our FAQs, or reach out to our support team directly.
        </p>

        <div className="mx-auto mt-6 max-w-xl">
          <Input
            size="large"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            prefix={<Search size={18} className="text-gray-400" />}
            placeholder="Search for answers..."
          />
        </div>
      </div>

      {/* FAQ list */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {filteredCategories.length === 0 ? (
          <p className="text-center text-gray-500">
            No results for "{query}". Try a different search, or{" "}
            <Link to="/contact-us" className="text-indigo-600 underline">
              contact us
            </Link>{" "}
            directly.
          </p>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.category} className="mb-10">
              <h2 className="mb-4 text-xl font-bold">{category.category}</h2>
              <Collapse
                items={category.items.map((item, i) => ({
                  key: `${category.category}-${i}`,
                  label: (
                    <span className="font-medium">{item.question}</span>
                  ),
                  children: (
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.answer}
                    </p>
                  ),
                }))}
              />
            </div>
          ))
        )}

        <div className="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-bold">Still need help?</h3>
          <p className="mt-1 text-sm text-gray-600">
            Can't find what you're looking for? Our support team is happy to
            help.
          </p>
          <Link
            to="/contact-us"
            className="mt-4 inline-block rounded-full bg-[#5624d0] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4a1fb8]"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;