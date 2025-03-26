import { useState } from "react";
import { useGetCategoriesWithTypes } from "./useGetCategoriesWithTypes";

export function useOperationCategories() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useGetCategoriesWithTypes({
    searchTerm,
    page,
    pageSize
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    searchValue: searchTerm,
    setSearchValue: setSearchTerm,
    pageIndex: page - 1, // Ajustando para compatibilidad con react-table (0-indexed)
    setPageIndex: (newIndex: number) => setPage(newIndex + 1),
    pageSize,
    setPageSize
  };
}
