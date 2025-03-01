interface FormInputProps {
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    icon?: React.ReactNode;
    
    register: any;
    errors?: any;
    name: string;
}