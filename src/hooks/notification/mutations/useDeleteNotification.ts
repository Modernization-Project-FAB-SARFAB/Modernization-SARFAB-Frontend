import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNotification } from '@/api/NotificationAPI';

/**
 * Hook personalizado para eliminar una notificación
 * @returns Objeto de mutación para eliminar notificación
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onSuccess: () => {
      // Invalidar consultas relacionadas para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
