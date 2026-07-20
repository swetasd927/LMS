import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login, findUser } = useAuth();

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;

    if (email === "student@gmail.com") {
      login(email, "student");
      message.success("Student Login Successful!");
      navigate("/student/dashboard");
      return;
    }

    if (email === "instructor@gmail.com") {
      login(email, "instructor");
      message.success("Instructor Login Successful!");
      navigate("/instructor/dashboard");
      return;
    }

    if (email === "admin@gmail.com") {
      login(email, "admin");
      message.success("Admin Login Successful!");
      navigate("/admin/dashboard");
      return;
    }

    const foundUser = findUser(email, password);

    if (foundUser) {
      login(foundUser.email, foundUser.role);
      message.success(`Welcome back, ${foundUser.name}!`);
      navigate(`/${foundUser.role}/dashboard`);
      return;
    }

    message.error("User does not exist");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

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
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Password" />
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
