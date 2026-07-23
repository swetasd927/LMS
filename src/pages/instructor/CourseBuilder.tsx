import { useState } from "react";
import { Button, Input, Select, message } from "antd";
import { motion } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCourseMutations } from "../../courses/types/hooks/useCourseMutation";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "../../data/courseOptions.data";
import type { Course, CreateLectureInput, UpdateCourseInput } from "../../features/auth/context/courses/types/course.types";
import { fadeInUp, staggerContainer } from "../../animations/variants";
import ThumbnailPicker from "../../features/courses/components/instructor/ThumbnailPicker";
import SectionCard from "../../features/courses/components/instructor/SectionCard";

const listVariants = staggerContainer(0.06, 0);

type Step = "info" | "curriculum" | "details";

interface BasicInfoState {
  title: string;
  subtitle: string;
  description: string;
  category?: string;
  level?: Course["level"];
  language: string;
  thumbnail: string;
}

const emptyInfo: BasicInfoState = {
  title: "",
  subtitle: "",
  description: "",
  category: undefined,
  level: undefined,
  language: "English",
  thumbnail: "",
};

interface CourseBuilderProps {
  course?: Course; // present in edit mode
  onClose: () => void;
}

//expandable section
const CourseBuilder = ({ course, onClose }: CourseBuilderProps) => {
  const { user } = useAuth();
  const {
    createCourse,
    updateCourse,
    addDay,
    updateDay,
    removeDay,
    addLecture,
    updateLecture,
    removeLecture,
  } = useCourseMutations();

  const isEdit = Boolean(course);
  const [step, setStep] = useState<Step>("info");
  const [courseId, setCourseId] = useState<string | undefined>(course?.id);
  const [info, setInfo] = useState<BasicInfoState>(
    course
      ? {
          title: course.title,
          subtitle: course.subtitle,
          description: course.description,
          category: course.category,
          level: course.level,
          language: course.language,
          thumbnail: course.thumbnail,
        }
      : emptyInfo,
  );
  const [sections, setSections] = useState(course?.days ?? []);
  const [details, setDetails] = useState({
    whatYouWillLearn: course?.whatYouWillLearn ?? [],
    requirements: course?.requirements ?? [],
    topics: course?.topics ?? [],
  });
  const [status, setStatus] = useState<Course["status"]>(course?.status ?? "draft");

  const canSaveInfo =
    info.title.trim().length > 0 &&
    info.subtitle.trim().length > 0 &&
    info.description.trim().length > 0 &&
    Boolean(info.category) &&
    Boolean(info.level);

  const handleSaveInfo = () => {
    if (!canSaveInfo || !user) return;

    if (!courseId) {
      createCourse.mutate(
        {
          title: info.title.trim(),
          subtitle: info.subtitle.trim(),
          description: info.description.trim(),
          category: info.category!,
          level: info.level!,
          language: info.language.trim() || "English",
          thumbnail: info.thumbnail,
          instructor: { id: user.id, name: user.name },
        },
        {
          onSuccess: (created) => {
            message.success("Course created — now build your curriculum.");
            setCourseId(created.id);
            setStatus(created.status);
            setStep("curriculum");
          },
          onError: () => message.error("Could not create the course. Try again."),
        },
      );
      return;
    }

    const payload: UpdateCourseInput = {
      title: info.title.trim(),
      subtitle: info.subtitle.trim(),
      description: info.description.trim(),
      category: info.category,
      level: info.level,
      language: info.language.trim() || "English",
      thumbnail: info.thumbnail,
    };

    updateCourse.mutate(
      { id: courseId, payload },
      {
        onSuccess: () => message.success("Details saved."),
        onError: () => message.error("Could not save details."),
      },
    );
  };

  const handleAddSection = () => {
    if (!courseId) return;
    addDay.mutate(
      { courseId, payload: { title: `Untitled section` } },
      {
        onSuccess: (day) => setSections((prev) => [...prev, day]),
        onError: () => message.error("Could not add the section."),
      },
    );
  };

  const handleUpdateSectionTitle = (dayId: string, title: string) => {
    if (!courseId) return;
    updateDay.mutate(
      { courseId, dayId, payload: { title } },
      {
        onSuccess: (day) => setSections((prev) => prev.map((s) => (s.id === day.id ? day : s))),
        onError: () => message.error("Could not update the section."),
      },
    );
  };

  const handleDeleteSection = (dayId: string) => {
    if (!courseId) return;
    removeDay.mutate(
      { courseId, dayId },
      {
        onSuccess: () => setSections((prev) => prev.filter((s) => s.id !== dayId)),
        onError: () => message.error("Could not delete the section."),
      },
    );
  };

  const handleAddLecture = (dayId: string, payload: CreateLectureInput) => {
    if (!courseId) return;
    addLecture.mutate(
      { courseId, dayId, payload },
      {
        onSuccess: (lecture) =>
          setSections((prev) =>
            prev.map((s) => (s.id === dayId ? { ...s, lectures: [...s.lectures, lecture] } : s)),
          ),
        onError: () => message.error("Could not add the lecture."),
      },
    );
  };

  const handleUpdateLecture = (dayId: string, lectureId: string, payload: CreateLectureInput) => {
    if (!courseId) return;
    updateLecture.mutate(
      { courseId, dayId, lectureId, payload },
      {
        onSuccess: (lecture) =>
          setSections((prev) =>
            prev.map((s) =>
              s.id === dayId
                ? { ...s, lectures: s.lectures.map((l) => (l.id === lecture.id ? lecture : l)) }
                : s,
            ),
          ),
        onError: () => message.error("Could not update the lecture."),
      },
    );
  };

  const handleDeleteLecture = (dayId: string, lectureId: string) => {
    if (!courseId) return;
    removeLecture.mutate(
      { courseId, dayId, lectureId },
      {
        onSuccess: () =>
          setSections((prev) =>
            prev.map((s) => (s.id === dayId ? { ...s, lectures: s.lectures.filter((l) => l.id !== lectureId) } : s)),
          ),
        onError: () => message.error("Could not delete the lecture."),
      },
    );
  };

  const handleSaveDetails = () => {
    if (!courseId) return;
    updateCourse.mutate(
      { id: courseId, payload: details },
      {
        onSuccess: () => message.success("Details saved."),
        onError: () => message.error("Could not save details."),
      },
    );
  };

  const handleTogglePublish = () => {
    if (!courseId) return;
    const nextStatus = status === "published" ? "draft" : "published";
    updateCourse.mutate(
      { id: courseId, payload: { status: nextStatus } },
      {
        onSuccess: () => {
          setStatus(nextStatus);
          message.success(nextStatus === "published" ? "Course published!" : "Course unpublished.");
        },
        onError: () => message.error("Could not update the course status."),
      },
    );
  };

  const totalLectures = sections.reduce((sum, s) => sum + s.lectures.length, 0);

  const steps: { key: Step; label: string }[] = [
    { key: "info", label: "Basic Info" },
    { key: "curriculum", label: "Curriculum" },
    { key: "details", label: "Details" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Step tabs */}
      <div className="flex items-center gap-1 border-b border-gray-100 px-3">
        {steps.map((s) => {
          const locked = s.key !== "info" && !courseId;
          return (
            <button
              key={s.key}
              type="button"
              disabled={locked}
              onClick={() => setStep(s.key)}
              title={locked ? "Save the basic info first" : undefined}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                locked
                  ? "cursor-not-allowed text-gray-300"
                  : step === s.key
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {s.label}
              {step === s.key && (
                <motion.span
                  layoutId="builder-step-underline"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-indigo-600"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-6 py-5">
        {step === "info" && (
          <div className="space-y-5">
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700">Title</p>
              <Input
                placeholder="Complete React Bootcamp"
                value={info.title}
                onChange={(e) => setInfo((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700">Subtitle</p>
              <Input
                placeholder="Build production-ready apps with React"
                value={info.subtitle}
                onChange={(e) => setInfo((f) => ({ ...f, subtitle: e.target.value }))}
              />
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700">Description</p>
              <Input.TextArea
                rows={3}
                placeholder="What will students learn?"
                value={info.description}
                onChange={(e) => setInfo((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="mb-1.5 text-sm font-medium text-gray-700">Category</p>
                <Select
                  className="w-full"
                  placeholder="Select category"
                  value={info.category}
                  options={COURSE_CATEGORIES.map((c) => ({ value: c, label: c }))}
                  onChange={(category) => setInfo((f) => ({ ...f, category }))}
                />
              </div>
              <div>
                <p className="mb-1.5 text-sm font-medium text-gray-700">Level</p>
                <Select
                  className="w-full"
                  placeholder="Select level"
                  value={info.level}
                  options={COURSE_LEVELS.map((l) => ({ value: l, label: l }))}
                  onChange={(level) => setInfo((f) => ({ ...f, level }))}
                />
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700">Language</p>
              <Input
                placeholder="English"
                value={info.language}
                onChange={(e) => setInfo((f) => ({ ...f, language: e.target.value }))}
              />
            </div>
            <div>
              <ThumbnailPicker
                value={info.thumbnail}
                category={info.category}
                onChange={(thumbnail) => setInfo((f) => ({ ...f, thumbnail }))}
              />
            </div>
            <div className="flex justify-end pt-3">
              <Button
                type="primary"
                disabled={!canSaveInfo}
                loading={createCourse.isPending || updateCourse.isPending}
                onClick={handleSaveInfo}
              >
                {courseId ? "Save details" : "Create course"}
              </Button>
            </div>
          </div>
        )}

        {step === "curriculum" && courseId && (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-gray-800">Curriculum</h3>
              <p className="text-sm text-gray-500">
                Start putting together your course by creating sections, lectures, and quizzes.
              </p>
              {sections.length > 0 && (
                <p className="mt-1 text-xs text-gray-400">
                  {sections.length} section{sections.length === 1 ? "" : "s"} • {totalLectures}{" "}
                  lecture{totalLectures === 1 ? "" : "s"}
                </p>
              )}
            </div>

            {sections.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
                <BookOpen className="mx-auto mb-2 text-gray-300" size={28} />
                <p className="text-sm text-gray-500">
                  No sections yet. Add your first section to start building the curriculum.
                </p>
              </div>
            )}

            <motion.div variants={listVariants} initial="hidden" animate="show" className="space-y-3">
              {sections
                .slice()
                .sort((a, b) => a.dayNumber - b.dayNumber)
                .map((section, index) => (
                  <motion.div key={section.id} variants={fadeInUp}>
                    <SectionCard
                      section={section}
                      index={index}
                      onUpdateTitle={(title) => handleUpdateSectionTitle(section.id, title)}
                      onDelete={() => handleDeleteSection(section.id)}
                      onAddLecture={(payload) => handleAddLecture(section.id, payload)}
                      onUpdateLecture={(lectureId, payload) => handleUpdateLecture(section.id, lectureId, payload)}
                      onDeleteLecture={(lectureId) => handleDeleteLecture(section.id, lectureId)}
                    />
                  </motion.div>
                ))}
            </motion.div>

            <button
              type="button"
              onClick={handleAddSection}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-indigo-400 hover:text-indigo-600"
            >
              <Plus size={16} /> Add section
            </button>
          </div>
        )}

        {step === "details" && courseId && (
          <div className="space-y-5">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">What students will learn</p>
              <Select
                mode="tags"
                className="w-full"
                placeholder="Type a point and press enter"
                value={details.whatYouWillLearn}
                onChange={(whatYouWillLearn) => setDetails((d) => ({ ...d, whatYouWillLearn }))}
                tokenSeparators={[","]}
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Requirements</p>
              <Select
                mode="tags"
                className="w-full"
                placeholder="Type a requirement and press enter"
                value={details.requirements}
                onChange={(requirements) => setDetails((d) => ({ ...d, requirements }))}
                tokenSeparators={[","]}
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Topics covered</p>
              <Select
                mode="tags"
                className="w-full"
                placeholder="Type a topic and press enter"
                value={details.topics}
                onChange={(topics) => setDetails((d) => ({ ...d, topics }))}
                tokenSeparators={[","]}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="primary" loading={updateCourse.isPending} onClick={handleSaveDetails}>
                Save details
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
        <div>
          {courseId && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onClose}>{isEdit ? "Close" : "Cancel"}</Button>
          {courseId && (
            <Button type="primary" loading={updateCourse.isPending} onClick={handleTogglePublish}>
              {status === "published" ? "Unpublish" : "Publish course"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;