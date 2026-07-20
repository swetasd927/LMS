import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  message,
} from "antd";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Pencil, Plus, Trash2, Video } from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCourse } from "../../hooks/useCourse";
import { useCourseMutations } from "../../hooks/useMutation";
import { LECTURE_TYPES } from "../../data/courseOptions.data";
import type {
  CourseDay,
  CreateDayInput,
  CreateLectureInput,
  Lecture,
} from "../../types/course.types";
import { fadeInUp, staggerContainer } from "../../animations/variants";

const listVariants = staggerContainer(0.06, 0);

interface DayFormValues {
  title: string;
  description?: string;
}

interface LectureFormValues {
  title: string;
  videoUrl: string;
  duration?: string;
  type: CreateLectureInput["type"];
  isPreview?: boolean;
}

const CourseEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { course, loading } = useCourse(id);
  const {
    addDay,
    updateDay,
    removeDay,
    addLecture,
    updateLecture,
    removeLecture,
  } = useCourseMutations();

  const [dayModal, setDayModal] = useState<{ mode: "add" | "edit"; day?: CourseDay } | null>(null);
  const [lectureModal, setLectureModal] = useState<{
    dayId: string;
    lecture?: Lecture;
  } | null>(null);

  const [dayForm] = Form.useForm<DayFormValues>();
  const [lectureForm] = Form.useForm<LectureFormValues>();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-gray-500">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/instructor/dashboard" className="mt-4 inline-block text-indigo-600">
          Back to My Courses
        </Link>
      </div>
    );
  }

  // Only the owning instructor can edit this course's content.
  if (!user || course.instructor.id !== user.id) {
    return <Navigate to="/instructor/dashboard" replace />;
  }

  const openAddDay = () => {
    dayForm.resetFields();
    setDayModal({ mode: "add" });
  };

  const openEditDay = (day: CourseDay) => {
    dayForm.setFieldsValue({ title: day.title, description: day.description });
    setDayModal({ mode: "edit", day });
  };

  const handleDaySubmit = (values: DayFormValues) => {
    if (dayModal?.mode === "edit" && dayModal.day) {
      updateDay.mutate(
        { courseId: course.id, dayId: dayModal.day.id, payload: values },
        {
          onSuccess: () => {
            message.success("Day updated.");
            setDayModal(null);
          },
          onError: () => message.error("Could not update the day."),
        },
      );
      return;
    }

    const payload: CreateDayInput = {
      title: values.title,
      description: values.description,
    };

    addDay.mutate(
      { courseId: course.id, payload },
      {
        onSuccess: () => {
          message.success("Day added.");
          setDayModal(null);
        },
        onError: () => message.error("Could not add the day."),
      },
    );
  };

  const handleDeleteDay = (dayId: string) => {
    removeDay.mutate(
      { courseId: course.id, dayId },
      {
        onSuccess: () => message.success("Day removed."),
        onError: () => message.error("Could not remove the day."),
      },
    );
  };

  const openAddLecture = (dayId: string) => {
    lectureForm.resetFields();
    lectureForm.setFieldsValue({ type: "video" });
    setLectureModal({ dayId });
  };

  const openEditLecture = (dayId: string, lecture: Lecture) => {
    lectureForm.setFieldsValue({
      title: lecture.title,
      videoUrl: lecture.videoUrl,
      duration: lecture.duration,
      type: lecture.type,
      isPreview: lecture.isPreview,
    });
    setLectureModal({ dayId, lecture });
  };

  const handleLectureSubmit = (values: LectureFormValues) => {
    if (!lectureModal) return;
    const { dayId, lecture } = lectureModal;

    if (lecture) {
      updateLecture.mutate(
        { courseId: course.id, dayId, lectureId: lecture.id, payload: values },
        {
          onSuccess: () => {
            message.success("Lecture updated.");
            setLectureModal(null);
          },
          onError: () => message.error("Could not update the lecture."),
        },
      );
      return;
    }

    const payload: CreateLectureInput = {
      title: values.title,
      videoUrl: values.videoUrl,
      duration: values.duration,
      type: values.type,
      isPreview: values.isPreview,
    };

    addLecture.mutate(
      { courseId: course.id, dayId, payload },
      {
        onSuccess: () => {
          message.success("Lecture added.");
          setLectureModal(null);
        },
        onError: () => message.error("Could not add the lecture."),
      },
    );
  };

  const handleDeleteLecture = (dayId: string, lectureId: string) => {
    removeLecture.mutate(
      { courseId: course.id, dayId, lectureId },
      {
        onSuccess: () => message.success("Lecture removed."),
        onError: () => message.error("Could not remove the lecture."),
      },
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        to="/instructor/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft size={16} /> Back to My Courses
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-1 text-gray-500">{course.subtitle}</p>
        </div>
        <Button type="primary" icon={<Plus size={16} />} onClick={openAddDay}>
          Add Day
        </Button>
      </div>

      {course.days.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">
            No days yet. Add Day 1 to start building the curriculum.
          </p>
        </div>
      )}

      <motion.div variants={listVariants} initial="hidden" animate="show" className="space-y-4">
        {course.days
          .slice()
          .sort((a, b) => a.dayNumber - b.dayNumber)
          .map((day) => (
            <motion.div key={day.id} variants={fadeInUp}>
              <Collapse
                defaultActiveKey={[day.id]}
                items={[
                  {
                    key: day.id,
                    label: (
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold">
                          Day {day.dayNumber} — {day.title}
                        </span>
                      </div>
                    ),
                    extra: (
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="small"
                          type="text"
                          icon={<Pencil size={14} />}
                          onClick={() => openEditDay(day)}
                        />
                        <Popconfirm
                          title="Delete this day?"
                          description="This removes all its lectures too."
                          okText="Delete"
                          okButtonProps={{ danger: true }}
                          onConfirm={() => handleDeleteDay(day.id)}
                        >
                          <Button
                            size="small"
                            type="text"
                            danger
                            icon={<Trash2 size={14} />}
                          />
                        </Popconfirm>
                      </div>
                    ),
                    children: (
                      <div className="space-y-2">
                        {day.description && (
                          <p className="mb-2 text-sm text-gray-500">{day.description}</p>
                        )}

                        {day.lectures.length === 0 && (
                          <p className="text-sm text-gray-400">No lectures yet.</p>
                        )}

                        {day.lectures
                          .slice()
                          .sort((a, b) => a.order - b.order)
                          .map((lecture) => (
                            <div
                              key={lecture.id}
                              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                {lecture.type === "video" ? (
                                  <Video size={16} className="shrink-0 text-indigo-500" />
                                ) : (
                                  <FileText size={16} className="shrink-0 text-indigo-500" />
                                )}
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-gray-800">
                                    {lecture.title}
                                  </p>
                                  <p className="truncate text-xs text-gray-400">
                                    {lecture.duration}
                                    {lecture.isPreview ? " · Preview" : ""}
                                  </p>
                                </div>
                              </div>

                              <div className="flex shrink-0 items-center gap-1">
                                <Button
                                  size="small"
                                  type="text"
                                  icon={<Pencil size={14} />}
                                  onClick={() => openEditLecture(day.id, lecture)}
                                />
                                <Popconfirm
                                  title="Delete this lecture?"
                                  okText="Delete"
                                  okButtonProps={{ danger: true }}
                                  onConfirm={() => handleDeleteLecture(day.id, lecture.id)}
                                >
                                  <Button size="small" type="text" danger icon={<Trash2 size={14} />} />
                                </Popconfirm>
                              </div>
                            </div>
                          ))}

                        <Button
                          size="small"
                          icon={<Plus size={14} />}
                          className="mt-2"
                          onClick={() => openAddLecture(day.id)}
                        >
                          Add Lecture
                        </Button>
                      </div>
                    ),
                  },
                ]}
              />
            </motion.div>
          ))}
      </motion.div>

      {/* Add / Edit Day */}
      <Modal
        title={dayModal?.mode === "edit" ? "Edit Day" : "Add Day"}
        open={Boolean(dayModal)}
        onCancel={() => setDayModal(null)}
        onOk={() => dayForm.submit()}
        okText={dayModal?.mode === "edit" ? "Save" : "Add Day"}
        confirmLoading={addDay.isPending || updateDay.isPending}
        destroyOnClose
      >
        <Form form={dayForm} layout="vertical" onFinish={handleDaySubmit} className="mt-4">
          <Form.Item
            label="Day title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Day 1 - Setup & Fundamentals" />
          </Form.Item>
          <Form.Item label="Description (optional)" name="description">
            <Input.TextArea rows={2} placeholder="What does this day cover?" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add / Edit Lecture */}
      <Modal
        title={lectureModal?.lecture ? "Edit Lecture" : "Add Lecture"}
        open={Boolean(lectureModal)}
        onCancel={() => setLectureModal(null)}
        onOk={() => lectureForm.submit()}
        okText={lectureModal?.lecture ? "Save" : "Add Lecture"}
        confirmLoading={addLecture.isPending || updateLecture.isPending}
        destroyOnClose
      >
        <Form form={lectureForm} layout="vertical" onFinish={handleLectureSubmit} className="mt-4">
          <Form.Item
            label="Lecture title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Installing Node & Your First App" />
          </Form.Item>

          <Form.Item
            label="Video URL"
            name="videoUrl"
            rules={[
              { required: true, message: "Please enter a video URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Duration (mm:ss)" name="duration">
              <Input placeholder="11:30" />
            </Form.Item>

            <Form.Item label="Type" name="type" initialValue="video">
              <Select options={LECTURE_TYPES.map((t) => ({ value: t, label: t }))} />
            </Form.Item>
          </div>

          <Form.Item name="isPreview" valuePropName="checked">
            <Checkbox>Free preview (visible without enrolling)</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseEditor;