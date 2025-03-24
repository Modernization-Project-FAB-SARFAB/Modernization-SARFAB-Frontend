import { z } from 'zod';

// **Schemas base**
const BaseItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
});

const BaseInventoryItemSchema = z.object({
  itemId: z.number(),
  name: z.string(),
});

const BaseMovementSchema = z.object({
  itemId: z.number(),
  quantity: z.number(),
});

// **Schemas específicos**
export const CreateItemSchema = BaseItemSchema;
export type CreateItemForm = z.infer<typeof CreateItemSchema>;

export const UpdateItemSchema = BaseItemSchema.partial();
export type UpdateItemForm = z.infer<typeof UpdateItemSchema>;

export const MovementDetailSchema = BaseMovementSchema;
export type MovementDetail = z.infer<typeof MovementDetailSchema>;

export const InventoryBatchMovementSchema = z.object({
  volunteerId: z.number(),
  items: z.array(MovementDetailSchema),
});
export type InventoryBatchMovementForm = z.infer<typeof InventoryBatchMovementSchema>;

export const InventoryMovementSchema = z.object({
  volunteerId: z.number(),
}).merge(BaseMovementSchema);
export type InventoryMovementForm = z.infer<typeof InventoryMovementSchema>;

export const InventoryItemSchema = BaseInventoryItemSchema.extend({
  totalStock: z.number(),
  assignedQuantity: z.number(),
  availableQuantity: z.number(),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const ListInventorySchema = z.object({
  data: z.array(InventoryItemSchema), 
  totalPages: z.number(),
});
export type ListInventoryResponse = z.infer<typeof ListInventorySchema>;

export const ItemSchema = BaseInventoryItemSchema.extend({
  quantity: z.number(),
});
export type Item = z.infer<typeof ItemSchema>;

export const VolunteerPendingReturnSchema = z.object({
  volunteerId: z.number(),
  volunteerWithGrade: z.string(),
  quantity: z.number(),
});
export type VolunteerPendingReturn = z.infer<typeof VolunteerPendingReturnSchema>;

export const VolunteerWithPendingSchema = VolunteerPendingReturnSchema.omit({
  quantity: true,
});
export type VolunteerWithPending = z.infer<typeof VolunteerWithPendingSchema>;
  

export const ItemWithPendingTableSchema = BaseInventoryItemSchema.extend({
  totalQuantity: z.number(),
  pendingReturns: z.array(VolunteerPendingReturnSchema),
});
export type ItemWithPendingTable = z.infer<typeof ItemWithPendingTableSchema>;

export const MovementHistorySchema = z.object({
  volunteerName: z.string(),
  itemName: z.string(),
  movementDate: z.string(),
  action: z.string(),
  quantity: z.number(),
});
export type MovementHistory = z.infer<typeof MovementHistorySchema>;

export const ListMovementHistorySchema = z.object({
  data: z.array(MovementHistorySchema),
  totalPages: z.number(),
});
export type ListMovementHistoryResponse = z.infer<typeof ListMovementHistorySchema>;
