import { getOperations } from "@/api/OperationAPI";
import { GetOperationParams } from "@/api/types/OperationAPIType.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { format, parse } from "date-fns";

const DEFAULTS = {
  searchTerm: "",
  status: undefined,
  municipalityId: undefined,
  categoryId: undefined,
  startDate: undefined,
  endDate: undefined,
  page: 1,
  pageSize: 10,
};

export function useOperation({
  searchTerm = DEFAULTS.searchTerm,
  status = DEFAULTS.status,
  municipalityId = DEFAULTS.municipalityId,
  categoryId = DEFAULTS.categoryId,
  startDate = DEFAULTS.startDate,
  endDate = DEFAULTS.endDate,
  page = DEFAULTS.page,
  pageSize = DEFAULTS.pageSize,
}: GetOperationParams = {}) {
  const [searchValue, setSearchValue] = useState(searchTerm);
  const [statusFilter, setStatusFilter] = useState(status);
  const [municipalityFilter, setMunicipalityFilter] = useState(municipalityId);
  const [categoryFilter, setCategoryFilter] = useState(categoryId);
  const [startDateFilter, setStartDateFilter] = useState(startDate);
  const [endDateFilter, setEndDateFilter] = useState(endDate);
  const [pageIndex, setPageIndex] = useState(page);
  const [pageSizeState, setPageSize] = useState(pageSize);

  const [debouncedSearch] = useDebounce(searchValue, 500);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "operation",
      {
        searchTerm: debouncedSearch,
        status: statusFilter,
        municipalityId: municipalityFilter !== 0 ? municipalityFilter : undefined,
        categoryId: categoryFilter !== 0 ? categoryFilter : undefined,
        startDate: startDateFilter
          ? format(parse(startDateFilter, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
          : undefined,
        endDate: endDateFilter
          ? format(parse(endDateFilter, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
          : undefined,
        page: pageIndex,
        pageSize: pageSizeState,
      },
    ],
    queryFn: () =>
      getOperations({
        searchTerm: debouncedSearch,
        status: statusFilter,
        municipalityId: municipalityFilter !== 0 ? municipalityFilter : undefined,
        categoryId: categoryFilter !== 0 ? categoryFilter : undefined,
        startDate: startDateFilter
          ? format(parse(startDateFilter, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
          : undefined,
        endDate: endDateFilter
          ? format(parse(endDateFilter, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
          : undefined,
        page: pageIndex,
        pageSize: pageSizeState,
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
    statusFilter,
    setStatusFilter,
    municipalityFilter,
    setMunicipalityFilter,
    categoryFilter,
    setCategoryFilter,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    pageIndex,
    setPageIndex,
    pageSize: pageSizeState,
    setPageSize,
  };
}
