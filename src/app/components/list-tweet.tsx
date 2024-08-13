import Link from "next/link";
import { formatToTimeAgo } from "../lib/utils";

interface ListTweetProps {
  id: number;
  tweet: string;
  created_at: Date;
}

function ListTweet({ id, tweet, created_at }: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="gap-5 flex">
        <span>{id}.</span>
        <span className="text-red-500">{tweet}</span>
        <span className="text-gray-600">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
    </Link>
  );
}

export default ListTweet;
