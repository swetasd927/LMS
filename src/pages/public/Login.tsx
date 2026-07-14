import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values: {
    email: string;
    password: string;
  }) => {
    console.log(values);

    message.success("Login Successful!");

    navigate("/");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
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

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;