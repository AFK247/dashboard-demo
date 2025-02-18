import axiosPrivate from "@/helper/axiosIntance";
import { Param } from "@/types";
import config from "config";

export const getDashboardSummary = async (params?: Param) => {
  try {
    const { data } = await axiosPrivate.get(
      config.BASE_API + `/dashboard/summary`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardStats = async (params?: Param) => {
  try {
    const { data } = await axiosPrivate.get(
      config.BASE_API + `/dashboard/stat`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
