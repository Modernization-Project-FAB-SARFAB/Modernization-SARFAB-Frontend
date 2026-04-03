// Función para formatear fecha a dd/mm/yyyy
export const convertToLocalDate = (date: unknown): string => {
    if (!date) return "";

    if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    if (typeof date === "string") {
        const stringDate = date.split("T")[0];
        const [year, month, day] = stringDate.split("-");
        if (!year || !month || !day) return "";
        return `${day}/${month}/${year}`;
    }

    return "";
};

export const convertTodDataBaseFormatDate = (date: string) => {
    if (!date) return ""; // Retorna vacío si no hay fecha

    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`;
};