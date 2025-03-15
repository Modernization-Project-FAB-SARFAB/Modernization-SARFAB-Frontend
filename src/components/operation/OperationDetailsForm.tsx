import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { OperationDetailsFormProps } from './types/OperationDetailsProps';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import FormInput from '@/components/common/FormInput/FormInput';
import FormDate from '@/components/common/FormDate/FormDate';
import FilterDatalist from '@/components/common/FilterDatalist/FilterDatalist';
import ErrorFormMessage from '../common/ErrorFormMessage/ErrorFormMessage';

export default function OperationDetailsForm({
  errors,
  register,
  control,
  operationContext,
}: OperationDetailsFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null,
  );

  const mappedOperationContext = operationContext
    ? {
        operationTypes: operationContext.operationTypes.map(
          ({ operationTypeId, name, operationCategoryId }) => ({
            id: operationTypeId,
            name,
            categoryId: operationCategoryId,
          }),
        ),
        operationCategories: operationContext.operationCategories.map(
          ({ operationCategoryId, name }) => ({
            id: operationCategoryId,
            name,
          }),
        ),
        departments: operationContext.departments.map(
          ({ departmentId, name }) => ({
            id: departmentId,
            name,
          }),
        ),
        provinces: operationContext.provinces.map(
          ({ provinceId, name, departmentId }) => ({
            id: provinceId,
            name,
            departmentId,
          }),
        ),
        municipalities: operationContext.municipalities.map(
          ({ municipalityId, name, provinceId }) => ({
            id: municipalityId,
            name,
            provinceId,
          }),
        ),
      }
    : null;

  const filteredOperationTypes =
    mappedOperationContext?.operationTypes.filter(
      (type) => type.categoryId === selectedCategoryId,
    ) || [];

  const filteredProvinces =
    mappedOperationContext?.provinces.filter(
      (province) => province.departmentId === selectedDepartmentId,
    ) || [];

  const filteredMunicipalities =
    mappedOperationContext?.municipalities.filter(
      (municipality) => municipality.provinceId === selectedProvinceId,
    ) || [];
  const handleSelection = (
    value: string,
    options: { id: number; name: string }[],
    setState: (id: number | null) => void,
  ) => {
    const selected = options.find((option) => option.name === value);
    setState(selected?.id || null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <Link
          to="/operation/list"
          className="flex items-center text-blue-600 hover:underline mb-4"
        >
          <AiOutlineArrowLeft className="w-5 h-5 mr-2" />
          Volver al listado de operaciones
        </Link>
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Datos de la operación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FilterDatalist
            name="operationCategoryId"
            label="Categoría"
            options={mappedOperationContext?.operationCategories || []}
            onChange={(value) =>
              handleSelection(
                value,
                mappedOperationContext?.operationCategories || [],
                setSelectedCategoryId,
              )
            }
            value={
              selectedCategoryId
                ? mappedOperationContext?.operationCategories.find(
                    (option) => option.id === selectedCategoryId,
                  )?.name || ''
                : ''
            }
          />

          <Controller
            name="operationTypeId"
            control={control}
            render={({ field }) => (
              <FilterDatalist
                {...field}
                label="Tipo de Operativo"
                options={filteredOperationTypes}
                onChange={(value) => {
                  const selected = filteredOperationTypes.find(
                    (option) => option.name === value,
                  );
                  field.onChange(selected?.id || '');
                }}
                value={
                  filteredOperationTypes.find(
                    (option) => option.id === field.value,
                  )?.name || ''
                }
                disabled={!selectedCategoryId}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FilterDatalist
            name="departmentId"
            label="Departamento"
            options={mappedOperationContext?.departments || []}
            onChange={(value) => {
              handleSelection(
                value,
                mappedOperationContext?.departments || [],
                setSelectedDepartmentId,
              );
              setSelectedProvinceId(null);
            }}
            value={
              selectedDepartmentId
                ? mappedOperationContext?.departments.find(
                    (option) => option.id === selectedDepartmentId,
                  )?.name || ''
                : ''
            }
          />

          <FilterDatalist
            name="provinceId"
            label="Provincia"
            options={filteredProvinces}
            onChange={(value) =>
              handleSelection(value, filteredProvinces, setSelectedProvinceId)
            }
            value={
              selectedProvinceId
                ? filteredProvinces.find(
                    (option) => option.id === selectedProvinceId,
                  )?.name || ''
                : ''
            }
            disabled={!selectedDepartmentId}
          />

          <Controller
            name="municipalityId"
            control={control}
            render={({ field }) => (
              <FilterDatalist
                {...field}
                label="Municipio"
                options={filteredMunicipalities}
                onChange={(value) => {
                  const selected = filteredMunicipalities.find(
                    (option) => option.name === value,
                  );
                  field.onChange(selected?.id || '');
                }}
                value={
                  filteredMunicipalities.find(
                    (option) => option.id === field.value,
                  )?.name || ''
                }
                disabled={!selectedProvinceId}
              />
            )}
          />
        </div>
        <FormInput
          name="address"
          label="Dirección"
          placeholder="Ingrese la dirección"
          register={register}
          errors={errors}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormDate
            name="departureDate"
            label="Fecha de salida"
            register={register}
            required
          />
          <FormDate
            name="arrivalDate"
            label="Fecha de llegada"
            register={register}
          />
        </div>
      </div>
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Datos del solicitante
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="requesterName"
            label="Solicitante"
            placeholder="Nombre del solicitante"
            register={register}
            errors={errors}
            required
          />
          {errors.requesterName && (
            <ErrorFormMessage>{errors.requesterName.message}</ErrorFormMessage>
          )}
          <FormInput
            name="requesterPhone"
            label="Teléfono"
            placeholder="Teléfono del solicitante"
            register={register}
            errors={errors}
          />
          <FormInput
            name="requesterMobile"
            label="Celular"
            placeholder="Celular del solicitante"
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
