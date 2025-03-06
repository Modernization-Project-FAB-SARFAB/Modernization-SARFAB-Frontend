interface AlertProps {
    type: 'warning' | 'success' | 'error';
    title: string;
    message: string;
    icon: JSX.Element;
}