import { UserCredentials } from "@/types";
import axios from "axios";
import config from "config";

export const loginUser = async (credentials: UserCredentials) => {
  try {
    const { data } = await axios.post(config.BASE_API + `/login`, credentials);
    return data;
  } catch (error) {
    console.log(error);
  }
};
