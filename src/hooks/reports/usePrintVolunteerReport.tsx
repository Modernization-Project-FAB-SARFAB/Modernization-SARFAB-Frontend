import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import escudo from '@/assets/images/signIn/escudo.png';
import logo from '@/assets/images/signIn/logo.png';


export const usePrintVolunteerReport = (reportTitle: string, volunteerData: any, colunms: any[], data: any[]) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight()

    const escudoHeight = 30;
    const escudoAspect = 1110 / 750;
    const escudoWidth = escudoHeight * escudoAspect;

    doc.addImage(escudo, 'PNG', 10, 10, escudoWidth, escudoHeight);

    doc.addImage(logo, 'PNG', pageWidth - 40, 10, 30, 30);


    doc.setFont('helvetica', 'bold');

    const textLines = [
        'Fuerza Aérea Boliviana',
        'II Brigada Aérea',
        'Grupo De Búsqueda Y Rescate',
        'SAR-FAB',
        'Cochabamba - Bolivia'
    ];

    const centerX = pageWidth / 2;
    let currentY = 15;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');

    textLines.forEach(line => {
        doc.text(line, centerX, currentY, { align: 'center' });
        currentY += 6; // espacio entre líneas
    });

    currentY += 2;
    doc.setFontSize(13);
    doc.text(reportTitle.toUpperCase(), centerX, currentY, { align: 'center' });

    const columnas = ["Nombre", "Edad", "Ciudad"];
    const filas = [
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],
        ["María", "28", "Santa Cruz"],
        ["Ana", "23", "Cochabamba"],
        ["Luis", "30", "La Paz"],
        ["María", "28", "Santa Cruz"],

    ];
    autoTable(doc, {
        head: [columnas],
        body: filas,
        theme: 'grid',
        startY: 55,
        margin: { bottom: 40 },
        headStyles: {
            fillColor: [200, 200, 200], // Gris claro
            textColor: [0, 0, 0],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 10
        },
    });




    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.text('FIRMA, ENCARGADO DE\nGUARDIA', 60, pageHeight - 25, { align: 'center' });
        doc.text('FIRMA, COMANDANTE\nDEL GRUPO SAR FAB', pageWidth - 60, pageHeight - 25, { align: 'center' });
        doc.setPage(i);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - 40, pageHeight - 10);
    }

    doc.save("reporte.pdf");
};