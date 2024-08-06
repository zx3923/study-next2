"use client";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Btn from "./components/btn";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  console.log(state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form action={action} className="flex flex-col gap-2">
          <input type="email" name="email" />
          <input type="text" name="username" />
          <input type="password" name="password" />
          {state?.status ? (
            <span>{state.message}</span>
          ) : (
            <span>{state?.message}</span>
          )}
          <Btn text="login" />
        </form>
      </div>
    </main>
  );
}
