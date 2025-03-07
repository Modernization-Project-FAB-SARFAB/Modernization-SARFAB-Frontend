import { Link } from "react-router-dom";

export function NoMilitaryPersonnelMessage() {
  return (
    <div className="h-fit">
      <p className="text-center py-20">
        No existe personal militar. <Link to="/military-personnel/create" className="text-primary font-bold">Crear personal militar</Link>
      </p>
    </div>
  );
}
