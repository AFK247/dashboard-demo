import { Param } from "@/types";
import axios from "axios";
import config from "config";

export const getOfferList = async (params: Param) => {
  try {
    const { data } = await axios.get(config.BASE_API + `/offers`, {
      params,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const createOffer = async (params: Param) => {
  try {
    const { data } = await axios.post(config.BASE_API + `/offers`, {
      params,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
