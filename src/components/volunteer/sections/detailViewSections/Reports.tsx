import { RiFileUserFill, RiShakeHandsFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

interface ReportsProps {
    volunteerId: string;
}

const Reports: React.FC<ReportsProps> = ( {volunteerId} ) => {
    const navigate = useNavigate();
    
    return (
        <>
            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                Reportes
            </h3>
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto my-5">
                <button
                    className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2"
                    onClick={() => navigate(`/volunteers/${volunteerId}/report-guards`)}
                >
                    <RiFileUserFill size={20} />
                    Ver reporte de guardias
                </button>
                <button
                    className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2"
                    onClick={() => navigate(`/volunteers/${volunteerId}/report-operations`)}
                >
                    <RiShakeHandsFill size={20} />
                    Ver reporte de operaciones
                </button>
                <button
                    className="w-full bg-primary text-white py-3 rounded-lg"
                    onClick={() => navigate(`/volunteers/${volunteerId}/courses`)}
                >
                    Ver cursos
                </button>
            </div>
        </>
    );
};

export default Reports;