import FilterRangeDate from "../common/FIlterRangeDate/FilterRangeDate";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";

export function MedicalTreatmentFilters({ searchValue, setSearchValue, setStartDate, setEndDate }: MedicalTreatmentFiltersProp) {

    function handleRangeSelect(range: { startDate: Date; endDate: Date; }): void {
        setStartDate(range.startDate.toISOString().split('T')[0]);
        setEndDate(range.endDate.toISOString().split('T')[0]);
        console.log(range.startDate.toISOString().split('T')[0], range.endDate.toISOString().split('T')[0])
    }

    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre o carnet de identidad" />
            <FilterRangeDate onChange={handleRangeSelect} />
        </div>
    );
}