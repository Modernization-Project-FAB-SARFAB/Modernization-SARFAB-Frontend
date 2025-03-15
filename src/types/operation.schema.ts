import { z } from 'zod';

export enum StatusEnum {
  Disabled = 0,
  Enabled = 1,
}

// Base Operation
const BaseOperationSchema = z.object({
  address: z.string().min(1, 'Este campo es requerido').max(50, 'El nombre no puede tener más de 50 caracteres'),
  departureDate: z.date(),
  arrivalDate: z.date().optional(),
})

export const OperationPersonSchema = z.object({
  personId: z.number(),
  role: z.string(),
})

export const OperationPersonnelSchema = z.object({
  personId: z.number(),
  fullName: z.string(),
  rankOrGrade: z.string(),
})

// Active Operation
export const ActiveOperationSchema = BaseOperationSchema.extend({
  operationId: z.number(),
  municipalityName: z.string(),
  requesterName: z.string(),
  categoryAndOperationType: z.string(),
  responsible: z.string(),
  status: z.nativeEnum(StatusEnum),
});

export type ActiveOperation = z.infer<typeof ActiveOperationSchema>;

export const ListOperationSchema = z.object({
  data: z.array(ActiveOperationSchema),
  totalPages: z.number(),
});

export type ListOperationResponse = z.infer<typeof ListOperationSchema>;

// Create Operation
export const CreateOperationSchema = BaseOperationSchema.extend({
  operationTypeId: z.number(),
  municipalityId: z.number(),
  requesterId: z.number(),
  responsible: OperationPersonSchema,
  personnel: z.array(OperationPersonSchema),
})

export type CreateOperationForm = z.infer<typeof CreateOperationSchema>;

// Update Operation
export const UpdateOperationSchema = CreateOperationSchema.extend({
  observations: z.string().optional(),
})

export type UpdateOperationForm = z.infer<typeof UpdateOperationSchema>;

// Update Operation Status
export const UpdateOperationStatusSchema = z.object({
  status: z.nativeEnum(StatusEnum),
  observations: z.string().optional(),
})

export type UpdateOperationStatusForm = z.infer<typeof UpdateOperationStatusSchema>;

// Operation Detail 
export const OperationDetailSchema = ActiveOperationSchema.omit({
  categoryAndOperationType: true, responsible: true, status: true
}).extend({
  operationTypeName: z.string(),
  categoryName: z.string(),
  departmentName: z.string(),
  provinceName: z.string(),
  observations: z.string().optional(),
  operationStatus: z.string(),
  requesterPhone: z.string(),
  requesterMobile: z.string(),
  responsible: OperationPersonnelSchema,
  personnel: z.array(OperationPersonnelSchema),
})

export type OperationDetailResponse = z.infer<typeof OperationDetailSchema>;

// Absence mark
export const AbsenceMarkSchema = BaseOperationSchema.omit({ address: true }).extend({
  activity: z.string(),
  departmentName: z.string(),
  municipalityName: z.string(),
  provinceName: z.string(),
  volunteers: z.array(OperationPersonnelSchema),
})

export type AbsenceMarkResponse = z.infer<typeof AbsenceMarkSchema>;
