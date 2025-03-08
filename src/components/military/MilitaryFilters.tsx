import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";
import SortToggle from "../common/SortToggle/SortToggle";
import { MilitaryFiltersProps } from "./types/MilitaryFiltersProps";

export function MilitaryFilters({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
  statusOptions,
  rankFilter = null,
  setRankFilter = () => {},
  rankOptions = [],
  orderByLastNameAsc,
  setOrderByLastNameAsc
}: MilitaryFiltersProps) {

  const updatedStatusOptions = statusOptions.map(option => ({
    ...option,
    isSelected: option.value === statusFilter
  }));

  const updatedRankOptions = [
    { value: "null", label: "Todos los rangos", isSelected: rankFilter === null },
    ...rankOptions.map(option => ({
      ...option,
      value: option.value.toString(),
      isSelected: option.value === rankFilter
    }))
  ];

  return (
  <div className="flex flex-col sm:flex-row gap-4 mt-3 items-center">
    <div className="flex-grow sm:w-3/5">
      <FilterSearchBox 
        name="searchTerm" 
        value={searchValue} 
        onChange={setSearchValue} 
        placeholder="Buscar por apellido o nombre" 
        className="w-full"
      />
    </div>
      <div className="w-1/5">
      <FilterSelect 
        name="status" 
        label="Estado" 
        options={updatedStatusOptions} 
        value={statusFilter} 
        onChange={setStatusFilter} 
      />
    </div>
    <div className="w-1/4">
      <FilterSelect 
        name="rank" 
        label="Rango" 
        options={updatedRankOptions}
        value={rankFilter !== null ? rankFilter.toString() : "null"}
        onChange={(value) => setRankFilter(value === "null" ? null : Number(value))}
      />
    </div>
    <div className="flex items-center w-auto">
      <SortToggle 
        isAscending={orderByLastNameAsc}
        onToggle={() => setOrderByLastNameAsc(!orderByLastNameAsc)}
      />
    </div>
  </div>
  );
}
