interface ButtonGroupProps {
    label: string;
    onPrimaryClick?: () => void;
    cancelLink?: string;
    isPrimarySubmit?: boolean; 
    primaryDisabled?: boolean;
    primaryIsLoading?: boolean;
}