import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const user = await currentUser();
    
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try{
        const dbUser = await prisma.user.findUnique({
            where: {clerkId: user.id},
        });

        if(!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const pins = await prisma.pin.findMany({
            where: { userId: dbUser.id },
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
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}