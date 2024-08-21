"use server";
import { z } from "zod";
import { formSchema } from "./registermodal";
import axios from "axios";

export const submitRegister = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await axios.post("/api/register", values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
