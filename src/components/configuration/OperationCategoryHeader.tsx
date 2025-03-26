import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function OperationCategoryHeader() {
  return (
    <nav className="flex flex-wrap items-center gap-3 mb-5">
      <Link 
        to="/configuration/operation-category/create" 
        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-white hover:bg-opacity-90"
      >
        <RiAddLine className="me-2" /> Registrar categoría de operación
      </Link>
      <Link 
        to="/configuration/operation-type/create" 
        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-white hover:bg-opacity-90"
      >
        <RiAddLine className="me-2" /> Registrar tipo de operación
      </Link>
    </nav>
  );
}
