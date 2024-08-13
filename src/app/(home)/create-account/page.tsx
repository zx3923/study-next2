"use client";

import Btn from "@/app/components/btn";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Link from "next/link";

function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <h1>회원가입</h1>
      <div>
        <form action={action} className="flex flex-col gap-2">
          <input type="email" name="email" placeholder="email" />
          {state?.fieldErrors.email?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <input type="text" name="username" placeholder="username" />
          {state?.fieldErrors.username?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <input type="password" name="password" placeholder="password" />
          {state?.fieldErrors.password?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <input
            type="password"
            name="confirm_password"
            placeholder="confirm password"
          />
          {state?.fieldErrors.confirm_password?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <Btn text="sign up" />
          {state === undefined ? <span>성공</span> : null}
        </form>
        <Link href="/log-in">로그인</Link>
      </div>
    </div>
  );
}

export default CreateAccount;
