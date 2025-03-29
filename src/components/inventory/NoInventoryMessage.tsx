import { Link } from "react-router-dom";

export function NoInventoryMessage() {
  return (
    <div className="h-fit">
      <p className="text-center py-20">
        No existen inventarios.{" "}
        <Link to="/inventory/create" className="text-primary font-bold">
          Crear inventario
        </Link>
      </p>
    </div>
  )
}