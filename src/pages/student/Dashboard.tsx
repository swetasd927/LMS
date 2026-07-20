import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Collapse, Progress } from "antd";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useEnrollments } from "../../hooks/useEnrollment";
import { useEnrollmentMutations } from "../../hooks/useEnrollmentMutations";
import { fadeInUp, staggerContainer } from "../../animations/variants";
import type { MyLearningItem } from "../../types/enrollment.types";

const gridVariants = staggerContainer(0.08, 0.05);

const StudentDashboard = () => {
  const { user } = useAuth();
  const { items, loading, error, refetch } = useEnrollments(user?.id);
  const { toggleLectureComplete, togglingLectureId } =
    useEnrollmentMutations();

  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(
    null
  );

  if (!user) return null;

  const completedCourses = items.filter(
    (item) => item.progressPercent === 100
  ).length;

  const totalLecturesCompleted = items.reduce(
    (sum, item) => sum + item.completedCount,
    0
  );

  const handleToggleLecture = async (
    item: MyLearningItem,
    lectureId: string
  ) => {
    await toggleLectureComplete(user.id, item.course.id, lectureId);
    refetch();
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1c1d1f]">
          Welcome back, {user.name}
        </h1>
        <p className="mt-1 text-gray-500">
          Pick up where you left off.
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#1c1d1f]">
              {items.length}
            </p>
            <p className="text-xs text-gray-500">Enrolled courses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#1c1d1f]">
              {completedCourses}
            </p>
            <p className="text-xs text-gray-500">Completed courses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#1c1d1f]">
              {totalLecturesCompleted}
            </p>
            <p className="text-xs text-gray-500">Lectures completed</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-52 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center">
          <BookOpen className="mx-auto mb-4 text-gray-300" size={40} />
          <h2 className="text-lg font-semibold text-gray-700">
            You haven't enrolled in any courses yet
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse the catalog and start learning something new.
          </p>
          <Link
            to="/courses"
            className="mt-5 inline-block rounded-full bg-[#5624d0] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4a1fb8]"
          >
            Browse Courses
          </Link>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {items.map((item) => (
            <motion.div
              key={item.enrollmentId}
              variants={fadeInUp}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="h-32 w-full overflow-hidden bg-slate-200">
                <img
                  src={item.course.thumbnail}
                  alt={item.course.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 text-base font-bold text-[#1c1d1f]">
                  {item.course.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {item.course.instructor.name}
                </p>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {item.completedCount}/{item.totalLectures} lectures
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {item.progressPercent}%
                    </span>
                  </div>
                  <Progress
                    percent={item.progressPercent}
                    showInfo={false}
                    strokeColor="#5624d0"
                    size="small"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCourseId(
                        expandedCourseId === item.course.id
                          ? null
                          : item.course.id
                      )
                    }
                    className="flex items-center gap-1.5 rounded-full bg-[#5624d0] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#4a1fb8]"
                  >
                    <PlayCircle size={14} />
                    {expandedCourseId === item.course.id
                      ? "Hide lectures"
                      : "Continue learning"}
                  </button>

                  <Link
                    to={`/course/${item.course.id}`}
                    className="flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Course details
                  </Link>
                </div>

                {expandedCourseId === item.course.id && (
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <Collapse
                      size="small"
                      defaultActiveKey={["0"]}
                      items={item.course.days.map((day, dayIndex) => ({
                        key: String(dayIndex),
                        label: (
                          <span className="text-sm font-semibold">
                            Day {day.dayNumber}: {day.title}
                          </span>
                        ),
                        children: (
                          <ul className="space-y-1.5">
                            {day.lectures.map((lecture) => {
                              const isDone =
                                item.completedLectureIds.includes(
                                  lecture.id
                                );
                              const isSaving =
                                togglingLectureId === lecture.id;

                              return (
                                <li key={lecture.id}>
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() =>
                                      handleToggleLecture(item, lecture.id)
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                                  >
                                    {isDone ? (
                                      <CheckCircle2
                                        size={16}
                                        className="shrink-0 text-emerald-600"
                                      />
                                    ) : (
                                      <Circle
                                        size={16}
                                        className="shrink-0 text-gray-300"
                                      />
                                    )}
                                    <span
                                      className={
                                        isDone
                                          ? "line-through text-gray-400"
                                          : ""
                                      }
                                    >
                                      {lecture.title}
                                    </span>
                                    <span className="ml-auto shrink-0 text-xs text-gray-400">
                                      {lecture.duration}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        ),
                      }))}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StudentDashboard;