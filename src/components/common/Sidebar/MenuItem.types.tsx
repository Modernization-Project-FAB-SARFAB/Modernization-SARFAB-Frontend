interface MenuItem {
    label: string;
    path: string; // Si no tiene subItems, debe tener una ruta
    icon: JSX.Element;
    subItems?: SubItem[]; // Lista de submenús (opcional)
}