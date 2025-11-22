import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const content = await prisma.user.findMany({
            where: { clerkId: user.id },
            include: {
                pins: {
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
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        return NextResponse.json(content);
    } catch (error) {
        console.error("Error fetching content:", error);
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}

