import Icon from "@ant-design/icons";

type CustomIconPropsType = {
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const CustomIcon = ({ component }: CustomIconPropsType) => {
  return (
    <Icon
      className="icon"
      component={component}
    />
  );
};

export default CustomIcon;
