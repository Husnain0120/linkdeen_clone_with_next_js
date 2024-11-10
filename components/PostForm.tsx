"use client";

import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ImageIcon, Undo2, X } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createPostAction from "@/actions/createPostAction";
import Link from "next/link";

export default function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [postText, setPostText] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostAction = async (formData: FormData) => {
    const text = formData.get("postInput") as string;

    if (!text.trim()) {
      throw new Error("You must provide a post input");
    }

    try {
      await createPostAction(formData);
      ref.current?.reset();
      setPreview(null);
      setPostText("");
      router.push("/");
    } catch (error) {
      console.error("Error creating post", error);
      throw error; // Re-throw the error to be caught by the toast
    }
  };

  return (
    <div className="rounded-lg bg-background md:p-4 px-2 pt-3">
      <form
        ref={ref}
        action={(formData) => {
          const promise = handlePostAction(formData);
          toast.promise(promise, {
            loading: "Creating post...",
            success: "Post created",
            error: (err) => `Failed to create post: ${err.message}`,
          });
        }}
        className="flex flex-col h-[calc(100vh-4rem)] md:h-auto md:space-y-4"
      >
        {/* Header with User Image, Undo, and Audience Select */}
        <div className="flex items-center justify-between gap-2">
          {/* Left side: Undo and User Image */}
          <div className="flex items-center gap-2">
            <Link href={"/"} className="pr-4">
              <Undo2 />
            </Link>

            <Avatar className="h-10 w-10">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <Select defaultValue="anyone" disabled>
              <SelectTrigger className="w-[100px] border-0 bg-transparent p-0 text-sm font-medium hover:bg-transparent focus:ring-0">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anyone">Anyone</SelectItem>
                <SelectItem value="connections">Connections</SelectItem>
                <SelectItem value="group">Group Members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right side: Post Button and Image Upload Icon */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10" // Adjust size of the icon button
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button
              type="submit"
              disabled={!postText.trim()}
              className="rounded-full  flex items-center justify-center bg-blue-700" // Same height and width as the image upload button
            >
              Post
            </Button>
          </div>
        </div>

        {/* Textarea and Image Preview */}
        <div className="flex-grow space-y-4 overflow-y-auto p-4 md:p-0">
          <textarea
            name="postInput"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px] w-full resize-none bg-transparent text-lg outline-none"
          />

          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setPreview(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Footer with Button Spacing */}
        <div className="flex items-center justify-between border-t p-4 md:pt-4 md:p-0">
          {/* Optional footer content can go here */}
        </div>
      </form>
    </div>
  );
}
