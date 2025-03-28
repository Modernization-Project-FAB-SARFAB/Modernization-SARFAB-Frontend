import { z } from "zod";

const checkupSchema = z.object({
  checkupId: z.number(),
  checkupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (Formato YYYY-MM-DD)"),
  expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (Formato YYYY-MM-DD)"),
  observations: z.string(),
});

export type MedicalCheckup = z.infer<typeof checkupSchema>;

export const checkupListSchema = z.array(checkupSchema);
