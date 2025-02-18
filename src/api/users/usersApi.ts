import { Param } from "@/types";
import axios from "axios";
import config from "config";

export const getAllUser = async (params: Param) => {
  try {
    const { data } = await axios.get(config.BASE_API + `/users`, {
      params,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
