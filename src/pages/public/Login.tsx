import { Button, Input } from "antd";

const Login = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Login
        </h1>

        <div className="space-y-4">
          <Input
            size="large"
            placeholder="Email"
          />

          <Input.Password
            size="large"
            placeholder="Password"
          />

          <Button
            type="primary"
            size="large"
            className="w-full"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;