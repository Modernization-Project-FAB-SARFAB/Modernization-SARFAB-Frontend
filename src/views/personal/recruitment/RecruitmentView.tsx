import { RiAddLine } from '@remixicon/react'
import { Link } from 'react-router-dom'

function RecruitmentView() {
  return (
    <div>
      <Link
        to="/reclutamiento/create"
        className="inline-flex items-center justify-center 
                  rounded-md bg-primary py-2 px-10 text-center font-small text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <RiAddLine className='me-2'/>
        Añadir nuevo recluta
      </Link>
    </div>
  )
}

export default RecruitmentView;