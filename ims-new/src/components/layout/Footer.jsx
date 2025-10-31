import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = ({ theme = 'light', bgColor }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-600';

  return (
    <Footer style={{ backgroundColor: bgColor, textAlign: "center" }}>
      <span className={`${textColor} text-sm`}>
        © 2025 Xtown. All rights reserved.
      </span>
    </Footer>
  );
};

export default AppFooter;
