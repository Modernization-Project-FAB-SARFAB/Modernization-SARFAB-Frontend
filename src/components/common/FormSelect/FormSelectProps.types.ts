interface FormSelectProps {
    label: string;
    options: { id: number; name: string }[];
    required?: boolean;
    icon: JSX.Element;

    control?: any;
    name: string;
  }