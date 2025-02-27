type DropdownItem = {
  type: "link" | "button";
  icon?: JSX.Element;
  label: string;
  href?: string;
  onClick?: () => void;
  ref?: string;
};