interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    type?: "submit" | "reset" | "button"; 
}