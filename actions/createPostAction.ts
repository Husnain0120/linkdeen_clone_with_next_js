"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { containerName, generateSASToken } from "@/lib/generateSASToken";
import { Post } from "@/mongodb/models/post.models";
import { IUser } from "@/types/user.type";
import { BlobServiceClient } from "@azure/storage-blob";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not Authenticated");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;

  let image_Url: string | undefined;

  if (!postInput) {
    return;
  }

  // Define user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    if (image && image.size > 0) {
      // 1. Upload image if there is one
      console.log("Uploading image to Azure Blob Storage...", image);

      const accountName = process.env.AZURE_STORAGE_NAME;
      const sasToken = await generateSASToken(); // Get the SAS token

      if (!sasToken) {
        throw new Error("Failed to generate SAS token");
      }

      // BlobServiceClient with SAS token appended to the URL
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );

      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      const timestamp = new Date().getTime();
      const file_name = `${randomUUID()}_${timestamp}.png`;

      const blockBlobClient = containerClient.getBlockBlobClient(file_name);

      const imageBuffer = await image.arrayBuffer();

      // Upload the image to Azure Blob Storage with the correct content type
      const res = await blockBlobClient.uploadData(imageBuffer, {
        blobHTTPHeaders: {
          blobContentType: image.type, // Set the correct MIME type
        },
      });

      // The URL of the uploaded image
      image_Url = res._response.request.url;

      console.log("File uploaded successfully!", image_Url);

      // 2. Create post in the database with the image
      const body: AddPostRequestBody = {
        text: postInput,
        imageUrl: image_Url, // Use the uploaded image URL
        user: userDB,
      };
      await Post.create(body);
    } else {
      // 1. Create post in the database without an image
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };
      await Post.create(body);
    }
  } catch (error) {
    console.error("Failed to create post", error); // Log the error for debugging
    throw new Error("Failed to create Post"); // Generic error for the user
  }

  // Revalidate data path if needed
  // revalidatedatapath("/");
  revalidatePath("/");
}
