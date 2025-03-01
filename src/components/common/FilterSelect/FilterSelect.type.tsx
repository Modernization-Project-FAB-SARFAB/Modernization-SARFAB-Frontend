interface FilterSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string, isSelected: boolean }[];
    value: string;
    onChange: (value: string) => void;
}