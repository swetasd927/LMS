import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Modal, Popconfirm, Select, message } from "antd";
import { motion } from "framer-motion";
import { BookOpen, Pencil, Plus, Trash2 } from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCourses } from "../../hooks/useCourses";
import { useCourseMutations } from "../../hooks/useMutation";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "../../data/courseOptions.data";
import type { CreateCourseInput } from "../../types/course.types";
import { fadeInUp, staggerContainer } from "../../animations/variants";

const gridVariants = staggerContainer(0.08, 0.05);

interface CreateCourseFormValues {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: CreateCourseInput["level"];
  language: string;
}

const InstructorDashboard = () => {
  const { user } = useAuth();
  const { courses, loading } = useCourses(
    user ? { instructorId: user.id } : undefined,
  );
  const { createCourse, removeCourse, updateCourse } = useCourseMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CreateCourseFormValues>();

  if (!user) return null;

  const handleCreate = (values: CreateCourseFormValues) => {
    const payload: CreateCourseInput = {
      title: values.title,
      subtitle: values.subtitle,
      description: values.description,
      category: values.category,
      level: values.level,
      language: values.language,
      instructor: { id: user.id, name: user.name },
    };

    createCourse.mutate(payload, {
      onSuccess: () => {
        message.success("Course created: add days and lectures next.");
        form.resetFields();
        setIsModalOpen(false);
      },
      onError: () => message.error("Could not create the course. Try again."),
    });
  };

  const handleTogglePublish = (courseId: string, isPublished: boolean) => {
    updateCourse.mutate(
      { id: courseId, payload: { status: isPublished ? "draft" : "published" } },
      {
        onSuccess: () =>
          message.success(isPublished ? "Course unpublished." : "Course published!"),
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
          <p className="mt-1 text-gray-500">
            Create courses, then add days and lecture videos.
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<Plus size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Course
        </Button>
      </div>

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
          <h2 className="text-lg font-semibold text-gray-700">
            No courses yet
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create your first course to start adding days and lectures.
          </p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={fadeInUp}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5"
            >
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      course.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {course.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.days.length} day{course.days.length === 1 ? "" : "s"}
                  </span>
                </div>

                <h3 className="line-clamp-2 text-base font-bold text-[#1c1d1f]">
                  {course.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {course.subtitle}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link to={`/instructor/courses/${course.id}`}>
                  <Button icon={<Pencil size={14} />} size="small">
                    Manage Content
                  </Button>
                </Link>

                <Button
                  size="small"
                  onClick={() =>
                    handleTogglePublish(course.id, course.status === "published")
                  }
                >
                  {course.status === "published" ? "Unpublish" : "Publish"}
                </Button>

                <Popconfirm
                  title="Delete this course?"
                  description="This removes all its days and lectures too."
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => handleDelete(course.id)}
                >
                  <Button size="small" danger icon={<Trash2 size={14} />} />
                </Popconfirm>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal
        title="Create a new course"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Create Course"
        confirmLoading={createCourse.isPending}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreate} className="mt-4">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a course title" }]}
          >
            <Input placeholder="Complete React Bootcamp" />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="subtitle"
            rules={[{ required: true, message: "Please enter a subtitle" }]}
          >
            <Input placeholder="Build production-ready apps with React" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} placeholder="What will students learn?" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder="Select category"
                options={COURSE_CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
            </Form.Item>

            <Form.Item
              label="Level"
              name="level"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder="Select level"
                options={COURSE_LEVELS.map((l) => ({ value: l, label: l }))}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Language"
            name="language"
            initialValue="English"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="English" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InstructorDashboard;