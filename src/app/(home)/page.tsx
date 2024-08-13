import Link from "next/link";
import getSession from "../lib/session";
import { redirect } from "next/navigation";
import db from "../lib/db";
import PagingTweet from "../components/paging-tweet";
import { Prisma } from "@prisma/client";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const initialTweets = await getTweets();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/log-in");
  };
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="flex gap-5">
        <Link href="/profile">프로필</Link>
        <form action={logOut}>
          <button>로그 아웃</button>
        </form>
      </div>
      <div>
        {/* {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))} */}
        <PagingTweet initialTweets={initialTweets} />
      </div>
    </main>
  );
}
