// import connectDB from "@/mongodb/db";
// import { error } from "console";
// import { NextResponse } from "next/server";

// // get function is used to get all follower of a user
// export async function GET(request:Request) {
//     const {searchParams} = new URL(request.url);
//     const user_id = searchParams.get("user_id");

//     try {
//         await connectDB();

//         if (!user_id) {
//             return NextResponse.json(
//                 {error:"User ID not Provided"},{status:400}
//             )
//         }

//         const followers = await Followers.getAllFollowers(user_id);

//         if (!followers) {
//             return NextResponse.json({error:"user not found"},{status:404})
//         }

//         return NextResponse.json(followers)
//     } catch (error) {
//         return NextResponse.json(
//             {error:"An error occurred while fetching follower"},{status:500}
//         )
//     }
// }

// export interface FollowerRequestBody{
//     followerUserId:string;
//     followingUserId:string;
// }

// // Post function is used to add a follower to a user
// export async function POST(request:Request) {
//     const {followerUserId,followingUserId}:FollowerRequestBody = await request.json();

//     try {
//         await connectDB();
//         const follow = await Followers.(followfollowerUserId,followingUserId);

//         if (!follow) {
//             return NextResponse.json(
//                 {error:"Folow action faild"}
//                 {status:404}
//             )
//         }
//     } catch (error) {

//     }
// }
