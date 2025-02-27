interface AlertProps {
    type: 'warning' | 'success' | 'error'; // Tipos de alerta
    title: string;
    message: string;
    icon: JSX.Element;
}