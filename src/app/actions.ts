"use server";
import { z } from "zod";

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/);

const passwordRegex = new RegExp(/1/);

const formSchema = z.object({
  email: z.string().email().regex(emailRegex, "이메일은 zod.com"),
  username: z.string().min(5, "5글자 이상"),
  password: z.string().min(10, "10글자 이상").regex(passwordRegex, "1필수"),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  console.log(result.error?.flatten());
  if (!result.success) {
    return result.error.flatten();
  }
}
