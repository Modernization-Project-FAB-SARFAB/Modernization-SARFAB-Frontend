import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { DateRangePicker } from 'react-date-range';
import { RiCalendarLine } from "@remixicon/react";
import { FilterRangeDateProps } from "./FilterRangeDateProps.type";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const FilterRangeDate: React.FC<FilterRangeDateProps> = ({ onChange }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleSelect = (ranges: any) => {
    setRange([ranges.selection]);
    onChange(ranges.selection);
  };

  return (
    <div className="relative w-full">
      <div
        className="relative z-20 bg-white dark:bg-form-input border border-stroke 
                  py-3 px-6 rounded cursor-pointer flex justify-between items-center"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className="text-gray-600 dark:text-white">
          {format(range[0].startDate, "dd/MM/yyyy")} - {format(range[0].endDate, "dd/MM/yyyy")}
        </span>
        <RiCalendarLine size={20} className="text-gray-500" />
      </div>

      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute left-0 mt-2 z-30 bg-white dark:bg-gray-800 shadow-md p-4 rounded"
        >
          <DateRangePicker
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
};

export default FilterRangeDate;
