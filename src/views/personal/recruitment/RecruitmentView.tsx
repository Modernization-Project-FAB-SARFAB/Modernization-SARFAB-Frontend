import { getRecruitment } from '@/api/RecruitmentAPI';
import { RiAddLine } from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { Link, useOutletContext } from 'react-router-dom';
import { recruitmentColumnsDef } from "@/constants/RecruitmentColumnsDef";
import SortableTable from '@/components/common/SortableTable/SortableTable';
import { useEffect, useState } from 'react';
import FilterSearchBox from '@/components/common/FilterSearchBox/FilterSearchBox';
import FilterSelect from '@/components/common/FilterSelect/FilterSelect';
import { useDebounce } from 'use-debounce';
import Loader from '@/components/common/Loader';

function RecruitmentView() {
  const { setBreadcrumbItems } = useOutletContext<{ setBreadcrumbItems: Function }>();

  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [debouncedStatus] = useDebounce(statusFilter, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['recruitment', { searchTerm: debouncedSearch, status: debouncedStatus }],
    queryFn: () => getRecruitment({ searchTerm: debouncedSearch, status: debouncedStatus }),
    retry: 1
  });

  useEffect(() => {
    setBreadcrumbItems([
      { label: "Reclutamiento", path: "/recruitment/list" },
      { label: "Lista de reclutas pendientes" },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div>
      {/* Botón para añadir nuevo recluta */}
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
        <div className='w-full sm:w-1/3'>
          <FilterSelect
            name='status'
            label="Seleccionar por estado"
            options={[
              { value: '', label: 'Todos' },
              { value: '0', label: 'Recluta pendiente de revisión' },
              { value: '1', label: 'Recluta aprobado' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {isLoading ? (<Loader />)
        : data?.length ? (
          <SortableTable columns={recruitmentColumnsDef} data={data} />
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