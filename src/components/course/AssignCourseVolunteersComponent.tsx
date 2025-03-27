import { CourseDetail } from "@/types/courses.schema";
import BackLink from "../common/BackLink/BackLink";
import FormInput from "../common/FormInput/FormInput";
import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import Button from "../common/Button/Button";
import { useGetVolunteersWithoutCourse } from "@/hooks/courseVolunteer/querys/useGetVolunteersWithoutCourse";
import { useState } from "react";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useAssignMultipleVolunteersToCourse } from "@/hooks/courseVolunteer/mutations/useAssignMultipleVolunteersToCourse";

interface SelectedVolunteer {
  volunteerId: number;
  fullName: string;
  rank: string;
}

export default function AssignCourseVolunteersComponent({ course }: { course: CourseDetail }) {
  const [selectedVolunteerName, setSelectedVolunteerName] = useState<string>("");
  const [addedVolunteers, setAddedVolunteers] = useState<SelectedVolunteer[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const navigate = useNavigate();
  
  const courseId = (course as any).courseId || course.id;
  
  const { data: volunteersWithoutCourse, isLoading } = useGetVolunteersWithoutCourse(courseId);
  const assignMutation = useAssignMultipleVolunteersToCourse();
  
  const volunteerOptions = volunteersWithoutCourse?.map(volunteer => ({
    id: volunteer.volunteerId.toString(),
    name: `${volunteer.abbreviation} - ${volunteer.lastName} ${volunteer.firstName}`
  })) || [];
  
  const filteredOptions = volunteerOptions.filter(option => 
    !addedVolunteers.some(v => v.volunteerId.toString() === option.id)
  );
  
  const handleVolunteerChange = (value: string) => {
    setSelectedVolunteerName(value);
  };
  
  const handleAddVolunteer = () => {
    if (selectedVolunteerName) {
      const selectedOption = volunteerOptions.find(
        option => option.name === selectedVolunteerName
      );
      
      if (selectedOption) {
        const volunteerId = selectedOption.id;
        
        const volunteerData = volunteersWithoutCourse?.find(
          volunteer => volunteer.volunteerId.toString() === volunteerId
        );
        
        if (volunteerData) {
          const isDuplicate = addedVolunteers.some(
            v => v.volunteerId === volunteerData.volunteerId
          );
          
          if (!isDuplicate) {
            const newVolunteer: SelectedVolunteer = {
              volunteerId: volunteerData.volunteerId,
              fullName: `${volunteerData.lastName} ${volunteerData.firstName}`,
              rank: volunteerData.abbreviation
            };
            
            setAddedVolunteers(prev => [...prev, newVolunteer]);
          }
        }
      }
      setSelectedVolunteerName("");
    }
  };
  
  const handleRemoveVolunteer = (volunteerId: number) => {
    setAddedVolunteers(prev => prev.filter(v => v.volunteerId !== volunteerId));
  };
  
  const handleAssign = () => {
    if (addedVolunteers.length === 0) return;
    
    setIsAssigning(true);
    
    // Preparar los datos para la mutación
    const assignmentData = {
      courseId: courseId,
      volunteers: addedVolunteers.map(volunteer => ({
        volunteerId: volunteer.volunteerId,
        completionDate: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      }))
    };
    
    // Ejecutar la mutación
    assignMutation.mutate(assignmentData, {
      onSuccess: () => {
        setIsAssigning(false);
        // Redirigir a la lista de cursos
        navigate('/courses/list');
      },
      onError: () => {
        setIsAssigning(false);
      }
    });
  };
  
  return (
    <section>
      <div className="flex flex-col gap-6">
        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <BackLink
            text="Regresar al listado de cursos"
            link="/courses/list"
          />
          <h2 className="text-lg font-semibold mb-4 mx-4 text-black dark:text-white">
            Datos generales del curso
          </h2>
          <div className="flex flex-col gap-4 mb-4 mx-4">
            <FormInput
              label="Nombre del curso"
              name="name"
              type="text"
              readonly
              defaultValue={course.name}
              className="bg-gray text-black dark:text-white text-center"
            />
            <div className="w-full">
              <label htmlFor="description" className="mb-2.5 block text-black dark:text-white">
                Descripción del curso
              </label>
              <div className="relative">
                <div 
                  className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 pr-10 font-medium outline-none dark:border-form-strokedark dark:bg-form-input text-black dark:text-white text-left whitespace-pre-wrap"
                >
                  {course.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4 mx-4 text-black dark:text-white">
            Seleccionar los voluntarios que realizarán el curso
          </h2>
          <div className="mb-4 mx-4">
            <div className="flex w-1/2">
              <div className="flex-1">
                <FilterDatalist
                  label="Seleccionar voluntario" 
                  name="volunteer" 
                  options={filteredOptions} 
                  onChange={handleVolunteerChange}
                  value={selectedVolunteerName}
                  showLabel={false}
                />
              </div>
              <div className="ml-4">
                <Button
                  label="Agregar voluntario"
                  type="button"
                  onClick={handleAddVolunteer}
                  disabled={isLoading || !selectedVolunteerName}
                />
              </div>
            </div>
          </div>
          
          <div className="mx-4 mt-4 border border-stroke dark:border-strokedark rounded-md">
            <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                  <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                    Nombre
                  </th>
                  <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                    Grado
                  </th>
                  <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {addedVolunteers.length > 0 ? (
                  addedVolunteers.map((volunteer) => (
                    <tr
                      key={volunteer.volunteerId}
                      className="border border-stroke dark:border-strokedark"
                    >
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {volunteer.fullName}
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {volunteer.rank}
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <button
                          onClick={() => handleRemoveVolunteer(volunteer.volunteerId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border border-stroke dark:border-strokedark">
                    <td
                      colSpan={3}
                      className="py-4 text-center text-gray-500 border border-stroke dark:border-strokedark"
                    >
                      Aún no se han agregado voluntarios al curso.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <ButtonGroup
            buttons={[
              {
                type: 'button',
                label: isAssigning ? 'Asignando...' : 'Asignar voluntarios',
                onClick: handleAssign,
                variant: 'primary',
                disabled: isAssigning || addedVolunteers.length === 0,
              },
              { type: 'link', label: 'Cancelar', to: '/courses/list' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
