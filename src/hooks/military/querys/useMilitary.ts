import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getMilitary, getMilitaryRanks } from "@/api/MilitaryAPI";
import { keepPreviousData } from "@tanstack/react-query";

const DEFAULTS = {
  pageIndex: 1,
  pageSize: 10,
  statusFilter: "",
  orderByLastNameAsc: true,
};

interface UseMilitaryOptions {
  initialSearchValue?: string;
  initialStatusFilter?: string;
  initialPageIndex?: number;
  initialPageSize?: number;
  initialOrderByLastNameAsc?: boolean;
}

export function useMilitary({
  initialSearchValue = "",
  initialStatusFilter = DEFAULTS.statusFilter,
  initialPageIndex = DEFAULTS.pageIndex,
  initialPageSize = DEFAULTS.pageSize,
  initialOrderByLastNameAsc = DEFAULTS.orderByLastNameAsc,
}: UseMilitaryOptions = {}) {
  
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [orderByLastNameAsc, setOrderByLastNameAsc] = useState(initialOrderByLastNameAsc);
  const [rankFilter, setRankFilter] = useState<number | null>(null);

  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [debouncedStatus] = useDebounce(statusFilter, 500);
  const [debouncedRankId] = useDebounce(rankFilter, 500);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["military", { 
        searchTerm: debouncedSearch, 
        status: debouncedStatus, 
        page: pageIndex, 
        pageSize, 
        orderByLastNameAsc, 
        rankId: debouncedRankId
    }],
    queryFn: () => getMilitary({ 
        searchTerm: debouncedSearch, 
        status: debouncedStatus, 
        page: pageIndex, 
        pageSize, 
        orderByLastNameAsc, 
        rankId: debouncedRankId 
    }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const { data: rankOptions, isLoading: isRanksLoading } = useQuery({
    queryKey: ["militaryRanks"],
    queryFn: getMilitaryRanks,
    placeholderData: [],
    retry: false,
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
    orderByLastNameAsc,
    setOrderByLastNameAsc,
    rankFilter,
    setRankFilter,
    rankOptions,
    isRanksLoading,
  };
}
