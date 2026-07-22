import { useState } from "react";
import { Button, Checkbox, Input, Select, Popconfirm } from "antd";
import { Check, Clock, FileText, Link2, Pencil, Trash2, Video, X } from "lucide-react";
import type { CreateLectureInput, Lecture } from "../../types/course.types";
import { LECTURE_TYPES } from "../../data/courseOptions.data";

/** m:ss, mm:ss, or hh:mm:ss — 4:05, 12:30, 1:04:00 all pass; "ssss" or "99:99" don't. */
const DURATION_PATTERN = /^(\d{1,2}:)?\d{1,2}:[0-5]\d$/;

interface LectureFormState {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  type: CreateLectureInput["type"];
  isPreview: boolean;
}

const emptyForm: LectureFormState = {
  title: "",
  description: "",
  videoUrl: "",
  duration: "",
  type: "video",
  isPreview: false,
};

const toFormState = (lecture: Lecture): LectureFormState => ({
  title: lecture.title,
  description: lecture.description ?? "",
  videoUrl: lecture.videoUrl,
  duration: lecture.duration,
  type: lecture.type,
  isPreview: Boolean(lecture.isPreview),
});

interface LectureRowProps {
  lecture?: Lecture;
  saving?: boolean;
  /** Called after a successful "Add lecture" — parent decides whether to keep the form open. */
  onSave: (values: CreateLectureInput) => void;
  onDelete?: () => void;
  onCancelAdd?: () => void;
}

const LectureRow = ({ lecture, saving, onSave, onDelete, onCancelAdd }: LectureRowProps) => {
  const isNew = !lecture;
  const [editing, setEditing] = useState(isNew);
  const [form, setForm] = useState<LectureFormState>(lecture ? toFormState(lecture) : emptyForm);

  const durationValid = form.duration.trim() === "" || DURATION_PATTERN.test(form.duration.trim());
  const canSave = form.title.trim().length > 0 && form.videoUrl.trim().length > 0 && durationValid;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      videoUrl: form.videoUrl.trim(),
      duration: form.duration.trim() || "0:00",
      type: form.type,
      isPreview: form.isPreview,
    });
    if (isNew) {
      // Reset so the same form is immediately ready for the next lecture.
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
    if (lecture) setForm(toFormState(lecture));
    setEditing(false);
  };

  // Read-only row (existing lecture, not being edited)
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
            <p className="truncate text-sm font-medium text-gray-800">{lecture.title}</p>
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex shrink-0 items-center gap-1 text-xs text-gray-400">
                <Clock size={11} />
                {lecture.duration || "0:00"}
              </span>
              {lecture.isPreview && (
                <span className="shrink-0 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-700">
                  Preview
                </span>
              )}
              {lecture.description && (
                <span className="min-w-0 truncate text-xs text-gray-400">
                  {lecture.description}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button size="small" type="text" icon={<Pencil size={14} />} onClick={() => setEditing(true)} />
          <Popconfirm
            title="Delete this lecture?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={onDelete}
          >
            <Button size="small" type="text" danger icon={<Trash2 size={14} />} />
          </Popconfirm>
        </div>
      </div>
    );
  }

  // Add / edit form
  return (
    <div className="space-y-2.5 rounded-lg border border-indigo-200 bg-indigo-50/40 p-3">
      <div className="flex gap-2">
        <Input
          autoFocus
          placeholder="Lecture title*"
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

      <div>
        <Input
          prefix={<Link2 size={14} className="mr-1 text-gray-400" />}
          placeholder="Video URL* — https://www.youtube.com/watch?v=..."
          value={form.videoUrl}
          onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
          onPressEnter={handleSave}
        />
        <p className="mt-1 text-xs text-gray-400">
          Paste a YouTube / Vimeo / hosted video link. Required to add this lecture.
        </p>
      </div>

      <Input.TextArea
        rows={2}
        placeholder="Short description (optional)"
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
      />

      <div className="flex items-start gap-2">
        <div className="w-24 shrink-0">
          <Input
            placeholder="mm:ss"
            value={form.duration}
            onChange={(e) => {
              // Only digits and colons — garbage like "sssss" can never be typed in.
              const cleaned = e.target.value.replace(/[^\d:]/g, "");
              setForm((f) => ({ ...f, duration: cleaned }));
            }}
            onPressEnter={handleSave}
            status={!durationValid ? "error" : undefined}
          />
          {!durationValid && (
            <p className="mt-1 text-[11px] text-red-500">Use mm:ss, e.g. 4:30</p>
          )}
        </div>
        <Checkbox
          checked={form.isPreview}
          onChange={(e) => setForm((f) => ({ ...f, isPreview: e.target.checked }))}
          className="mt-1.5"
        >
          <span className="text-sm text-gray-600">Free preview</span>
        </Checkbox>
      </div>

      <div className="flex items-center justify-end gap-1 pt-0.5">
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
  );
};

export default LectureRow;