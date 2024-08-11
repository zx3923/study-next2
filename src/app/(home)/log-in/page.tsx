"use client";

import Btn from "@/app/components/btn";
import Link from "next/link";
import { useFormState } from "react-dom";
import { logIn } from "./actions";

function LogIn() {
  const [state, action] = useFormState(logIn, null);
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center  p-24">
        <form action={action} className="flex flex-col gap-2">
          <input type="email" name="email" placeholder="email" />
          {state?.fieldErrors.email?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <input type="password" name="password" placeholder="password" />
          {state?.fieldErrors.password?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <Btn text="login" />
          {state === undefined ? <span>성공</span> : null}
        </form>
        <Link href="/create-account">회원가입</Link>
      </div>
    </div>
  );
}

export default LogIn;
