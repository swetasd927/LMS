import { Check } from "lucide-react";
import { COURSE_THUMBNAILS } from "../../../../data/imageAssets.data";

interface ThumbnailPickerProps {
  value?: string;
  onChange: (url: string) => void;
  category?: string;
}

const ThumbnailPicker = ({ value, onChange, category }: ThumbnailPickerProps) => {
  const sorted = category
    ? [...COURSE_THUMBNAILS].sort((a, b) =>
        Number(b.category === category) - Number(a.category === category),
      )
    : COURSE_THUMBNAILS;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {sorted.map((asset) => {
          const selected = value === asset.url;
          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => onChange(asset.url)}
              title={asset.label}
              className={`group relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                selected
                  ? "border-indigo-600 ring-2 ring-indigo-100 dark:ring-indigo-900"
                  : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              <img src={asset.url} alt={asset.label} className="h-full w-full object-cover" />
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center bg-indigo-600/30">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <Check size={14} />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThumbnailPicker;