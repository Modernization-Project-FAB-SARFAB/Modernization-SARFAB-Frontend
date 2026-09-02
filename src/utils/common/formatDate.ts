// Función para formatear fecha a dd/mm/yyyy
export const convertToLocalDate = (date: unknown): string => {
    if (!date) return "";

    if (date instanceof Date) {
        if (isNaN(date.getTime())) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    if (typeof date === "string") {
        const trimmed = date.trim();
        // Si ya está en formato dd/mm/yyyy
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
            return trimmed;
        }

        const stringDate = trimmed.split("T")[0];
        const [year, month, day] = stringDate.split("-");
        if (!year || !month || !day) return "";
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }

    return "";
};

export const convertTodDataBaseFormatDate = (date: string) => {
    if (!date) return ""; // Retorna vacío si no hay fecha

    const trimmed = date.trim();
    // Si ya está en formato yyyy-mm-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed;
    }

    // Si viene en formato dd/mm/yyyy
    if (trimmed.includes('/')) {
        const [day, month, year] = trimmed.split('/');
        if (day && month && year) {
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }

    return trimmed;
};