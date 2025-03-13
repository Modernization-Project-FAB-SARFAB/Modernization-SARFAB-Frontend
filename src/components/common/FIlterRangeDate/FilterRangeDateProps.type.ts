export interface FilterRangeDateProps {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  onChange: (range: { startDate: Date | undefined; endDate: Date | undefined }) => void;
  refetch: () => void; // Agregado para actualizar datos al limpiar
}
