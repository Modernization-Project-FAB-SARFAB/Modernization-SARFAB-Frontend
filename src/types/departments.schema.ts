import { z } from "zod";

export const DepartmentSchema = z.object({
  departmentId: z.number().int(), 
  name: z.string().min(1, "El nombre del departamento es obligatorio"),
});

export type Departments = z.infer<typeof DepartmentSchema>;

export const listDepartments = z.array(DepartmentSchema);
