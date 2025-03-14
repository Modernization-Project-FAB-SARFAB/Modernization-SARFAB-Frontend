export interface FilterRangeDateProps {
  onChange: (range: { startDate: Date | undefined; endDate: Date | undefined }) => void;
  refetch: () => void;
}
