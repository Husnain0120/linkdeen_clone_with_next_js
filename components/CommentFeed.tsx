'use client';

import { IPostDocument } from '@/mongodb/models/post.models';
import ReactTimeago from 'react-timeago';
import VerifiedBadge from './instagram-verified-badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const CommentFeed = ({ post }: { post: IPostDocument }) => {
  return (
    <div className="divide-y divide-gray-100">
      {post.comments?.map(comment => {
        const isPostAuthor = comment.user.userId === post.user.userId;
        const fullName = [comment.user.firstName, comment.user.lastName]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={String(comment._id)} className="flex gap-2 py-3 first:pt-0">
            {/* Avatar */}
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={comment.user.userImage} />
              <AvatarFallback className="text-xs">
                {comment.user.firstName?.charAt(0)}
                {comment.user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Name row */}
              <div className="flex items-center flex-wrap gap-x-1 gap-y-0">
                <span className="text-sm font-semibold text-gray-900">
                  {fullName}
                </span>
                <VerifiedBadge size={12} className="shrink-0" />
                {isPostAuthor && (
                  <span className="text-[10px] font-medium text-gray-600 bg-gray-100 rounded px-1.5 py-0.5 ml-1">
                    Author
                  </span>
                )}
              </div>

              {/* Handle */}
              <p className="text-xs text-gray-500 truncate">
                @{comment.user.firstName}
                {comment.user.lastName}-
                {comment.user.userId.toString().slice(-4)}
              </p>

              {/* Comment text */}
              <p className="mt-1 text-sm text-gray-800 break-words whitespace-pre-line">
                {comment.text.charAt(0).toUpperCase() + comment.text.slice(1)}
              </p>

              {/* Actions row */}
              <div className="flex items-center gap-3 mt-1.5">
                <button className="text-xs font-semibold text-gray-500 hover:text-gray-800 hover:underline transition-colors">
                  Like
                </button>
                <button className="text-xs font-semibold text-gray-500 hover:text-gray-800 hover:underline transition-colors">
                  Reply
                </button>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">
                  <ReactTimeago date={new Date(comment.createdAt)} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentFeed;
