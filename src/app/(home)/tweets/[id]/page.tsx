import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import LikeButton from "@/app/components/like-btn";
import { Prisma } from "@prisma/client";
import CommentInput from "@/app/components/comment-input";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return tweet;
}

async function getComment(id: number) {
  const comment = await db.comment.findMany({
    where: {
      tweetId: id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return comment;
}

async function getCachedLikeStatus(tweeId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ["like-status"], {
    tags: [`like-status-${tweeId}`],
  });
  return cachedOperation(tweeId, userId!);
}

async function getLikeStatus(tweetId: number, userId: number) {
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export type Comments = Prisma.PromiseReturnType<typeof getComment>;

async function TweetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  const comments = await getComment(id);
  if (!tweet) {
    return notFound();
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="min-h-screen p-24">
      <div className="flex flex-col justify-center items-center gap-5">
        <span className="flex justify-center">
          {tweet?.id}. {tweet?.tweet}
        </span>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweeId={id} />
        <CommentInput tweeId={id} comments={comments} />
      </div>
    </div>
  );
}

export default TweetDetail;
