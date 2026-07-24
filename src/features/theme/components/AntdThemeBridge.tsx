import { ConfigProvider, theme as antdTheme } from "antd";

import { useTheme } from "../hooks/useTheme";

const AntdThemeBridge = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdThemeBridge;
