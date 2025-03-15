import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { add } from "date-fns";
import { useState } from "react";

export default function CreateOperationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBreadcrumb([{ label: "Operaciones", path: "/operation/list" }, { label: "Registrar nueva operación" },]);

  const initialValues = {
    address: "",
    departureDate: new Date(),
    arrivalDate: new Date(),
    operationTypeId: 0,
    municipalityId: 0,
    requesterId: 0,
    responsible: {
      personId: 0,
      role: "",
    },
    personnel: [],
  };


  return (
    <div>Hola papus</div>
  )
}