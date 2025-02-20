import { offerSchema } from "@/schemas/offerSchema";
import { Control } from "react-hook-form";
import { z } from "zod";

type TPlanType = "monthly" | "yearly" | "pay_as_you_go";
type TAddition = "refundable" | "on_demand" | "negotiable";

export interface TCreateOffer {
  plan_type: TPlanType;
  additions: TAddition[];
  user_id: number;
  expired: string;
  price: number;
}

export type OfferFormData = z.infer<typeof offerSchema>;

export interface UserOption {
  label: string;
  value: string;
}

export interface UserAutocompleteProps {
  control: Control<OfferFormData>;
  label: string;
  errors?: any;
  setValue: any;
  getValues: any;
  clearErrors: any;
}

export interface OfferCommonProps {
  control: Control<OfferFormData>;
  label: string;
  errors?: any;
}
