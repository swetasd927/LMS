import { Modal } from "antd";
import { Play, PlayCircle, X } from "lucide-react";
import type { Lecture } from "../../types/course.types";
import { getEmbedUrl, isDirectVideoFile } from "../../utils/video";

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
      width={720}
      destroyOnClose
      closeIcon={<X size={20} className="text-gray-500" />}
      styles={{ body: { padding: 0 } }}
    >
      <div className="px-6 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Course Preview
        </p>
        <h2 className="mt-1 text-lg font-bold text-[#1c1d1f]">{courseTitle}</h2>
      </div>

      <div className="mt-4 aspect-video w-full bg-black">
        {!activeLecture && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
            <PlayCircle size={36} />
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
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
            <PlayCircle size={36} />
            <p className="text-sm">This lecture's video link couldn't be played.</p>
          </div>
        )}
      </div>

      {activeLecture && (
        <div className="px-6 py-3">
          <p className="text-sm font-medium text-[#1c1d1f]">{activeLecture.title}</p>
          <p className="text-xs text-gray-400">{activeLecture.sectionTitle}</p>
        </div>
      )}

      {previewLectures.length > 1 && (
        <div className="max-h-64 overflow-y-auto border-t border-gray-100 px-6 py-4">
          <p className="mb-2 text-sm font-semibold text-[#1c1d1f]">Free Sample Videos:</p>
          <ul className="space-y-1">
            {previewLectures.map((lecture) => {
              const isActive = activeLecture?.id === lecture.id;
              return (
                <li key={lecture.id}>
                  <button
                    type="button"
                    onClick={() => onSelectLecture(lecture.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-[#f2edfc] text-[#5624d0]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Play
                        size={14}
                        className={`shrink-0 ${isActive ? "text-[#5624d0]" : "text-gray-400"}`}
                      />
                      <span className="truncate">{lecture.title}</span>
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