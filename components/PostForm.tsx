'use client';

import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import {
  CalendarDays,
  FileText,
  Hash,
  Image as ImageIcon,
  Loader2,
  Video,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import createPostAction from '@/actions/createPostAction';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MAX_CHARS = 500;
const MAX_IMAGE_MB = 5;
const HASHTAG_REGEX = /#[\w\u00C0-\u024F\u0900-\u097F]+/g;

export default function PostForm() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [postText, setPostText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const router = useRouter();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const remainingChars = MAX_CHARS - postText.length;
  const isOverLimit = remainingChars < 0;
  const canPost = postText.trim().length > 0 && !isOverLimit && !isPosting;

  const hashtags = useMemo(() => {
    const matches = postText.match(HASHTAG_REGEX) ?? [];
    return Array.from(new Set(matches));
  }, [postText]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_IMAGE_MB}MB`);
      e.target.value = '';
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    formRef.current?.reset();
    setPreview(null);
    setPostText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePostAction = async (formData: FormData) => {
    const text = (formData.get('postInput') as string)?.trim();
    if (!text) throw new Error('You must provide a post input');

    setIsPosting(true);
    try {
      await createPostAction(formData);
      resetForm();
      setOpen(false);
      router.push('/');
    } finally {
      setIsPosting(false);
    }
  };

  /* ---------------- LinkedIn-style compact card ---------------- */
  const CreatePostCard = () => (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Top row: avatar + "Start a post" */}
      <div className="p-3 pb-2">
        <SignedIn>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full flex items-center gap-2.5 group"
          >
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-left text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-full px-4 py-3 transition-colors">
              Start a post
            </span>
          </button>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button
              type="button"
              className="w-full flex items-center gap-2.5 group"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shrink-0" />
              <span className="flex-1 text-left text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-full px-4 py-3 transition-colors">
                Start a post
              </span>
            </button>
          </SignInButton>
        </SignedOut>
      </div>

      {/* Divider + action row */}
      <div className="border-t border-gray-100 mx-3" />
      <div className="flex items-center justify-around px-2 py-1.5">
        <ActionButton
          icon={<ImageIcon className="h-5 w-5 text-[#378fe9]" />}
          label="Photo"
          onClick={() => {
            setOpen(true);
            // slight delay so modal mounts before opening file picker
            setTimeout(() => fileInputRef.current?.click(), 150);
          }}
        />
        <ActionButton
          icon={<Video className="h-5 w-5 text-[#5f9b41]" />}
          label="Video"
          onClick={() => {
            setOpen(true);
            toast.info('Video upload coming soon');
          }}
        />
        <ActionButton
          icon={<CalendarDays className="h-5 w-5 text-[#c37d16]" />}
          label="Event"
          onClick={() => {
            setOpen(true);
            toast.info('Events coming soon');
          }}
        />
        <ActionButton
          icon={<FileText className="h-5 w-5 text-[#e16745]" />}
          label="Write article"
          onClick={() => setOpen(true)}
        />
      </div>
    </div>
  );

  return (
    <>
      <CreatePostCard />

      {/* Hidden file input lives at root so Photo button can trigger it */}
      <input
        ref={fileInputRef}
        type="file"
        name="image"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-2xl w-[95vw] sm:w-full rounded-xl overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">Create post</DialogTitle>

          {/* Header — LinkedIn style */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-11 w-11">
                <AvatarImage src={imageUrl} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                  {firstName?.charAt(0)}
                  {lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-gray-900 truncate">
                  {firstName} {lastName}
                </div>
                <Select defaultValue="anyone" disabled>
                  <SelectTrigger className="h-auto w-[90px] border-0 bg-transparent p-0 text-xs text-gray-500 hover:bg-transparent focus:ring-0 shadow-none">
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anyone">Anyone</SelectItem>
                    <SelectItem value="connections">Connections</SelectItem>
                    <SelectItem value="group">Group Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Body */}
          <form
            id="post-form"
            ref={formRef}
            action={formData => {
              const promise = handlePostAction(formData);
              toast.promise(promise, {
                loading: 'Creating post...',
                success: 'Post created',
                error: err => `Failed to create post: ${err.message}`,
              });
            }}
            className="flex flex-col max-h-[70vh] overflow-y-auto"
          >
            <div className="px-4 pt-4">
              <textarea
                name="postInput"
                value={postText}
                onChange={e => setPostText(e.target.value)}
                placeholder="What do you want to talk about?"
                rows={6}
                autoFocus
                className="w-full resize-none bg-transparent text-[15px] md:text-base text-gray-800 placeholder:text-gray-400 outline-none leading-relaxed"
              />
            </div>

            {/* Live hashtag chips */}
            {hashtags.length > 0 && (
              <div className="px-4 pb-3 flex flex-wrap items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                {hashtags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Image preview */}
            {preview && (
              <div className="px-4 pb-4">
                <div className="relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={800}
                    height={800}
                    unoptimized
                    className="w-full h-auto max-h-[400px] object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur"
                    onClick={clearImage}
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Attachment row (mimics LinkedIn's media options) */}
            <div className="px-4 pb-3 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-500 mr-2">
                Add to your post
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Add photo"
              >
                <ImageIcon className="h-5 w-5 text-[#378fe9]" />
              </button>
              <button
                type="button"
                onClick={() => toast.info('Video upload coming soon')}
                className="p-2 rounded-full hover:bg-green-50 transition-colors"
                aria-label="Add video"
              >
                <Video className="h-5 w-5 text-[#5f9b41]" />
              </button>
              <button
                type="button"
                onClick={() => toast.info('Events coming soon')}
                className="p-2 rounded-full hover:bg-orange-50 transition-colors"
                aria-label="Add event"
              >
                <CalendarDays className="h-5 w-5 text-[#c37d16]" />
              </button>
              <button
                type="button"
                onClick={() => toast.info('Article writing coming soon')}
                className="p-2 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Write article"
              >
                <FileText className="h-5 w-5 text-[#e16745]" />
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
              <span
                className={
                  isOverLimit
                    ? 'text-xs font-semibold text-red-500'
                    : remainingChars < 50
                      ? 'text-xs font-semibold text-amber-500'
                      : 'text-xs text-gray-400'
                }
              >
                {postText.length} / {MAX_CHARS}
              </span>
              <Button
                form="post-form"
                type="submit"
                disabled={!canPost}
                className="rounded-full px-5 h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isPosting ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    Posting
                  </>
                ) : (
                  'Post'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- Small helper component ---------------- */
function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
    >
      {icon}
      <span className="text-sm font-semibold text-gray-600 hidden sm:inline">
        {label}
      </span>
    </button>
  );
}
