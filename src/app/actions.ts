"use server";

export async function handleForm(prevState: any, formData: FormData) {
  // console.log(prevState);
  if (formData.get("password") === "12345") {
    return {
      message: "success",
      status: true,
    };
  } else {
    return {
      message: "password error",
      status: false,
    };
  }
}
