
export type FilterSearchBoxProps = {
    name:string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: () => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};