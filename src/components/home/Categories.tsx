const categories = [
  "Programming",
  "AI",
  "Design",
  "Business",
  "Marketing",
  "Robotics",
  "DevOps",
  "System Design",
  "Cybersecurity"
];

const Categories =() => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-bold">
          Categories
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-xl border p-8"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;