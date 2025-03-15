import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { useOperationForm } from '@/hooks/operation/forms/useOperationForm';
import { useCreateOperation } from '@/hooks/operation/mutations/useCreateOperation';
import { CreateOperationForm } from '@/types/operation.schema';
import { useState } from 'react';
import OperationDetailsForm from '@/components/operation/OperationDetailsForm';
import OperationPersonnelForm from '@/components/operation/OperationPersonnelForm';
import ButtonGroup from '@/components/common/ButtonGroup/ButtonGroup';

export default function CreateOperationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Registrar nueva operación' },
  ]);

  const initialValues: CreateOperationForm = {
    address: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    operationTypeId: 0,
    municipalityId: 0,
    requesterId: 0,
    responsible: {
      personId: 0,
      role: '',
    },
    personnel: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    operationContext,
    volunteers,
    military,
  } = useOperationForm(initialValues);
  const mutation = useCreateOperation();

  const handleForm = async (formData: CreateOperationForm) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error al registrar la operación:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Registrar nueva operación</h2>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col md:flex-row gap-6"
      >
        <div className="flex-1">
          <OperationDetailsForm
            register={register}
            control={control}
            errors={errors}
            operationContext={operationContext}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <OperationPersonnelForm
            errors={errors}
            setValue={setValue}
            military={military}
            volunteers={volunteers}
          />
          <div className="mt-4 flex justify-end">
            <ButtonGroup
              buttons={[
                {
                  type: 'button',
                  label: 'Registrar operativo',
                  onClick: handleSubmit(handleForm),
                  variant: 'primary',
                  disabled: isSubmitting,
                  isLoading: isSubmitting,
                },
                { type: 'link', label: 'Cancelar', to: '/operation/list' },
              ]}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
