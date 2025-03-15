import { Link } from "react-router-dom";

export function NoMedicalTreatmentsMessage() {
    return (
        <div className='h-fit'>
            <p className='text-center py-20'>
                No existen tratamientos. <Link to="/medical-treatments/create" className='text-primary font-bold'>Crear tratamiento</Link>
            </p>
        </div>
    );
}