"use client";
import { useState } from "react";
import Btn from "./btn";
import { uploadTweet } from "../(home)/tweets/actions";
import { useFormState } from "react-dom";

function AddTweet() {
  const [preview, setPreview] = useState("");
  const [state, action] = useFormState(uploadTweet, null);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-white border-white rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <span className="text-neutral-400 text-sm">사진</span>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        {state?.fieldErrors.photo}
        <input type="text" name="tweet" placeholder="text here" />
        {state?.fieldErrors.tweet}
        <Btn text="작성 완료" />
      </form>
    </div>
  );
}

export default AddTweet;
