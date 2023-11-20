import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "2글자 이상" }).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8, { message: "패스워드 8글자 이상" }).max(50),
});
