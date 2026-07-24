import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 14 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={
            n <= Math.round(rating)
              ? "fill-[#e59819] text-[#e59819]"
              : "fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700"
          }
        />
      ))}
    </div>
  );
};

export default StarRating;