"use client";

import { useOptimistic } from "react";
import { dislikePost, likePost } from "../(home)/tweets/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(tweetId);
    } else {
      await likePost(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
        state.isLiked
          ? "bg-red-500 text-white border-red-500"
          : "hover:bg-neutral-800"
      }`}
    >
      <span>좋아요 ({state.likeCount})</span>
    </button>
  );
}
