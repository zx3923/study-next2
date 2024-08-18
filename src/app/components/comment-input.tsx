"use client";

import { useFormState } from "react-dom";
import { createComment } from "../(home)/tweets/[id]/actions";
import { Comments } from "../(home)/tweets/[id]/page";
import { useOptimistic, useRef } from "react";

interface CommentInputProps {
  tweetId: number;
  comments: Comments;
  session: { id: number; username: string };
}

export default function CommentInput({
  tweetId,
  comments: initialComments,
  session,
}: CommentInputProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(createComment, null);
  const [comments, addOptimisticComment] = useOptimistic(
    initialComments,
    (prevComments, newComment: string) => {
      return [
        {
          id: Date.now(),
          user: { username: session.username },
          body: newComment,
          created_at: new Date(),
          updated_at: new Date(),
          userId: session.id,
          tweetId,
        },
        ...prevComments,
      ];
    }
  );
  async function handleSubmit(formData: FormData) {
    const commentText = formData.get("comment") as string;
    addOptimisticComment(commentText);
    if (formRef.current) {
      formRef.current.reset();
    }

    try {
      await action(formData);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <form action={handleSubmit} ref={formRef}>
        <input type="text" name="comment" placeholder="comment" />
        <input type="hidden" name="tweetId" value={tweetId} />
        <button type="submit">Add Comment</button>
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
