"use server";

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export async function likePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislikePost(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

const formSchema = z.object({
  comment: z.string().min(1, "1글자 이상").max(100, "100글자 이하"),
  tweetId: z.number(),
});

export async function createComment(_: any, formData: FormData) {
  const session = await getSession();
  const data = {
    comment: formData.get("comment"),
    tweetId: Number(formData.get("tweetId")),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const comment = await db.comment.create({
      data: {
        body: result.data.comment,
        tweetId: result.data.tweetId,
        userId: session.id!,
      },
    });
    revalidatePath(`/tweets/${result.data.tweetId}`);
  }
}
