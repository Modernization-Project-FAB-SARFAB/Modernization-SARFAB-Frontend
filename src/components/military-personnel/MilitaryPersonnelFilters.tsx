import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";

export function MilitaryPersonnelFilters({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
  statusOptions,
  rankFilter,
  setRankFilter,
  rankOptions,
  orderByLastNameAsc,
  setOrderByLastNameAsc
}: MilitaryPersonnelFiltersProps) {
  return (
    <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
      <FilterSearchBox 
        name='searchTerm' 
        value={searchValue} 
        onChange={setSearchValue} 
        placeholder="Buscar por nombre o carnet de identidad" 
      />
      <FilterSelect 
        name='status' 
        label="Seleccionar por estado" 
        options={statusOptions} 
        value={statusFilter} 
        onChange={setStatusFilter} 
      />
      <FilterSelect 
        name='rank' 
        label="Seleccionar por rango" 
        options={rankOptions.map(option => ({
          ...option,
          value: option.value.toString()
        }))} 
        value={rankFilter !== null ? rankFilter.toString() : ""} 
        onChange={(value) => setRankFilter(value ? Number(value) : null)} 
      />
      <div className="flex items-center">
        <label htmlFor="orderToggle" className="mr-2">Orden alfabético</label>
        <input 
          id="orderToggle" 
          type="checkbox" 
          checked={orderByLastNameAsc} 
          onChange={(e) => setOrderByLastNameAsc(e.target.checked)} 
        />
      </div>
    </div>
  );
}
