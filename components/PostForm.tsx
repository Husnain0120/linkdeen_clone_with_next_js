"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import createPostAction from "@/actions/createPostAction";
import { toast } from "sonner";
// import ReloadPostsButton from "./ReloadPostsButton";

function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const handelImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handelPostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text.trim()) {
      throw new Error("Yout must provide a post input");
    }

    setPreview(null);

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={ref}
        action={(formData) => {
          //Handel form submition with server action
          const promise = handelPostAction(formData);

          //tost notification
          toast.promise(promise, {
            loading: "Createing Post",
            success: "Post created",
            error: "Failed to create post",
          });
        }}
        className="p-3 bg-white rounded-lg border"
      >
        <div className=" flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={imageUrl} />

            <AvatarFallback>
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handelImageChange}
          />
          <button type="submit" hidden>
            Post
          </button>
        </div>
        {/* Previwe conditional check */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="preview"
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex justify-end mt-2 space-x-2">
          {/* <ReloadPostsButton /> */}
          <Button
            type="button"
            variant={preview ? "secondary" : "outline"}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} Image
          </Button>

          {/* add a remove preview button  */}
          {preview && (
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>

      <hr className="mt-2 border-gray-300" />
    </div>
  );
}

export default PostForm;
