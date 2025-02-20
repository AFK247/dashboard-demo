import axiosPrivate from "@/helper/axiosIntance";
import { Param } from "@/types/dashboard.types";
import { TCreateOffer } from "@/types/onboarding.types";
import config from "config";
import { toast } from "sonner";

export const getOfferList = async (params: Param) => {
  try {
    const { data } = await axiosPrivate.get(config.BASE_API + `/offers`, {
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOffer = async (payload: TCreateOffer) => {
  try {
    const { data } = await axiosPrivate.post(
      config.BASE_API + `/offers`,
      payload
    );
    if (data?.message == "Offer created successfully") {
      toast.success("Offer created successfully");
    }
    return data;
  } catch (error) {
    toast.error("Failed to create offer");
    console.log(error);
  }
};
