"use client";

import { useFormState } from "react-dom";
import { handleForm } from "../actions";
import Btn from "../components/btn";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  console.log(state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form action={action} className="flex flex-col gap-2">
          <input type="email" name="email" />
          {state?.fieldErrors.email?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <input type="text" name="username" />
          {state?.fieldErrors.username?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <input type="password" name="password" />
          {state?.fieldErrors.password?.map((error, i) => (
            <span key={i}>{error}</span>
          ))}
          <Btn text="login" />
          {state === undefined ? <span>성공</span> : null}
        </form>
      </div>
    </main>
  );
}
