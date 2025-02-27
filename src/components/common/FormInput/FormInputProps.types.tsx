interface FormInputProps {
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    icon?: React.ReactNode; // Permitir iconos o botones
    
    register: any; // Esta propiedad es pasada desde react-hook-form
    errors?: any; // Errores de validación
    name: string;
}