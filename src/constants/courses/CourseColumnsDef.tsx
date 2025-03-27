import { Course } from "@/types/courses.schema";
import { RiEyeLine, RiEdit2Line, RiUserAddLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";

// Componente para la columna de acciones
interface ActionsColumnProps {
  row: any;
  openEditModal?: (courseId: number, courseData: { name: string; description: string }) => void;
}

const ActionsColumn = ({ row, openEditModal }: ActionsColumnProps) => {
  const navigate = useNavigate();
  
  // Verificación de la estructura de datos
  console.log("Row completo:", row);
  
  // Intentamos obtener los datos del curso
  const courseData = row?.original;
  console.log("Datos del curso extraídos:", courseData);
  
  // Extraemos el ID según la estructura real
  // Puede estar en courseId o en id dependiendo de la API
  let courseId: number | undefined = courseData?.courseId || courseData?.id;
  console.log("ID del curso extraído:", courseId);

  return (
    <DropdownMenu
      items={[
        {
          type: "link", 
          label: "Asignar personas",
          onClick: () => {
            if (courseId !== undefined) {
              navigate(`/courses/${courseId}/assign`);
            }
          },
          icon: <RiUserAddLine size={20} />
        },
        {
          type: "button", 
          label: "Editar curso", 
          onClick: () => {
            console.log("ID del curso a editar:", courseId);
            if (openEditModal && courseId !== undefined && courseData) {
              openEditModal(courseId, {
                name: courseData.name,
                description: courseData.description
              });
            } else {
              console.error("No se puede editar: datos insuficientes", {
                openEditModal: !!openEditModal,
                courseId,
                courseData
              });
            }
          },
          icon: <RiEdit2Line size={20} />
        },
        { 
          type: "link", 
          label: "Ver curso", 
          onClick: () => {
            if (courseId !== undefined) {
              navigate(`/courses/${courseId}/details`);
            }
          },
          icon: <RiEyeLine size={20} /> 
        }
      ]}
    />
  );
};

// Definición final de columnas con la columna de acciones
export const courseColumnsDef = (
  openEditModal?: (courseId: number, courseData: { name: string; description: string }) => void
): ColumnDef<Course>[] => [
  {
    accessorKey: "id",
    header: "ID",
    maxSize: 60
  },
  {
    accessorKey: "name",
    header: "Nombre del Curso",
    maxSize: 250,
    cell: info => {
      const value = info.getValue() as string;
      return (
        <div 
          className="text-center whitespace-normal break-words" 
          title={value}
          style={{ minHeight: '2.5rem' }}
        >
          {value}
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Descripción</div>,
    maxSize: 300,
    cell: info => {
      const value = info.getValue() as string;
      return (
        <div 
          className="text-left whitespace-normal break-words line-clamp-3" 
          title={value}
          style={{ minHeight: '2.5rem' }}
        >
          {value}
        </div>
      );
    }
  },
  {
    id: "actions",
    header: "Acciones",
    maxSize: 100,
    cell: ({ row }) => <ActionsColumn row={row} openEditModal={openEditModal} />,
    enableSorting: false,
  }
];
