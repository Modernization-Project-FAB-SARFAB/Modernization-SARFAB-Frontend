import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiEdit2Line, RiEyeFill } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { MedicalTreatment } from "@/types/medical";

export const medicalTreatmentColumnDef: ColumnDef<MedicalTreatment>[] = [
  { header: "Fecha del tratamiento", accessorKey: "treatmentDate" },
  { header: "Paciente", accessorKey: "patientPersonFullname" },
  { header: "Persona que atendió", accessorKey: "attendingPersonFullname" },
  { header: "Diagnóstico", accessorKey: "diagnosis" },
  { header: "Descripción del tratamiento", accessorKey: "description" },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableSorting: false,
  }
];

const ActionsColumn = ({ row }: { row: any }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "link", label: "Editar tratamiento",
          href: `/medical-treatment/${row.original.medicalTreatmentId}/edit`,
          icon: <RiEdit2Line size={20} />
        },
        {
          type: "link", label: "Ver tratamiento",
          href: `/medical-treatment/${row.original.medicalTreatmentId}`,
          icon: <RiEyeFill size={20} />
        }
      ]}
    />
  );
};