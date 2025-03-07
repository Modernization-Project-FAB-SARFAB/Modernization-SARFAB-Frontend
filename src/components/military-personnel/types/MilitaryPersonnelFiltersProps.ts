interface MilitaryPersonnelFiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  statusOptions: { value: string; label: string; isSelected: boolean }[];
  rankFilter: number | null;
  setRankFilter: (value: number | null) => void;
  rankOptions: { value: number; label: string; isSelected: boolean }[];
  orderByLastNameAsc: boolean;
  setOrderByLastNameAsc: (value: boolean) => void;
}