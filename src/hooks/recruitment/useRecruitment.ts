import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { getRecruitment } from '@/api/RecruitmentAPI';
import { keepPreviousData } from '@tanstack/react-query';

const DEFAULTS = {
  pageIndex: 1,
  pageSize: 10,
  statusFilter: "",
};

interface UseRecruitmentOptions {
  initialSearchValue?: string;
  initialStatusFilter?: string;
  initialPageIndex?: number;
  initialPageSize?: number;
}

export function useRecruitment({
  initialSearchValue = "",
  initialStatusFilter = DEFAULTS.statusFilter,
  initialPageIndex = DEFAULTS.pageIndex,
  initialPageSize = DEFAULTS.pageSize,
}: UseRecruitmentOptions = {}) {

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [debouncedStatus] = useDebounce(statusFilter, 500);


  const { data, isLoading, refetch } = useQuery({
    queryKey: ['recruitment', { searchTerm: debouncedSearch, status: debouncedStatus, page: pageIndex, pageSize }],
    queryFn: () => getRecruitment({ searchTerm: debouncedSearch, status: debouncedStatus, page: pageIndex, pageSize }),
    placeholderData: keepPreviousData,
    retry: 1,
  });

  return {
    data,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    statusFilter,
    setStatusFilter,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  };
}
