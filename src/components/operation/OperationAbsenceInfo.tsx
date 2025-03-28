import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateStatusPersonOperation } from '@/hooks/operation/mutations/useUpdateStatusPersonOperation';
import { useRegisterDemeritAndUpdateStatus } from '@/hooks/operation/mutations/useRegisterDemeritAndUpdateStatus';
import { AbsenceMarkResponse } from '@/types/operation.schema';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import BackLink from '../common/BackLink/BackLink';
import FormDate from '../common/FormDate/FormDate';
import FormInput from '../common/FormInput/FormInput';
import FormTextArea from '../common/FormTextArea/FormTextArea';
import Modal from '@/components/common/Modal/Modal';

export default function OperationAbsenceInfo({
  data,
  operationId,
}: {
  data: AbsenceMarkResponse;
  operationId: number;
}) {
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateStatusPersonOperation();
  const { mutate: registerDemerit, isPending: isRegistering } =
    useRegisterDemeritAndUpdateStatus();
  const queryClient = useQueryClient();

  const [selectedPerson, setSelectedPerson] = useState<{
    personId: number;
    status: number;
  } | null>(null);
  const [observation, setObservation] = useState('');

  const openModal = (personId: number, status: number) => {
    setSelectedPerson({ personId, status });
    if (status === 2) setObservation('');
  };
  useEffect(() => {
    if (selectedPerson?.status !== 2) setObservation('');
  }, [selectedPerson]);

  const confirmUpdate = async () => {
    if (!selectedPerson) return;
  
    if (selectedPerson.status === 1) {
      updateStatus(
        { operationId, personId: selectedPerson.personId, status: selectedPerson.status },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["operationAbsence", operationId] });
            setSelectedPerson(null);
          },
        }
      );
    } else if (selectedPerson.status === 2) {
      const requestData = {
        statusData: {
          operationId,
          personId: selectedPerson.personId,
          status: selectedPerson.status,
        },
        demeritData: {
          volunteerId: selectedPerson.personId,
          reason: `Operación: ${data.activity}`.slice(0, 50),
          date: data.departureDate.split("T")[0],
          observation: observation.trim() === "" ? "Ninguna" : observation,
        },
      };
  
      await registerDemerit(requestData, {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["operationAbsence", operationId] }),
            queryClient.invalidateQueries({ queryKey: ["demeritPoints"] }),
          ]);
          setTimeout(() => setSelectedPerson(null), 200);
        },
      });
    }
  };
  
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <BackLink
          text="Volver al listado de voluntarios activos"
          iconSize={20}
          link="/operation/list"
          className="mb-4 -ml-4"
        />
        <h2 className="text-lg font-semibold mb-4 ml-4 text-black dark:text-white">
          Datos generales de la operación
        </h2>
        <div className="flex flex-col sm:flex-row m-4 gap-4">
          <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-1 w-full">
            <FormInput
              label="Departamento"
              name="departmentName"
              type="text"
              readonly
              defaultValue={data.departmentName}
              className="bg-gray text-black dark:text-white text-center"
            />
            <FormInput
              label="Provincia"
              name="provinceName"
              type="text"
              readonly
              defaultValue={data.provinceName}
              className="bg-gray text-black dark:text-white text-center"
            />
            <div className="flex flex-col md:col-span-2">
              <FormInput
                label="Categoría y tipo de operación"
                name="activity"
                type="text"
                readonly
                defaultValue={data.activity}
                className="bg-gray text-black dark:text-white text-center"
              />
            </div>
          </article>
          <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-1 w-full">
            <FormInput
              label="Municipio"
              name="municipalityName"
              type="text"
              readonly
              defaultValue={data.municipalityName}
              className="bg-gray text-black dark:text-white text-center"
            />
            <FormDate
              label="Fecha de salida"
              name="departureDate"
              readonly
              defaultValue={data.departureDate?.split('T')[0]}
              className="bg-gray text-black dark:text-white text-center"
            />
            <div className="flex flex-col md:col-span-2">
            <FormDate
              label="Fecha de llegada"
              name="arrivalDate"
              readonly
              defaultValue={data.arrivalDate?.split('T')[0]}
              className="bg-gray text-black dark:text-white text-center"
              />
              </div>
          </article>
        </div>
      </div>

      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Control de asistencia
        </h2>
        <p className="mb-2">
          Lista de voluntarios que asistieron al operativo
        </p>
        <div className="overflow-x-auto mx-auto px-0 sm:px-4">
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Nombre completo
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
              {data.volunteers?.map((person) => (
                <tr
                  key={person.personId}
                  className="border border-stroke dark:border-strokedark"
                >
                  <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                    {person.fullName}
                  </td>
                  <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                    {person.rankOrGrade}
                  </td>
                  <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                    {person.status === 0 ? (
                      <div className="flex justify-center gap-2">
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => openModal(person.personId, 1)}
                        >
                          <RiCheckLine size={20} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openModal(person.personId, 2)}
                        >
                          <RiCloseLine size={20} />
                        </button>
                      </div>
                    ) : person.status === 1 ? (
                      <span className="text-green-600 font-semibold">
                        Asistió
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        No asistió
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPerson && (
        <Modal
        title={isUpdating || isRegistering ? "Procesando..." : "Confirmar acción"}
        isOpen={!!selectedPerson}
        onClose={() => !isUpdating && !isRegistering && setSelectedPerson(null)}
      >
        <p className="text-gray-600 mb-4">
          {selectedPerson?.status === 1
            ? "¿Estás seguro de que este voluntario asistió a la operación?"
            : "¿Estás seguro de que este voluntario NO asistió a la operación?"}
        </p>
      
        {selectedPerson?.status === 2 && (
          <FormTextArea
            label="Observaciones"
            placeholder="Ingrese observaciones..."
            name="observation"
            defaultValue={observation}
            className="mb-4"
            register={() => ({
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setObservation(e.target.value),
            })}
          />
        )}
      
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-500 px-4 py-2 rounded"
            onClick={() => setSelectedPerson(null)}
            disabled={isUpdating || isRegistering}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 px-4 py-2 rounded flex items-center gap-2"
            onClick={confirmUpdate}
            disabled={isUpdating || isRegistering}
          >
            {isUpdating || isRegistering ? (
              <>
                <span className="animate-spin border-t-2 border-white border-solid rounded-full w-4 h-4"></span>
                Guardando...
              </>
            ) : (
              "Confirmar"
            )}
          </button>
        </div>
      </Modal>
      
      )}
    </section>
  );
}
