import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const pins = await prisma.pin.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                saves: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(pins); 
    }
    catch (error) {
        console.error("Error fetching pins:", error);
        return NextResponse.json({ error: "Failed to fetch pins" }, { status: 500 });
    }
}

// post new pin 

// export async function POST(request: Request) {
//     const user = await currentUser();
//     if (!user) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     try {
//         const { title, description, imageUrl } = await request.json();

//         // validasi input
//         if (!title || !imageUrl) {
//             return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//         }

//         // Cari atau buat user di database
//         let dbUser = await prisma.user.findUnique({
//             where: { clerkId: user.id }
//         });

//         if (!dbUser) {
//             dbUser = await prisma.user.create({
//                 data: {
//                     clerkId: user.id,
//                     email: user.emailAddresses[0].emailAddress,
//                     name: user.username || user.firstName || "Anonymous",
//                     image: user.imageUrl
//                 }
//             });
//         }

//         const newPin = await prisma.pin.create({
//             data: {
//                 title,
//                 description,
//                 imageUrl,
//                 userId: dbUser.id
//             },
//             include: {
//                 user: {
//                     select: {
//                         id: true,
//                         name: true,
//                         image: true
//                     }
//                 }
//             }
//         });

//         return NextResponse.json(newPin, { status: 201 });
//     } catch (error) {
//         console.error("Error creating pin:", error);
//         return NextResponse.json({ error: "Failed to create pin" }, { status: 500 });
//     }
// }