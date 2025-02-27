import { RiCheckLine, RiCloseCircleLine, RiErrorWarningLine } from "@remixicon/react";

const Alert: React.FC<AlertProps> = ({ type, title, message, icon }) => {
    // Definir los colores y estilos de acuerdo con el tipo de alerta
    const alertClasses = {
        warning: 'border-warning bg-warning bg-opacity-15 text-[#9D5425]',
        success: 'border-[#34D399] bg-[#34D399] bg-opacity-15 text-black',
        error: 'border-[#F87171] bg-[#F87171] bg-opacity-15 text-[#B45454]',
    };

    const renderIcon = () => {
        switch (type) {
            case 'warning':
                return <RiErrorWarningLine size={24} color="#FBBF24" />;
            case 'success':
                return <RiCheckLine size={24} color="white" />;
            case 'error':
                return <RiCloseCircleLine size={24} color="white" />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex w-full border-l-6 ${alertClasses[type]} px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9`}>
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg">
                {renderIcon()}
            </div>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold">{title}</h5>
                <p className="leading-relaxed">{message}</p>
            </div>
        </div>
    );
};

export default Alert;