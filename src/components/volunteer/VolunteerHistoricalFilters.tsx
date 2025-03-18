import FilterRangeDates from "../common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";
import { format } from "date-fns";

export function VolunteerHistoricalFilters({ searchValue, setSearchValue, gradeIdFilter, setgradeIdFilter, 
                                                gradeIdOptions, setStartDate, setEndDate, refetch,
                                                statusFilter, setStatusFilter, statusOptions }: VolunteerHistoricalFiltersProps) {

    function handleRangeSelect(range: { startDate: Date | undefined; endDate: Date | undefined | undefined; }): void {
        setStartDate(range.startDate ? format(range.startDate, "yyyy-MM-dd") : undefined);
        setEndDate(range.endDate ? format(range.endDate, "yyyy-MM-dd") : undefined);
    }

    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre o carnet de identidad" />
            <FilterSelect name='gradeId' label="Seleccionar grado" options={gradeIdOptions} value={gradeIdFilter} onChange={setgradeIdFilter} />
            <FilterSelect name='status' label="Seleccionar estado" options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
            <FilterRangeDates onChange={handleRangeSelect} refetch={refetch} />
        </div>
    );
}