import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Compass, GraduationCap } from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useEnrollments } from "../../features/courses/hooks/useEnrollment";
import { useEnrollmentMutations } from "../../features/courses/hooks/useEnrollmentMutations";
import { useCourses } from "../../features/courses/hooks/useCourses";

import { fadeInUp, staggerContainer } from "../../animations/variants";
import type { MyLearningItem } from "../../types/enrollment.types";
import ContinueLearningCard from "../../features/courses/components/student/ContinueLearningCard";
import StatPill from "../../components/common/StatPill";
import CourseRail from "../../features/courses/components/student/CourseRail";

const gridVariants = staggerContainer(0.08, 0.05);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const { items, loading, error, refetch } = useEnrollments(user?.id);
  const { toggleLectureComplete, togglingLectureId } = useEnrollmentMutations();
  const { courses: allCourses } = useCourses();

  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const completedCourses = items.filter(
    (item) => item.progressPercent === 100,
  ).length;
  const totalLecturesCompleted = items.reduce(
    (sum, item) => sum + item.completedCount,
    0,
  );

  const enrolledCourseIds = useMemo(
    () => new Set(items.map((item) => item.course.id)),
    [items],
  );

  const recommendedCourses = useMemo(() => {
    return allCourses
      .filter(
        (course) =>
          course.status === "published" && !enrolledCourseIds.has(course.id),
      )
      .sort((a, b) => b.rating - a.rating || b.studentsCount - a.studentsCount)
      .slice(0, 8);
  }, [allCourses, enrolledCourseIds]);

  const handleToggleLecture = async (
    item: MyLearningItem,
    lectureId: string,
  ) => {
    if (!user) return;
    await toggleLectureComplete(user.id, item.course.id, lectureId);
    refetch();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f7f7fb]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#0f0e1b]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-fuchsia-600/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-12 sm:pb-14 sm:pt-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-white/60"
          >
            {getGreeting()}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Welcome back,{" "}
            <span className="bg-linear-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
              {user.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-2 max-w-xl text-white/60"
          >
            Pick up right where you left off, or explore something new.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-3">
            <StatPill
              icon={BookOpen}
              value={items.length}
              label="Enrolled courses"
              delay={0.15}
            />
            <StatPill
              icon={GraduationCap}
              value={completedCourses}
              label="Completed courses"
              delay={0.22}
            />
            <StatPill
              icon={Clock}
              value={totalLecturesCompleted}
              label="Lectures completed"
              delay={0.29}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-[#f7f7fb]" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 sm:pt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1c1d1f] sm:text-2xl">
            Continue learning
          </h2>
        </div>

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-dashed border-gray-300 bg-white p-16 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              <Compass size={28} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              You haven't enrolled in any courses yet
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse the catalog and start learning something new today.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-block rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Browse Courses
            </Link>
          </motion.div>
        )}

        {!loading && !error && items.length > 0 && (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {items.map((item) => (
              <motion.div key={item.enrollmentId} variants={fadeInUp}>
                <ContinueLearningCard
                  item={item}
                  isExpanded={expandedCourseId === item.course.id}
                  onToggleExpand={() =>
                    setExpandedCourseId(
                      expandedCourseId === item.course.id
                        ? null
                        : item.course.id,
                    )
                  }
                  onToggleLecture={(lectureId) =>
                    handleToggleLecture(item, lectureId)
                  }
                  togglingLectureId={togglingLectureId}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <CourseRail
          title="Recommended for you"
          subtitle="Handpicked based on what's trending with other students"
          courses={recommendedCourses}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
