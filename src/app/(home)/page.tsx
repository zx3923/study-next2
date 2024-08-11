import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-5">
        <Link href="/log-in">로그인</Link>
        <Link href="/create-account">회원가입</Link>
      </div>
    </main>
  );
}
