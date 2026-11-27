import { z } from "zod";

export const pushNotificationPayloadSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("invoice"),
    receipt_uuid: z.string().min(1),
  }),
  z.object({
    type: z.literal("receipt"),
    receipt_uuid: z.string().min(1),
  }),
  z.object({
    type: z.literal("home"),
  }),
]);

export type PushNotificationPayload = z.infer<
  typeof pushNotificationPayloadSchema
>;
