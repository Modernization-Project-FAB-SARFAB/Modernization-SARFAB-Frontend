import React, { useState } from "react";
import { format} from "date-fns";
import { es } from "date-fns/locale";
import { DateRangePicker, createStaticRanges, defaultStaticRanges} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { RiCalendarLine, RiCloseLine } from "@remixicon/react";
import { FilterRangeDateProps } from "./FilterRangeDateProps.type";

const customStaticRanges = createStaticRanges(
  defaultStaticRanges.map(range => {
    if (range.label === "Today") return { ...range, label: "Hoy" };
    if (range.label === "Yesterday") return { ...range, label: "Ayer" };
    if (range.label === "This Week") return { ...range, label: "Esta semana" };
    if (range.label === "Last Week") return { ...range, label: "La semana pasada" };
    if (range.label === "This Month") return { ...range, label: "Este mes" };
    if (range.label === "Last Month") return { ...range, label: "Mes pasado" };
    return range;
  })
);

const FilterRangeDates: React.FC<FilterRangeDateProps> = ({ onChange, refetch }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: any) => {
    setRange([ranges.selection]);
    onChange({ startDate: ranges.selection.startDate, endDate: ranges.selection.endDate });
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    setRange([{ startDate: undefined, endDate: undefined, key: "selection" }]);
    onChange({ startDate: undefined, endDate: undefined });
    setShowPicker(false);
    refetch();
  };

  return (
    <div className="relative w-full">
      <div
        className="relative z-20 bg-white dark:bg-form-input border border-stroke 
                  py-3 px-6 rounded cursor-pointer flex justify-between items-center 
                  focus-within:border-primary dark:border-form-strokedark"
        onClick={() => setShowPicker(!showPicker)}
      >
        <span className="text-gray-600 dark:text-white">
          {range[0].startDate && range[0].endDate
            ? `${format(range[0].startDate, "dd/MM/yyyy")} - ${format(range[0].endDate, "dd/MM/yyyy")}`
            : "Seleccionar rango"}
        </span>

        <div className="flex gap-2 items-center">
          {range[0].startDate && range[0].endDate && (
            <RiCloseLine size={20} className="text-gray-500 cursor-pointer" onClick={handleClear} />
          )}
          <RiCalendarLine size={20} className="text-gray-500" />
        </div>
      </div>

      {showPicker && (
        <div className="absolute z-30 mt-2 bg-white dark:bg-gray-800 shadow-md p-4 rounded min-w-[250px] w-fit"
            style={{ right: 0, left: "auto" }}>
          <DateRangePicker
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
            staticRanges={customStaticRanges}
            locale={es}
            showDateDisplay={false}
            inputRanges={[]}
          />
        </div>
      )}
    </div>
  );
};

export default FilterRangeDates;
