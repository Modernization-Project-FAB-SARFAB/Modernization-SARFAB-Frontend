import { Link } from "react-router-dom";

export function NoOperationMessage() {
    return (
      <div className='h-fit'>
        <p className='text-center py-20'>
          No existen operaciones. <Link to="/operation/create" className='text-primary font-bold'>Crear operación</Link>
        </p>
      </div>
    );
  }