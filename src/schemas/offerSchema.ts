import dayjs from "dayjs";
import { z } from "zod";

export const offerSchema = z.object({
  plan_type: z.enum(["pay_as_you_go", "monthly", "yearly"], {
    required_error: "Plan type is required",
  }),
  additions: z
    .array(z.enum(["refundable", "on_demand", "negotiable"]))
    .default([]),
  user_id: z.string().min(1, "User is required"),
  expired: z.instanceof(dayjs as any, {
    message: "Expiry date is required",
  }),
  price: z.number({ required_error: "Price is required" }).positive(), // Changed to number
});
