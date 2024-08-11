import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}
async function Profile() {
  const user = await getUser();
  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <div>{user.id}</div>
      <div>이메일 : {user.email}</div>
      <div>아이디 : {user.username}</div>
    </div>
  );
}

export default Profile;
