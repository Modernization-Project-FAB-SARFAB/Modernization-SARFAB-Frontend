import { useState } from "react";

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selectedValues = [], onChange }) => {
    const [selected, setSelected] = useState<string[]>(selectedValues);
  
    const handleChange = (value: string) => {
      const updatedSelection = selected.includes(value)
        ? selected.filter((item) => item !== value) // Quita la opción si ya estaba seleccionada
        : [...selected, value]; // Agrega la opción si no estaba seleccionada
  
      setSelected(updatedSelection);
      onChange?.(updatedSelection); // Notifica al padre si hay cambios
    };
  
    return (
      <div className="w-full">
        {options.map((option) => (
          <label key={option.value} className="flex cursor-pointer select-none items-center mb-2">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={selected.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
              <div
                className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                  selected.includes(option.value) ? "border-primary" : "border-gray-300"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                    selected.includes(option.value) ? "!bg-primary" : ""
                  }`}
                ></span>
              </div>
            </div>
            {option.label}
          </label>
        ))}
      </div>
    );
  };
  
  export default CheckboxGroup;