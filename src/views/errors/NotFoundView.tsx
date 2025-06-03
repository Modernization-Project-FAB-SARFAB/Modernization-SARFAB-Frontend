import Button from "@/components/common/Button/Button";
import { RiGhost2Fill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function NotFoundView() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-100 bg-gray-100 text-center px-6">
      <RiGhost2Fill className="w-20 h-20 text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - ¡Ups!</h1>
      <p className="text-gray-600 text-lg mb-6">
        La página que estás buscando se ha perdido en el ciberespacio.
      </p>
      <Button label="Volver al inicio" onClick={() => navigate('/')}/>
    </div>
  );
}
