import axiosPrivate from "@/helper/axiosIntance";
import { Param } from "@/types";
import config from "config";

export const getStats = async (params: Param) => {
  try {
    const { data } = await axiosPrivate.get(
      config.BASE_API + `/dashboard/stats`,
      {
        params,
      }
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getSummary = async (params: Param) => {
  try {
    const { data } = await axiosPrivate.get(
      config.BASE_API + `/dashboard/summary`,
      {
        params,
      }
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
