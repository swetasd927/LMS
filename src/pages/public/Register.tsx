import {
  Button,
  Form,
  Input,
  Select,
  message,
} from "antd";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface LocationState {
  role?: string;
}

const Register = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const state =
    location.state as
      | LocationState
      | undefined;

  const [form] =
    Form.useForm<RegisterFormValues>();

  useEffect(() => {
    if (state?.role) {
      form.setFieldsValue({
        role:
          state.role,
      });
    }
  }, [state, form]);

  const onFinish = (
    values: RegisterFormValues
  ) => {
    console.log(values);

    message.success(
      "Registration Successful!"
    );

    form.resetFields();

    navigate("/login");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Start your learning journey today.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Please enter your full name",
              },
              {
                min: 3,
                message:
                  "Name must be at least 3 characters",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Full Name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message:
                  "Please enter your email",
              },
              {
                type: "email",
                message:
                  "Please enter a valid email",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Email Address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Please enter your password",
              },
              {
                min: 6,
                message:
                  "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={[
              "password",
            ]}
            rules={[
              {
                required: true,
                message:
                  "Please confirm your password",
              },
              ({
                getFieldValue,
              }) => ({
                validator(
                  _,
                  value
                ) {
                  if (
                    !value ||
                    getFieldValue(
                      "password"
                    ) === value
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "Passwords do not match"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message:
                  "Please select a role",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select Role"
              options={[
                {
                  label:
                    "Student",
                  value:
                    "student",
                },
                {
                  label:
                    "Instructor",
                  value:
                    "instructor",
                },
              ]}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;