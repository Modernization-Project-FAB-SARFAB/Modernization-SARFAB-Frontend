import FilterDatalist from '../common/FilterDatalist/FilterDatalist';
import FilterSearchBox from '../common/FilterSearchBox/FilterSearchBox';
import FilterSelect from '../common/FilterSelect/FilterSelect';
// import FilterDateRange from "../common/FilterDateRange/FilterDateRange";
import { OperationFilterProps } from './types/OperationFilterProps';

export function OperationFilter({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
  statusOptions,
  municipalityFilter,
  setMunicipalityFilter,
  municipalityOptions,
  categoryFilter,
  setCategoryFilter,
  categoryOptions,
  startDateFilter,
  setStartDateFilter,
  endDateFilter,
  setEndDateFilter,
}: OperationFilterProps) {
  return (
    <div className="flex flex-col gap-5.5 sm:flex-row mt-3">
      <FilterSearchBox
        name="searchTerm"
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Buscar por dirección o solicitante"
      />
      <FilterSelect
        name="status"
        label="Seleccionar por estado"
        options={statusOptions.map(({ id, name }) => ({
          value: id.toString(),
          label: name,
          isSelected: id === statusFilter,
        }))}
        value={
          statusFilter !== undefined
            ? statusFilter.toString()
            : statusOptions[0]?.id.toString()
        }
        onChange={(value) =>
          setStatusFilter(value ? Number(value) : statusOptions[0]?.id)
        }
      />
      <FilterDatalist
        name="municipality"
        label="Seleccionar municipio"
        options={municipalityOptions}
        onChange={(value) => {
          const selected = municipalityOptions.find(
            (option) => option.name === value,
          );
          setMunicipalityFilter(selected ? selected.id : undefined);
        }}
        value={
          municipalityFilter !== undefined
            ? municipalityOptions.find(
                (option) => option.id === municipalityFilter,
              )?.name || ''
            : ''
        }
      />

      <FilterSelect
        name="category"
        label="Seleccionar por categoría"
        options={[
          {
            value: '',
            label: 'Seleccionar por categoría',
            isSelected: categoryFilter === undefined,
          },
          ...categoryOptions.map(({ id, name }) => ({
            value: id.toString(),
            label: name,
            isSelected: id === categoryFilter,
          })),
        ]}
        value={categoryFilter !== undefined ? categoryFilter.toString() : ''}
        onChange={(value) =>
          setCategoryFilter(value ? Number(value) : undefined)
        }
      />

      {/* <FilterDateRange 
                startDate={startDateFilter} 
                setStartDate={setStartDateFilter} 
                endDate={endDateFilter} 
                setEndDate={setEndDateFilter} 
            /> */}
    </div>
  );
}
