const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-6 py-2 rounded-md font-semibold transition ${variant === "primary"
                    ? "bg-primary text-center font-small text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    : "border border-blue-700 text-blue-700 hover:bg-blue-100"
                }`}
        >
            {label}
        </button>
    );
};

export default Button;