import { RiAddLine } from '@remixicon/react'
import { Link } from 'react-router-dom'

export default function ActiveVolunteersView() {
  return (
    <div>
      <Link
        to="/volunteers/create"
        className="inline-flex items-center justify-center 
                  rounded-md bg-primary py-2 px-10 text-center font-small text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <RiAddLine className='me-2'/>
        Añadir nueva afilicación
      </Link>
    </div>
  )
}