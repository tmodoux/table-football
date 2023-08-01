import React from "react";
import Icon from "@ant-design/icons";

type CustomIconPropsType = {
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const CustomIcon = ({ component }: CustomIconPropsType) => {
  return (
    <Icon
      style={{
        fontSize: "30px",
      }}
      component={component}
    />
  );
};

export default CustomIcon;
