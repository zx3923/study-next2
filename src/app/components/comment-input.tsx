"use client";

import { useFormState } from "react-dom";
import { createComment } from "../(home)/tweets/[id]/actions";
import { Comments } from "../(home)/tweets/[id]/page";
import { useOptimistic } from "react";

interface CommentInputProps {
  tweeId: number;
  comments: Comments;
}

export default function CommentInput({ tweeId, comments }: CommentInputProps) {
  const [state, action] = useFormState(createComment, null);
  return (
    <>
      <form action={action}>
        <input type="text" name="comment" placeholder="comment" />
        <input type="hidden" name="tweeId" value={tweeId} />
      </form>
      {comments.length === 0 ? null : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div>{comment.user.username}</div>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
