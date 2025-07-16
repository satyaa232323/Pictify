import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST - Save a pin
export async function POST(request: Request) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { pinId } = await request.json();

        if (!pinId) {
            return NextResponse.json({ error: "Pin ID is required" }, { status: 400 });
        }

        // Cek apakah pin exist
        const pin = await prisma.pin.findUnique({
            where: { id: pinId }
        });

        if (!pin) {
            return NextResponse.json({ error: "Pin not found" }, { status: 404 });
        }

        // Cari atau buat user di database
        let dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id }
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    clerkId: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    name: user.username || user.firstName || "Anonymous",
                    image: user.imageUrl
                }
            });
        }

        // Cek apakah sudah di-save sebelumnya
        const existingSave = await prisma.save.findUnique({
            where: {
                userId_pinId: {
                    userId: dbUser.id,
                    pinId: pinId
                }
            }
        });

        if (existingSave) {
            return NextResponse.json({ error: "Pin already saved" }, { status: 409 });
        }

        // Save pin
        const save = await prisma.save.create({
            data: {
                userId: dbUser.id,
                pinId: pinId
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
                        }
                    }
                }
            }
        });

        return NextResponse.json(save, { status: 201 });
    } catch (error) {
        console.error("Error saving pin:", error);
        return NextResponse.json({ error: "Failed to save pin" }, { status: 500 });
    }
}

// GET - Get all saved pins for current user
export async function GET(request: Request) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id }
        });

        if (!dbUser) {
            return NextResponse.json([]);
        }

        const saves = await prisma.save.findMany({
            where: {
                userId: dbUser.id
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
            },
            orderBy: {
                savedAt: 'desc'
            }
        });

        return NextResponse.json(saves);
    } catch (error) {
        console.error("Error fetching saved pins:", error);
        return NextResponse.json({ error: "Failed to fetch saved pins" }, { status: 500 });
    }
}