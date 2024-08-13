"use server";

import db from "@/app/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
