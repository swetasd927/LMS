import { Button, Input, Select } from "antd";

const Register = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Start your learning journey today.
        </p>

        <div className="space-y-4">
          <Input
            size="large"
            placeholder="Full Name"
          />

          <Input
            size="large"
            placeholder="Email Address"
          />

          <Input.Password
            size="large"
            placeholder="Password"
          />

          <Input.Password
            size="large"
            placeholder="Confirm Password"
          />

          <Select
            size="large"
            className="w-full"
            placeholder="Select Role"
            options={[
              {
                value: "student",
                label: "Student",
              },
              {
                value: "instructor",
                label: "Instructor",
              },
            ]}
          />

          <Button
            type="primary"
            size="large"
            className="w-full"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;