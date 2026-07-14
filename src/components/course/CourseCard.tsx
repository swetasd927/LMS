const CourseCard =() => {
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="h-52 bg-slate-200" />

      <div className="p-4">
        <h3 className="font-semibold">
          Complete React Bootcamp
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          by Sweta Dahal
        </p>

        <p className="mt-4 font-bold">
          Rs. 2,999
        </p>
      </div>
    </div>
  );
}

export default CourseCard;