import { RiHistoryLine } from "@remixicon/react";

export function NoMovementHistoryMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <RiHistoryLine size={48} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay movimientos registrados</h3>
      <p className="text-gray-500">No se encontraron movimientos en el historial.</p>
    </div>
  );
}
