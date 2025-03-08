import { useState } from "react";
import { RiAddLine } from "@remixicon/react";
import RegisterMilitaryModal from "./RegisterMilitaryModal";

export function MilitaryHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90"
            >
                <RiAddLine className="me-2" /> Añadir nuevo personal militar
            </button>
            {isModalOpen && <RegisterMilitaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </nav>
    );
}
