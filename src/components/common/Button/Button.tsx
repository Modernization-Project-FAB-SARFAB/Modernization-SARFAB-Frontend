import { VARIANT_STYLES } from "@/constants/common/VariantButtonStyles";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", type = "button" }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-6 py-2 rounded-md font-semibold transition lg:px-8 xl:px-10 ${VARIANT_STYLES[variant]}`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;