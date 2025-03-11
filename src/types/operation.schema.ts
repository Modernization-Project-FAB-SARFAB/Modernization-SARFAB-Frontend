import { z } from 'zod';

export enum StatusEnum {
  Disabled = 0,
  Enabled = 1,
}

export const BaseOperationSchema = z.object({
  address: z.string().min(1, 'Este campo es requerido').max(50, 'El nombre no puede tener más de 50 caracteres'),
  departureDate: z.date(),
  arrivalDate: z.date().optional(),
})

export const ActiveOperationSchema = BaseOperationSchema.extend({
  operationId: z.number(),
  municipalityName: z.string(),
  requesterName: z.string(),
  categoryAndOperationType: z.string(),
  responsible: z.string(),
  status: z.nativeEnum(StatusEnum),
});

export const ListOperationSchema = z.object({
  data: z.array(ActiveOperationSchema),
  totalPages: z.number(),
});
