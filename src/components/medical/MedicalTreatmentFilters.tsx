
import { format } from "date-fns";
import FilterRangeDates from "../common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";

export function MedicalTreatmentFilters({ searchValue, setSearchValue, setStartDate, setEndDate, refetch }: MedicalTreatmentFiltersProp) {

    function handleRangeSelect(range: { startDate: Date | undefined; endDate: Date | undefined | undefined; }): void {
        setStartDate(range.startDate ? format(range.startDate, "yyyy-MM-dd") : undefined);
        setEndDate(range.endDate ? format(range.endDate, "yyyy-MM-dd") : undefined);
    }

    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre" />
            <FilterRangeDates onChange={handleRangeSelect} refetch={refetch} />
        </div>
    );
}