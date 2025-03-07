import { RiArrowDownSLine } from "@remixicon/react";

const FilterSelect: React.FC<FilterSelectProps> = ({ name, label, options, onChange, renderOption, customArrow, }) => {
  return (
    <div className="w-full">
      <div className="relative z-20 bg-white dark:bg-form-input">
        <select id={name} name={name} aria-placeholder={label} onChange={(e) => onChange(e.target.value)} className="relative z-20 w-full appearance-none rounded border border-stroke 
                                bg-transparent py-3 px-6 
                                outline-none transition 
                                focus:border-primary active:border-primary dark:border-form-strokedark ">
          {options.map((option, index) =>
            renderOption ? (
              renderOption(option)
            ) :
              (
                <option key={index} value={option.value} selected={option.isSelected}>
                  {option.label}
                </option>
              ))}
        </select>
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 ">
          {customArrow || <RiArrowDownSLine size={20} />}
        </span>
      </div>
    </div>
  );
};

export default FilterSelect;