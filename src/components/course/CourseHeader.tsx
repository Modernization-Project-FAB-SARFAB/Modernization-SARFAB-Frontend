import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function CourseHeader() {
    return (
        <div className="flex justify-between items-center mb-4">
            <nav>
                <Link to="/courses/create" className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
                    <RiAddLine className='me-2' /> Registrar curso
                </Link>
            </nav>
        </div>
    );
}
