interface CheckboxGroupProps {
    options: CheckboxOption[];
    selectedValues?: string[];
    onChange?: (selected: string[]) => void;
  }