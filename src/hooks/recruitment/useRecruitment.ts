import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { getRecruitment } from '@/api/RecruitmentAPI';
import { keepPreviousData } from '@tanstack/react-query';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_RECRUIT_WAIT_REVISION = '2';

export function useRecruitment() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState(DEFAULT_RECRUIT_WAIT_REVISION);

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

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
