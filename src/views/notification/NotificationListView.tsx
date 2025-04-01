import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
import { useAllNotifications } from '@/hooks/notification/querys/useAllNotifications';
import { useMarkNotificationAsRead } from '@/hooks/notification/mutations/useMarkNotificationAsRead';
import { useDeleteNotification } from '@/hooks/notification/mutations/useDeleteNotification';
import { Notification } from '@/types/notification.schema';
import { RiAlarmWarningFill, RiBellFill, RiCheckDoubleFill, RiErrorWarningFill, RiNotification2Line, RiDeleteBinLine, RiUserSearchLine } from '@remixicon/react';
import { useState } from 'react';
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { useNavigate } from 'react-router-dom';
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";

export default function NotificationListView() {
  const [filtro, setFiltro] = useState<'todas' | 'leidas' | 'no-leidas'>('todas');
  const [busqueda, setBusqueda] = useState("");
  const { data: notificaciones = [], isLoading: cargando } = useAllNotifications();
  const { mutate: marcarComoLeida } = useMarkNotificationAsRead();
  const { mutate: eliminarNotificacion, isPending: eliminando } = useDeleteNotification();
  const navigate = useNavigate();

  const breadcrumbItems = [
    {
      label: "Notificaciones",
      path: "/notifications"
    }
  ];
  useBreadcrumb(breadcrumbItems);

  const formatearFecha = (dateString: string) => {
    try {
      let anio, mes, dia, hora, minuto;
      
      if (dateString.includes('T')) {
        const [fechaParte, horaParte] = dateString.split('T');
        [anio, mes, dia] = fechaParte.split('-');
        [hora, minuto] = horaParte.split(':');
      } else if (dateString.includes(' ')) {
        const [fechaParte, horaParte] = dateString.split(' ');
        [anio, mes, dia] = fechaParte.split('-');
        [hora, minuto] = horaParte.split(':');
      } else {
        return dateString;
      }
      
      const horaNum = parseInt(hora, 10);
      
      let horaBolivia = horaNum - 4;
      
      if (horaBolivia < 0) {
        horaBolivia = 24 + horaBolivia;
      }
      
      const horaFormateada = horaBolivia.toString().padStart(2, '0');
      
      return `${dia}/${mes}/${anio} ${horaFormateada}:${minuto}`;
    } catch (error) {
      return dateString;
    }
  };

  const obtenerIcono = (tipo: string) => {
    const tipoEnMinusculas = tipo.toLowerCase();
    if (tipoEnMinusculas.includes('demérito') || tipoEnMinusculas.includes('demerit') || tipoEnMinusculas.includes('puntos')) {
      return <RiErrorWarningFill className="text-red-500" size={20} />;
    }
    else if (tipoEnMinusculas.includes('venc') || tipoEnMinusculas.includes('expired')) {
      return <RiAlarmWarningFill className="text-red-500" size={20} />;
    }
    else if (tipoEnMinusculas.includes('recordatorio') || tipoEnMinusculas.includes('chequeo') || tipoEnMinusculas.includes('médico')) {
      return <RiBellFill className="text-yellow-500" size={20} />;
    }
    return <RiNotification2Line className="text-primary" size={20} />;
  };

  const obtenerTextoTipo = (tipo: string) => {
    const tipoEnMinusculas = tipo.toLowerCase();
    if (tipoEnMinusculas.includes('demérito') || tipoEnMinusculas.includes('demerit') || tipoEnMinusculas.includes('puntos')) {
      return 'Límite de puntos perdidos';
    } 
    else if (tipoEnMinusculas.includes('venc') || tipoEnMinusculas.includes('expired') || 
            (tipoEnMinusculas.includes('médico') && tipoEnMinusculas.includes('venc'))) {
      return 'Chequeo médico vencido';
    }
    else if (tipoEnMinusculas.includes('recordatorio') || 
            (tipoEnMinusculas.includes('médico') && !tipoEnMinusculas.includes('venc'))) {
      return 'Recordatorio de chequeo médico';
    }
    else if (tipoEnMinusculas.includes('medical') && 
            (tipoEnMinusculas.includes('checkup') || tipoEnMinusculas.includes('check'))) {
      if (tipoEnMinusculas.includes('expired')) {
        return 'Chequeo médico vencido';
      } else {
        return 'Recordatorio de chequeo médico';
      }
    }
    return tipo;
  };

  const notificacionesFiltradas = notificaciones.filter((notificacion) => {
    const cumpleFiltroEstado = 
      filtro === 'todas' ? true : 
      filtro === 'leidas' ? notificacion.wasRead : 
      !notificacion.wasRead;
    
    const cumpleBusqueda = busqueda.trim() === '' || 
      notificacion.message.toLowerCase().includes(busqueda.toLowerCase()) ||
      obtenerTextoTipo(notificacion.type).toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltroEstado && cumpleBusqueda;
  });

  const manejarMarcarComoLeida = (id: number) => {
    marcarComoLeida(id);
  };

  const manejarEliminarNotificacion = (id: number) => {
    eliminarNotificacion(id);
  };

  const manejarMarcarTodasComoLeidas = () => {
    const noLeidas = notificacionesFiltradas.filter(n => !n.wasRead);
    if (noLeidas.length === 0) return;
    
    noLeidas.forEach(notificacion => {
      marcarComoLeida(notificacion.id);
    });
  };

  const filtroButtons = [
    {
      type: "button" as const,
      label: "Todas",
      onClick: () => setFiltro('todas'),
      variant: (filtro === 'todas' ? "primary" : "dark") as "primary" | "dark" | "secondary" | "danger" | "success" | "warning" | undefined,
    },
    {
      type: "button" as const,
      label: "No leídas",
      onClick: () => setFiltro('no-leidas'),
      variant: (filtro === 'no-leidas' ? "primary" : "dark") as "primary" | "dark" | "secondary" | "danger" | "success" | "warning" | undefined,
    },
    {
      type: "button" as const,
      label: "Leídas",
      onClick: () => setFiltro('leidas'),
      variant: (filtro === 'leidas' ? "primary" : "dark") as "primary" | "dark" | "secondary" | "danger" | "success" | "warning" | undefined,
    }
  ];

  return (
    <>
      <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-72 md:w-80">
          <FilterSearchBox
            name="buscar-notificaciones"
            placeholder="Buscar en notificaciones..."
            className="w-full"
            value={busqueda}
            onChange={(value: string) => setBusqueda(value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonGroup buttons={filtroButtons} />

          {notificacionesFiltradas.some(n => !n.wasRead) && (
            <button
              onClick={manejarMarcarTodasComoLeidas}
              className="flex items-center justify-center gap-1 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              <RiCheckDoubleFill size={16} />
              <span>Marcar todas como leídas</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {cargando ? (
          <div className="flex h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : notificacionesFiltradas.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center text-center p-4">
            <RiNotification2Line className="mb-2 text-gray-400 dark:text-gray-600" size={48} />
            <h5 className="mb-1 text-lg font-medium text-black dark:text-white">
              No hay notificaciones
            </h5>
            <p className="text-sm text-body">
              {filtro === 'todas'
                ? 'No tienes notificaciones en este momento'
                : filtro === 'leidas'
                ? 'No tienes notificaciones leídas'
                : 'No tienes notificaciones sin leer'}
            </p>
          </div>
        ) : (
          <div className="max-h-[calc(100vh-250px)] overflow-auto p-4">
            {notificacionesFiltradas.map((notificacion: Notification) => (
              <div
                key={notificacion.id}
                className={`mb-4 rounded-lg border p-4 transition-all hover:shadow-md ${
                  notificacion.wasRead
                    ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                    : 'border-primary bg-blue-50 dark:border-blue-900/20 dark:bg-boxdark'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {obtenerIcono(notificacion.type)}
                    <h5 className="font-medium text-black dark:text-white">
                      {obtenerTextoTipo(notificacion.type)}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notificacion.wasRead && (
                      <button
                        onClick={() => manejarMarcarComoLeida(notificacion.id)}
                        className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs text-white hover:bg-opacity-90"
                      >
                        <RiCheckDoubleFill size={14} />
                        <span>Marcar como leída</span>
                      </button>
                    )}
                    {notificacion.wasRead && (
                      <button
                        onClick={() => manejarEliminarNotificacion(notificacion.id)}
                        className="flex items-center gap-1 rounded-md bg-danger px-3 py-1 text-xs text-white hover:bg-opacity-90"
                        disabled={eliminando}
                      >
                        <RiDeleteBinLine size={14} />
                        <span>Eliminar</span>
                      </button>
                    )}
                    {notificacion.volunteerId > 0 && (
                      <button
                        onClick={() => navigate(`/volunteers/${notificacion.volunteerId}/view`)}
                        className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs text-white hover:bg-opacity-90"
                      >
                        <RiUserSearchLine size={14} />
                        <span>Ver voluntario</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-2 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {notificacion.message}
                  </p>
                </div>
                
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatearFecha(notificacion.sentAt)}
                  </span>
                  {notificacion.daysBeforeExpiration !== null && notificacion.daysBeforeExpiration !== undefined && (
                    <span className={`rounded-full px-2 py-1 ${
                      notificacion.daysBeforeExpiration <= 1
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                        : notificacion.daysBeforeExpiration <= 3
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      Expira en {notificacion.daysBeforeExpiration} {notificacion.daysBeforeExpiration === 1 ? 'día' : 'días'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
