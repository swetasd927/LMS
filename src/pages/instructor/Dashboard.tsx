import { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCourses } from "../../courses/hooks/useCourses";
import { useCourseMutations } from "../../courses/types/hooks/useCourseMutation";
import type { Course } from "../../courses/types/course.types";
import { fadeInUp, staggerContainer } from "../../animations/variants";
import CourseBuilder from "./CourseBuilder";

const gridVariants = staggerContainer(0.08, 0.05);

const InstructorDashboard = () => {
  const { user } = useAuth();
  const { courses, loading } = useCourses(user ? { instructorId: user.id } : undefined);
  const { removeCourse, updateCourse } = useCourseMutations();

  // null = closed, undefined course = create mode, a Course = edit mode
  const [builder, setBuilder] = useState<{ course?: Course } | null>(null);

  if (!user) return null;

  const handleTogglePublish = (courseId: string, isPublished: boolean) => {
    updateCourse.mutate(
      { id: courseId, payload: { status: isPublished ? "draft" : "published" } },
      {
        onSuccess: () => message.success(isPublished ? "Course unpublished." : "Course published!"),
        onError: () => message.error("Could not update the course status."),
      },
    );
  };

  const handleDelete = (courseId: string) => {
    removeCourse.mutate(courseId, {
      onSuccess: () => message.success("Course deleted."),
      onError: () => message.error("Could not delete the course."),
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="mt-1 text-gray-500">Create courses, then add sections and lecture videos.</p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={builder ? <ChevronUp size={16} /> : <Plus size={16} />}
          onClick={() => setBuilder((b) => (b ? null : {}))}
        >
          {builder && !builder.course ? "Close" : "Create Course"}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {builder && (
          <motion.div
            key="course-builder"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mb-8">
              <CourseBuilder course={builder.course} onClose={() => setBuilder(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      )}

      {!loading && courses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center">
          <BookOpen className="mx-auto mb-4 text-gray-300" size={40} />
          <h2 className="text-lg font-semibold text-gray-700">No courses yet</h2>
          <p className="mt-1 text-sm text-gray-500">Create your first course to start adding sections and lectures.</p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={gridVariants} initial="hidden" animate="show">
          {courses.map((course) => (
            <motion.div key={course.id} variants={fadeInUp} className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5">
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${course.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {course.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.days.length} section{course.days.length === 1 ? "" : "s"}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-base font-bold text-[#1c1d1f]">{course.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{course.subtitle}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  icon={<Pencil size={14} />}
                  size="small"
                  onClick={() =>
                    setBuilder((b) => (b?.course?.id === course.id ? null : { course }))
                  }
                >
                  {builder?.course?.id === course.id ? "Close" : "Manage Content"}
                </Button>
                <Button size="small" onClick={() => handleTogglePublish(course.id, course.status === "published")}>
                  {course.status === "published" ? "Unpublish" : "Publish"}
                </Button>
                <Popconfirm title="Delete this course?" description="This removes all its sections and lectures too." okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => handleDelete(course.id)}>
                  <Button size="small" danger icon={<Trash2 size={14} />} />
                </Popconfirm>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

    </div>
  );
};

export default InstructorDashboard;