import axiosPrivate from "@/helper/axiosIntance";
import { Param } from "@/types";
import config from "config";

export const getAllUser = async (params: Param) => {
  try {
    const { data } = await axiosPrivate.get(config.BASE_API + `/users`, {
      params,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
