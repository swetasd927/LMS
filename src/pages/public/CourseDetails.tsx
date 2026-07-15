import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "antd";
import {
  Check,
  Clock,
  Globe,
  Play,
  PlayCircle,
  FileText,
  Smartphone,
  Award,
} from "lucide-react";
import { getCourseById } from "../../data/courses.data";
import StarRating from "../../components/course/starRating";
import { getCourseStats, getSectionStats } from "../../utils/duration";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : undefined;

  // All hooks must run unconditionally, before any early return.
  const [isStuck, setIsStuck] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [course]);

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-blue-600">
          Back to all courses
        </Link>
      </div>
    );
  }

  const discount = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      )
    : null;

  const stats = getCourseStats(course.curriculum);
  const allSectionKeys = course.curriculum.map((_, i) => String(i));
  const allExpanded = activeKeys.length === allSectionKeys.length;

  return (
    <div>
      {/* Dark hero */}
      <div className="bg-[#1c1d1f] text-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <nav className="mb-3 text-xs text-gray-300">
            <Link to="/courses" className="hover:text-white hover:underline">
              Courses
            </Link>
            <span className="mx-1">/</span>
            <span>{course.category}</span>
          </nav>

          {course.bestseller && (
            <span className="mb-3 inline-block bg-[#eceb98] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-[#3d3c0a]">
              Bestseller
            </span>
          )}

          <h1 className="text-2xl font-bold md:text-3xl">{course.title}</h1>
          <p className="mt-3 text-base text-gray-200">{course.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-bold text-[#e59819]">{course.rating}</span>
            <StarRating rating={course.rating} />
            <span className="cursor-pointer text-blue-400 underline">
              ({course.ratingCount.toLocaleString()} ratings)
            </span>
            <span className="text-gray-300">
              {course.studentsCount.toLocaleString()} students
            </span>
          </div>

          <p className="mt-2 text-sm">
            Created by{" "}
            <span className="cursor-pointer text-blue-400 underline">
              {course.instructor.name}
            </span>
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <Clock size={14} /> Last updated {course.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              <Globe size={14} /> {course.language}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <section className="rounded-lg border border-gray-300 p-6">
              <h2 className="mb-4 text-xl font-bold">What you'll learn</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-gray-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Course content</h2>
                <button
                  onClick={() =>
                    setActiveKeys(allExpanded ? [] : allSectionKeys)
                  }
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  {allExpanded ? "Collapse all sections" : "Expand all sections"}
                </button>
              </div>
              <p className="mb-4 mt-1 text-sm text-gray-500">
                {stats.sectionCount} sections • {stats.lectureCount} lectures •{" "}
                {stats.duration} total length
              </p>

              <Collapse
                activeKey={activeKeys}
                onChange={(keys) =>
                  setActiveKeys(Array.isArray(keys) ? keys : [keys])
                }
                expandIconPosition="end"
                items={course.curriculum.map((section, i) => {
                  const sectionStats = getSectionStats(section);
                  return {
                    key: String(i),
                    label: (
                      <div className="flex w-full items-center justify-between pr-2">
                        <span className="font-semibold">{section.title}</span>
                        <span className="text-xs font-normal text-gray-500">
                          {sectionStats.lectureCount} lectures •{" "}
                          {sectionStats.duration}
                        </span>
                      </div>
                    ),
                    children: (
                      <ul className="divide-y divide-gray-100">
                        {section.lectures.map((lecture) => (
                          <li
                            key={lecture.id}
                            className="flex items-center justify-between py-2.5 text-sm"
                          >
                            <span className="flex items-center gap-2 text-gray-700">
                              {lecture.type === "video" ? (
                                <PlayCircle
                                  size={16}
                                  className="shrink-0 text-gray-400"
                                />
                              ) : (
                                <FileText
                                  size={16}
                                  className="shrink-0 text-gray-400"
                                />
                              )}
                              {lecture.title}
                            </span>
                            <span className="flex items-center gap-3 whitespace-nowrap pl-4">
                              {lecture.isPreview && (
                                <span className="cursor-pointer text-xs font-semibold text-purple-700 underline">
                                  Preview
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {lecture.duration}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ),
                  };
                })}
              />
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">Requirements</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                {course.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">Description</h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {course.description}
              </p>
            </section>

            <section className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="mb-4 text-xl font-bold">Instructor</h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1c1d1f] text-xl font-bold text-white">
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-blue-600">
                    {course.instructor.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {course.instructor.title}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">
                Explore related topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic) => (
                  <span
                    key={topic}
                    className="cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:border-[#1c1d1f]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky purchase card */}
          <div className="order-1 lg:order-2">
            {/* Sentinel — marks where the card naturally sits before it locks */}
            <div ref={sentinelRef} />

            <div className="sticky top-24 overflow-hidden rounded-lg border border-gray-300 shadow-lg">
              {!isStuck && (
                <div className="relative h-48 w-full">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <button
                    aria-label="Preview this course"
                    className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                      <Play
                        size={22}
                        className="ml-1 fill-[#1c1d1f] text-[#1c1d1f]"
                      />
                    </span>
                  </button>
                </div>
              )}

              <div className="p-6">
                {discount && (
                  <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                    <Clock size={14} /> 2 days left at this price!
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#1c1d1f]">
                    Rs. {course.price.toLocaleString()}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      Rs. {course.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discount && (
                  <p className="text-sm text-gray-600">{discount}% off</p>
                )}

                <button className="mt-5 w-full rounded bg-[#1c1d1f] py-3 text-sm font-bold text-white transition-colors hover:bg-black">
                  Add to Cart
                </button>
                <button className="mt-3 w-full rounded border border-[#1c1d1f] py-3 text-sm font-bold text-[#1c1d1f] transition-colors hover:bg-gray-100">
                  Buy Now
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  30-Day Money-Back Guarantee
                </p>
                <p className="text-center text-xs text-gray-500">
                  Full Lifetime Access
                </p>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <p className="mb-2 text-sm font-semibold">
                    This course includes:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <PlayCircle size={16} />
                      {stats.duration} on-demand video
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText size={16} />
                      {course.resourcesCount} downloadable resources
                    </li>
                    <li className="flex items-center gap-2">
                      <Smartphone size={16} />
                      Access on mobile and desktop
                    </li>
                    {course.hasCertificate && (
                      <li className="flex items-center gap-2">
                        <Award size={16} />
                        Certificate of completion
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex gap-2">
                    <input
                      placeholder="Enter Coupon"
                      className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1c1d1f]"
                    />
                    <button className="rounded border border-gray-300 px-4 text-sm font-semibold hover:bg-gray-50">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;