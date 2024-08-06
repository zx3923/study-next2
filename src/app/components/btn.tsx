"use client";

import { useFormStatus } from "react-dom";

export default function Btn({ text }: any) {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "로딩중" : text}</button>;
}
