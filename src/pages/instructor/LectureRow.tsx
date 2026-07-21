import { useState } from "react";
import { Button, Checkbox, Input, Select, Popconfirm } from "antd";
import { Check, FileText, Pencil, Trash2, Video, X } from "lucide-react";
import type { CreateLectureInput, Lecture } from "../../types/course.types";
import { LECTURE_TYPES } from "../../data/courseOptions.data";

interface LectureFormState {
  title: string;
  videoUrl: string;
  duration: string;
  type: CreateLectureInput["type"];
  isPreview: boolean;
}

const emptyForm: LectureFormState = {
  title: "",
  videoUrl: "",
  duration: "",
  type: "video",
  isPreview: false,
};

interface LectureRowProps {
  lecture?: Lecture;
  saving?: boolean;
  onSave: (values: CreateLectureInput) => void;
  onDelete?: () => void;
  onCancelAdd?: () => void;
}

const LectureRow = ({
  lecture,
  saving,
  onSave,
  onDelete,
  onCancelAdd,
}: LectureRowProps) => {
  const isNew = !lecture;
  const [editing, setEditing] = useState(isNew);
  const [form, setForm] = useState<LectureFormState>(
    lecture
      ? {
          title: lecture.title,
          videoUrl: lecture.videoUrl,
          duration: lecture.duration,
          type: lecture.type,
          isPreview: Boolean(lecture.isPreview),
        }
      : emptyForm,
  );

  const canSave =
    form.title.trim().length > 0 && form.videoUrl.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      title: form.title.trim(),
      videoUrl: form.videoUrl.trim(),
      duration: form.duration.trim() || "0:00",
      type: form.type,
      isPreview: form.isPreview,
    });
    if (isNew) {
      setForm(emptyForm);
    } else {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancelAdd?.();
      return;
    }
    if (lecture) {
      setForm({
        title: lecture.title,
        videoUrl: lecture.videoUrl,
        duration: lecture.duration,
        type: lecture.type,
        isPreview: Boolean(lecture.isPreview),
      });
    }
    setEditing(false);
  };

  if (!editing && lecture) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
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
            onClick={() => setEditing(true)}
          />
          <Popconfirm
            title="Delete this lecture?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={onDelete}
          >
            <Button
              size="small"
              type="text"
              danger
              icon={<Trash2 size={14} />}
            />
          </Popconfirm>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-lg border border-indigo-200 bg-indigo-50/40 p-3">
      <div className="flex gap-2">
        <Input
          autoFocus
          placeholder="Lecture title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          onPressEnter={handleSave}
        />
        <Select
          value={form.type}
          className="w-32 shrink-0"
          options={LECTURE_TYPES.map((t) => ({ value: t, label: t }))}
          onChange={(type) => setForm((f) => ({ ...f, type }))}
        />
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="https://www.youtube.com/watch?v=..."
          value={form.videoUrl}
          onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
          onPressEnter={handleSave}
        />
        <Input
          placeholder="mm:ss"
          value={form.duration}
          onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
          onPressEnter={handleSave}
          className="w-24 shrink-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          checked={form.isPreview}
          onChange={(e) =>
            setForm((f) => ({ ...f, isPreview: e.target.checked }))
          }
        >
          <span className="text-sm text-gray-600">Free preview</span>
        </Checkbox>

        <div className="flex items-center gap-1">
          <Button size="small" icon={<X size={14} />} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<Check size={14} />}
            disabled={!canSave}
            loading={saving}
            onClick={handleSave}
          >
            {isNew ? "Add lecture" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LectureRow;
