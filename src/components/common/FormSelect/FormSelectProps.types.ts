interface FormSelectProps {
    label: string;
    options: { value: string; label: string }[];
    required?: boolean;
    icon: JSX.Element;
  }