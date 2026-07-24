import { Modal } from "antd";
import { FileText, Play, PlayCircle, Sparkles, Video, X } from "lucide-react";
import type { Lecture } from "../../types/course.types";
import { getEmbedUrl, isDirectVideoFile } from "../../../../utils/video";

interface PreviewLecture extends Lecture {
  sectionTitle: string;
}

interface CoursePreviewModalProps {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  /** All lectures across the course marked isPreview — the "Free Sample Videos" list. */
  previewLectures: PreviewLecture[];
  /** Which one is currently playing. */
  activeLectureId: string | null;
  onSelectLecture: (lectureId: string) => void;
}

const CoursePreviewModal = ({
  open,
  onClose,
  courseTitle,
  previewLectures,
  activeLectureId,
  onSelectLecture,
}: CoursePreviewModalProps) => {
  const activeLecture =
    previewLectures.find((l) => l.id === activeLectureId) ?? previewLectures[0] ?? null;

  const embedUrl = activeLecture ? getEmbedUrl(activeLecture.videoUrl) : null;
  const isDirectFile = activeLecture ? isDirectVideoFile(activeLecture.videoUrl) : false;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={760}
      destroyOnClose
      closeIcon={
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-800">
          <X size={16} />
        </span>
      }
      className="[&_.ant-modal-content]:overflow-hidden [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:p-0"
      styles={{
        body: { padding: 0 },
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-gray-100 px-6 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f2edfc] text-[#5624d0]">
          <Sparkles size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Course Preview
          </p>
          <h2 className="truncate text-base font-bold text-[#1c1d1f]">{courseTitle}</h2>
        </div>
      </div>

      {/* Video stage */}
      <div className="relative aspect-video w-full bg-[#0b0b0d]">
        {!activeLecture && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
            <PlayCircle size={40} className="text-gray-600" />
            <p className="text-sm">No preview video is available for this course yet.</p>
          </div>
        )}

        {activeLecture && isDirectFile && (
          <video
            key={activeLecture.id}
            src={activeLecture.videoUrl}
            controls
            autoPlay
            className="h-full w-full"
          />
        )}

        {activeLecture && !isDirectFile && embedUrl && (
          <iframe
            key={activeLecture.id}
            src={embedUrl}
            title={activeLecture.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )}

        {activeLecture && !isDirectFile && !embedUrl && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
            <PlayCircle size={40} className="text-gray-600" />
            <p className="text-sm">This lecture's video link couldn't be played.</p>
          </div>
        )}
      </div>

      {/* Now playing */}
      {activeLecture && (
        <div className="flex items-start gap-2.5 border-b border-gray-100 px-6 py-4">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2edfc] text-[#5624d0]">
            <Play size={11} className="ml-0.5 fill-current" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1c1d1f]">{activeLecture.title}</p>
            <p className="truncate text-xs text-gray-400">{activeLecture.sectionTitle}</p>
          </div>
        </div>
      )}

      {/* Sample video list */}
      {previewLectures.length > 1 && (
        <div className="max-h-64 overflow-y-auto px-6 py-4">
          <p className="mb-2.5 flex items-center justify-between text-sm font-semibold text-[#1c1d1f]">
            Free Sample Videos
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              {previewLectures.length}
            </span>
          </p>
          <ul className="space-y-1">
            {previewLectures.map((lecture) => {
              const isActive = activeLecture?.id === lecture.id;
              const TypeIcon = lecture.type === "article" ? FileText : Video;
              return (
                <li key={lecture.id}>
                  <button
                    type="button"
                    onClick={() => onSelectLecture(lecture.id)}
                    className={`group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "border-[#e4d9fb] bg-[#f8f5fe] text-[#5624d0]"
                        : "border-transparent text-gray-700 hover:border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                        isActive
                          ? "bg-[#5624d0] text-white"
                          : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                      }`}
                    >
                      {isActive ? (
                        <Play size={12} className="ml-0.5 fill-current" />
                      ) : (
                        <TypeIcon size={14} />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{lecture.title}</span>
                      <span className="block truncate text-xs text-gray-400">
                        {lecture.sectionTitle}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-gray-400">{lecture.duration}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default CoursePreviewModal;