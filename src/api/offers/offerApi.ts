import axiosPrivate from "@/helper/axiosIntance";
import { Param } from "@/types";
import config from "config";

export const getOfferList = async (params: Param) => {
  try {
    const { data } = await axiosPrivate.get(config.BASE_API + `/offers`, {
      params,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createOffer = async (params: Param) => {
  try {
    const { data } = await axiosPrivate.post(config.BASE_API + `/offers`, {
      params,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
