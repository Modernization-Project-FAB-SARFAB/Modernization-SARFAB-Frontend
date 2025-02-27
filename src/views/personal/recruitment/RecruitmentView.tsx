import { getRecruitment } from '@/api/RecruitmentAPI';
import Table from '@/components/common/Table/Table';
import { Recruit } from '@/types/index';
import { RiAddLine, RiCheckboxCircleFill, RiCloseCircleFill, RiEdit2Line} from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { recruitmentColumns as columns } from "@/constants/RecruitmentColumns";
import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';

function RecruitmentView() {

  const { data, isLoading } = useQuery({
    queryKey: ['recruitment'],
    queryFn: getRecruitment
  });

  const renderActions = (row: Recruit) => (
      <DropdownMenu
        items={[
          { type: "link", label: "Editar recluta", href: `/recruitment/${row.recruitmentId}/edit` , icon:<RiEdit2Line size={20} />},
          { type: "link", label: "Rechazar recluta", href: `` , icon:<RiCloseCircleFill size={20} />, ref:"text-danger"},
          { type: "link", label: "Aprobar recluta", href: ``, icon:<RiCheckboxCircleFill size={20} />, ref:"text-success" }
        ]}
      />
  );

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
          <Table columns={columns} data={data} renderActions={renderActions} />
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