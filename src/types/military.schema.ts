import { z } from 'zod';

/** Base Schema */
const BaseMilitarySchema = z.object({
    id: z.number(),  
    firstName: z.string(),
    lastName: z.string(),
    cellphone: z.string().nullable(),
    militaryRankId: z.number(),
    status: z.number()
});

/** Create */
export const CreateMilitarySchema = BaseMilitarySchema.omit({ id: true });

/** Update */
export const UpdateMilitarySchema = BaseMilitarySchema.partial().omit({ id: true });

/** GET */
export const MilitarySchema = BaseMilitarySchema.extend({
    rankName: z.string()
}).omit({ militaryRankId: true });

/** List */
export const ListMilitarySchema = z.object({
    data: z.array(
        MilitarySchema.pick({
            id: true,
            firstName: true,
            lastName: true,
            cellphone: true,
            rankName: true,
            status: true
        })
    ),
    totalPages: z.number(),
});

export type Military = z.infer<typeof MilitarySchema>;
export type CreateMilitaryForm = z.infer<typeof CreateMilitarySchema>;
export type UpdateMilitaryForm = z.infer<typeof UpdateMilitarySchema>;
