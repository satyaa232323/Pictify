import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// DELETE - Remove a saved pin
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Cari user di database
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id }
        });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Cek apakah save exist dan milik user
        const existingSave = await prisma.save.findFirst({
            where: {
                userId: dbUser.id,
                pinId: params.id
            }
        });

        if (!existingSave) {
            return NextResponse.json({ error: "Save not found" }, { status: 404 });
        }

        // Delete save
        await prisma.save.delete({
            where: {
                id: existingSave.id
            }
        });

        return NextResponse.json({ message: "Pin unsaved successfully" });
    } catch (error) {
        console.error("Error unsaving pin:", error);
        return NextResponse.json({ error: "Failed to unsave pin" }, { status: 500 });
    }
}

// GET - Get specific saved pin
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id }
        });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const save = await prisma.save.findFirst({
            where: {
                userId: dbUser.id,
                pinId: params.id
            },
            include: {
                pin: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        },
                        saves: true
                    }
                }
            }
        });

        if (!save) {
            return NextResponse.json({ error: "Save not found" }, { status: 404 });
        }

        return NextResponse.json(save);
    } catch (error) {
        console.error("Error fetching save:", error);
        return NextResponse.json({ error: "Failed to fetch save" }, { status: 500 });
    }
}