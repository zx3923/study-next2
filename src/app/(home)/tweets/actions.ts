"use server";
import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { redirect } from "next/navigation";

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

const tweetSchema = z.object({
  photo: z.string(),
  tweet: z.string().trim().min(1, "tweet is required"),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    tweet: formData.get("tweet"),
  };

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    if (photoData.byteLength === 0) {
      return { fieldErrors: { photo: ["사진이 없습니다."], tweet: [""] } };
    } else if (photoData.byteLength > 5 * 1024 * 1024) {
      return { fieldErrors: { photo: ["5MB 이하로 해주세요."], tweet: [""] } };
    }
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }

  const result = await tweetSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
