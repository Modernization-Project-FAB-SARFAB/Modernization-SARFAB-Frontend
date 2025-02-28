import { getRecruitment } from '@/api/RecruitmentAPI';
import { RiAddLine } from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { recruitmentColumnsDef } from "@/constants/RecruitmentColumnsDef";
import SortableTable from '@/components/common/SortableTable/SortableTable';

function RecruitmentView() {

  const { data, isLoading } = useQuery({
    queryKey: ['recruitment'],
    queryFn: getRecruitment
  });

  if (isLoading) return 'Cargando...'

  if (data) return (
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
      {
        data.length ? (
          <>
            <SortableTable columns={recruitmentColumnsDef} data={data}/>
          </>
        ) : (
          <p className='text-center py-20 '>No hay reclutas por el momento
            <Link to="/recruitment/create" className='text-primary font-bold'>Crear recluta</Link>
          </p>
        )
      }
    </div>
  )
}

export default RecruitmentView;