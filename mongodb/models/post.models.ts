import { IUser } from "@/types/user.type";
import mongoose, { Schema, model, models, Document, Model } from "mongoose";
import { Comment, IComment, ICommentBase } from "./comment.models";

// Post base interface, defining essential fields for a post
export interface IpostBase {
  user: IUser; // The user who created the post
  text: string; // Post content
  imageUrl?: string; // Optional image URL attached to the post
  comments?: IComment[]; // Array of comments on the post
  likes?: string; // Array of users who liked the post
}

// Interface for a full Post document, extending the base interface
export interface IPost extends IpostBase, Document {
  _id: mongoose.Types.ObjectId | string;
  createdAt: Date; // Automatically generated timestamp when the post is created
  updatedAt: Date; // Automatically generated timestamp when the post is updated
}

// Interface defining methods that will be available for individual Post documents
interface IPostMethods {
  likePost(userId: string): Promise<void>; // Method to like a post
  unlikePost(userId: string): Promise<void>; // Method to unlike a post
  commentOnPost(comment: ICommentBase): Promise<void>; // Method to comment on a post
  getAllComments(): Promise<IComment[]>; // Method to fetch all comments of a post
  removePost(): Promise<void>; // Method to delete a post
}

// Interface defining static methods for the Post model
interface IPostStatics {
  getAllPost(): Promise<IPostDocument[]>; // Static method to get all posts
}

// Full interface for the Post document, combining fields, methods, and statics
export interface IPostDocument extends IPost, IPostMethods {}

// Interface for the Post model, combining static methods and the document type
interface IPostModel extends IPostStatics, Model<IPostDocument> {}

// Mongoose schema for a Post document
const postSchema = new Schema<IPostDocument>(
  {
    user: {
      userId: { type: String, required: true }, // ID of the user who created the post
      userImage: { type: String, required: true }, // Profile image of the user
      firstName: { type: String, required: true }, // First name of the user
      lastName: { type: String }, // Last name of the user
    },

    text: { type: String, required: true }, // Content of the post
    imageUrl: { type: String }, // Optional image attached to the post
    comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] }, // Array of comments (references to Comment model)
    likes: { type: [String] }, // Array of user IDs who liked the post
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

// Method to like a post
postSchema.methods.likePost = async function (userId: string) {
  try {
    // Adds the userId to the likes array (without duplicates)
    await this.updateOne({ $addToSet: { likes: userId } });
  } catch (error) {
    console.log("Failed to like post", error);
  }
};

// Method to unlike a post
postSchema.methods.unlikePost = async function (userId: string) {
  try {
    // Removes the userId from the likes array
    await this.updateOne({ $pull: { likes: userId } });
  } catch (error) {
    console.log("Failed to unlike post", error);
  }
};

// Method to delete the post
postSchema.methods.removePost = async function () {
  try {
    // Deletes the post document from the collection
    await this.model("Post").deleteOne({ _id: this._id });
  } catch (error) {
    console.log("Failed to remove post", error);
  }
};

// Method to add a comment to the post
postSchema.methods.commentOnPost = async function (commentToAdd: ICommentBase) {
  try {
    // Creates a new comment document and pushes its ID to the post's comments array
    const comment = await Comment.create(commentToAdd);
    this.comments.push(comment._id); // Adding the comment ID to the post
    await this.save(); // Saving the updated post with the new comment
  } catch (error) {
    console.log("Error commenting on post", error);
  }
};

// Method to get all comments for a post
postSchema.methods.getAllComments = async function () {
  try {
    // Populates the comments field with the actual comment documents and sorts them by creation date (newest first)
    await this.populate({
      path: "comments",
      option: { sort: { createdAt: -1 } }, // Sorting comments by newest first
    });

    return this.comments; // Returns the populated comments
  } catch (error) {
    console.log("Error when getting all comments", error);
  }
};

// Static method to get all posts with their comments, sorted by creation date (newest first)
postSchema.statics.getAllPost = async function () {
  try {
    // Perform the query to find all posts and sort them by creation date (newest first)
    const posts = await this.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments", // Populating the comments for each post
        options: { sort: { createdAt: -1 } }, // Sorting comments by newest first
      })
      .lean(); // Use lean for faster read-only operations (returns plain JS objects)

    // Map over the posts to ensure that the `_id` and comments' `_id` fields are converted to strings
    return posts.map(
      (
        post: { _id: mongoose.Types.ObjectId; comments: IComment[] } & Omit<
          IPost,
          "_id"
        >
      ) => ({
        ...post,
        _id: post._id.toString(), // Converting the post _id to string
        comments: post.comments?.map((comment) => ({
          ...comment,
          _id: (comment._id as mongoose.Types.ObjectId).toString(), // Converting each comment's _id to string
        })),
      })
    );
  } catch (error) {
    console.log("Error when getting all posts", error);
  }
};

export const Post =
  (models.Post as IPostModel) ||
  mongoose.model<IPostDocument, IPostModel>("Post", postSchema);
