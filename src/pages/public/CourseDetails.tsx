import { Button } from "antd";

const CourseDetails = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold">
            Complete React Bootcamp
          </h1>

          <p className="mt-4 text-gray-600">
            Learn React from beginner to advanced.
          </p>

          <div className="mt-10 h-96 rounded-xl bg-slate-200" />

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">
              What you'll learn
            </h2>

            <ul className="space-y-2">
              <li>1. React Fundamentals</li>
              <li>2. TypeScript</li>
              <li>3. State Management</li>
            </ul>
          </section>
        </div>

        <div>
          <div className="rounded-xl border p-6">
            <div className="mb-6 h-52 rounded-lg bg-slate-200" />

            <h2 className="text-3xl font-bold">
              Rs. 2,999
            </h2>

            <Button
              type="primary"
              size="large"
              className="mt-6 w-full"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;