"use client";
import { useState } from "react";
import { InitialTweets } from "../(home)/page";
import ListTweet from "./list-tweet";
import { getMoreTweets } from "../(home)/tweets/actions";

interface PagingTweetProps {
  initialTweets: InitialTweets;
}

function PagingTweet({ initialTweets }: PagingTweetProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const nextBtnClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page + 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      setTweets(newTweets);
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  const prevBtnClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page - 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev - 1);
      setTweets(newTweets);
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex gap-5  items-center">
      <button
        className={`px-4 py-2 font-semibold rounded h-10 ${
          isLoading || page === 0
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={prevBtnClick}
        disabled={isLoading || page === 0}
      >
        prev
      </button>
      <div>
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
      <button
        className={`px-4 py-2 font-semibold rounded h-10  ${
          isLoading || isLastPage
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={nextBtnClick}
        disabled={isLoading || isLastPage}
      >
        next
      </button>
    </div>
  );
}

export default PagingTweet;
