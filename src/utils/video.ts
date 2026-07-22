/**
 * Converts a plain YouTube / Vimeo watch URL (the kind instructors paste into
 * the lecture "Video URL" field) into an embeddable iframe src.
 * Falls back to the original URL for anything else (e.g. a direct .mp4 link),
 * and returns null if the string isn't a usable URL at all.
 */
export const getEmbedUrl = (rawUrl: string): string | null => {
  const url = rawUrl?.trim();
  if (!url) return null;

  // youtube.com/watch?v=ID  |  youtube.com/embed/ID  |  youtu.be/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/,
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  // Already an embed-style URL, or a direct video file — use as-is.
  if (/^https?:\/\//.test(url)) return url;

  return null;
};

/** True if the URL looks like a direct video file rather than a provider embed. */
export const isDirectVideoFile = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);