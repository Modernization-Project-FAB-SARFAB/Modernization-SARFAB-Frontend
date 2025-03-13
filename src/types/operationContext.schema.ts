import { z } from 'zod';

// Lista de municipios
export const MunicipalitySchema = z.object({
  municipalityId: z.number(),
  name: z.string(),
});

// Lista de categorías
export const OperationCategorySchema = z.object({
  operationCategoryId: z.number(),
  name: z.string(),
});

// Contexto para filtros de operaciones
export const OperationContextSchema = z.object({
  municipalities: z.array(MunicipalitySchema),
  operationCategories: z.array(OperationCategorySchema),
});

// Tipos inferidos
export type OperationContext = z.infer<typeof OperationContextSchema>;