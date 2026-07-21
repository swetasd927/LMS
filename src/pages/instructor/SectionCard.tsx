import { useState } from "react";
import { Button, Input, Popconfirm } from "antd";
import { Check, ChevronDown, Plus, Trash2, X } from "lucide-react";
import type { CourseDay, CreateLectureInput, Lecture } from "../../types/course.types";
import LectureRow from "./LectureRow";

interface SectionCardProps {
  section: CourseDay;
  index: number;
  onUpdateTitle: (title: string) => void;
  onDelete: () => void;
  onAddLecture: (payload: CreateLectureInput) => void;
  onUpdateLecture: (lectureId: string, payload: CreateLectureInput) => void;
  onDeleteLecture: (lectureId: string) => void;
}

const SectionCard = ({
  section, index, onUpdateTitle, onDelete, onAddLecture, onUpdateLecture, onDeleteLecture,
}: SectionCardProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(section.title);
  const [addingLecture, setAddingLecture] = useState(false);

  const saveTitle = () => {
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== section.title) onUpdateTitle(trimmed);
    setEditingTitle(false);
  };

  const lectures = section.lectures.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-4 py-3">
        <button type="button" onClick={() => setCollapsed((c) => !c)} className="shrink-0 text-gray-400 hover:text-gray-600">
          <ChevronDown size={16} className={`transition-transform ${collapsed ? "-rotate-90" : ""}`} />
        </button>

        {editingTitle ? (
          <div className="flex flex-1 items-center gap-2">
            <span className="shrink-0 text-sm font-semibold text-gray-400">Section {index + 1}:</span>
            <Input autoFocus size="small" value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} onPressEnter={saveTitle} />
            <Button size="small" type="text" icon={<Check size={14} />} onClick={saveTitle} />
            <Button size="small" type="text" icon={<X size={14} />} onClick={() => { setTitleDraft(section.title); setEditingTitle(false); }} />
          </div>
        ) : (
          <button type="button" className="flex-1 truncate text-left text-sm font-semibold text-gray-800 hover:text-indigo-600" onClick={() => setEditingTitle(true)}>
            <span className="text-gray-400">Section {index + 1}: </span>
            {section.title}
          </button>
        )}

        <span className="shrink-0 text-xs text-gray-400">
          {lectures.length} lecture{lectures.length === 1 ? "" : "s"}
        </span>

        <Popconfirm title="Delete this section?" description="This removes all its lectures too." okText="Delete" okButtonProps={{ danger: true }} onConfirm={onDelete}>
          <Button size="small" type="text" danger icon={<Trash2 size={14} />} />
        </Popconfirm>
      </div>

      {!collapsed && (
        <div className="space-y-2 border-t border-gray-100 px-4 py-3">
          {lectures.map((lecture: Lecture) => (
            <LectureRow
              key={lecture.id}
              lecture={lecture}
              onSave={(payload) => onUpdateLecture(lecture.id, payload)}
              onDelete={() => onDeleteLecture(lecture.id)}
            />
          ))}

          {addingLecture ? (
            <LectureRow
              onSave={(payload) => { onAddLecture(payload); setAddingLecture(false); }}
              onCancelAdd={() => setAddingLecture(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setAddingLecture(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-500 transition-colors hover:border-indigo-400 hover:text-indigo-600"
            >
              <Plus size={14} /> Add lecture
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionCard;