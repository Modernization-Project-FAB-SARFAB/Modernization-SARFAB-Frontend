import { useEffect, useState } from "react";
import type { FilterDatalistProps } from "./FilterDatalist.type";

const FilterDatalist: React.FC<FilterDatalistProps> = ({ name, label, options, value = "", onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (value: string) => {
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="w-full">
      <div className="relative z-20 bg-white dark:bg-form-input">
        <input
          type="text"
          id={name}
          name={name}
          list={`${name}-list`}
          placeholder={label}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          className="relative z-20 w-full appearance-none rounded border border-stroke 
                     bg-transparent py-3 px-6 outline-none transition 
                     focus:border-primary active:border-primary 
                     dark:border-form-strokedark"
        />
        <datalist id={`${name}-list`}>
          {options.map((option) => (
            <option key={option.id} value={option.name} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default FilterDatalist;
