import { RiAddLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import { recruitmentColumnsDef } from "@/constants/recruitment/RecruitmentColumnsDef";
import SortableTable from '@/components/common/SortableTable/SortableTable';
import FilterSearchBox from '@/components/common/FilterSearchBox/FilterSearchBox';
import FilterSelect from '@/components/common/FilterSelect/FilterSelect';
import Loader from '@/components/common/Loader';
import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { useRecruitment } from '@/hooks/recruitment/useRecruitment';

function RecruitmentView() {
  useBreadcrumb([{ label: "Reclutamiento", path: "/recruitment/list" }, { label: "Listado de reclutas pendientes" },]);

  const {
    data,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    statusFilter,
    setStatusFilter,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  } = useRecruitment({
    initialStatusFilter: '3'
  });

  const statusOptions = [
    { value: '0', label: 'Rechazado', isSelected: false },
    { value: '1', label: 'Pendiente de aprobación', isSelected: false },
    { value: '2', label: 'Apto - Pendiendte de registro de voluntario', isSelected: false },
    { value: '3', label: 'Apto - Registrado como voluntario', isSelected: true }
  ];

  return (
    <div>
      <nav>
        <Link
          to="/recruitment/create"
          className="inline-flex items-center justify-center 
                rounded-md bg-primary py-2 px-10 text-center font-small text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <RiAddLine className='me-2' />
          Añadir nuevo recluta
        </Link>
      </nav>

      {/* Filtros */}
      <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
        <div className='w-full'>
          <FilterSearchBox
            name='searchTerm'
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Buscar por nombre o carnet de identidad"
          />
        </div>
        <div className='w-full sm:w-1/2'>
          <FilterSelect
            name='status'
            label="Seleccionar por estado"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Tabla */}
      {isLoading ? (<Loader />)
        : data?.data.length ? (
          <SortableTable columns={recruitmentColumnsDef} data={data.data}
            pagination={{ pageIndex, pageSize }}
            totalPages={data.totalPages}
            onPaginationChange={({ pageIndex, pageSize }) => {
              setPageIndex(pageIndex);
              setPageSize(pageSize);
              refetch();
            }} />
        ) : (
          <div className='h-fit'>
            <p className='text-center py-20'>
              No hay reclutas por el momento.{' '}
              <Link to="/recruitment/create" className='text-primary font-bold'>Crear recluta</Link>
            </p>
          </div>
        )}
    </div>
  );
}

export default RecruitmentView;