import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { getVolunteerGuardsReportList, getVolunteerOperationsReportList } from '@/api/VolunteerAPI';

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10,
    statusFilter: "",
    categoryFilter: "",
    defaultDate: '',
};

interface UseVolunteerOptions {
    initialVolunteerId?: number;
    initialSearchValue?: string;
    initialCategoryFilter?: string;
    initialStartDateValue?: string;
    initialEndDateValue?: string;
    initialPageIndex?: number;
    initialPageSize?: number;
    initialOrderByDateAsc?: boolean;
}

export function useVolunteerOperationsReport({
    initialVolunteerId,
    initialSearchValue = "",
    initialCategoryFilter = DEFAULTS.statusFilter,
    initialStartDateValue = DEFAULTS.defaultDate,
    initialEndDateValue = DEFAULTS.defaultDate,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize,
    initialOrderByDateAsc = true,
}: UseVolunteerOptions = {}) {

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [categoryFilter, setCateforyFilter] = useState(initialCategoryFilter);

    const [startDate, setStartDate] = useState<string | undefined>(initialStartDateValue);
    const [endDate, setEndDate] = useState<string | undefined>(initialEndDateValue);

    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const [debouncedSearch] = useDebounce(searchValue, 500);
    const [debouncedCategory] = useDebounce(categoryFilter, 500);
    const [debouncedStartDate] = useDebounce(startDate, 500);
    const [debouncedEndDate] = useDebounce(endDate, 500);

    const [orderByDateAsc, setOrderByDateAsc] = useState<boolean>(initialOrderByDateAsc);


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['volunteerOperationReport', initialVolunteerId, {
            query: debouncedSearch, categoryId: debouncedCategory, startDate: debouncedStartDate,
            endDate: debouncedEndDate, page: pageIndex, pageSize, orderByDateAsc
        }],
        queryFn: () => getVolunteerOperationsReportList(Number(initialVolunteerId), {
            query: debouncedSearch, categoryId: debouncedCategory, startDate: debouncedStartDate,
            endDate: debouncedEndDate, page: pageIndex, pageSize, orderByDateAsc
        }),
        placeholderData: keepPreviousData,
        retry: false,
    });

    return {
        data,
        isLoading,
        refetch,
        searchValue,
        setSearchValue,

        categoryFilter,
        setCateforyFilter,

        setStartDate,
        setEndDate,

        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,

        orderByDateAsc,
        setOrderByDateAsc
    };
}
