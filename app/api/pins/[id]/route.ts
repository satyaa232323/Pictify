import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// get pins based [id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const pin = await prisma.pin.findUnique({
            where: { id: params.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                saves: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        });

        if (!pin) {
            return new Response(JSON.stringify({ error: "Pin not found" }), { status: 404 });
        }

        return NextResponse.json(pin);
    } catch (error) {
        console.error("Error fetching pin:", error);
        return NextResponse.json({ error: "Failed to fetch pin" }, { status: 500 });
    }
}

// put update pin
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, description } = await request.json();

        // cek kepemilikan pin
        const existingPin = await prisma.pin.findUnique({
            where: { id: params.id },
            include: { user: true }
        });

        if (!existingPin) {
            return NextResponse.json({ error: "Pin not found" }, { status: 404 });
        }

        if (existingPin.user.clerkId !== user.id) {
            return NextResponse.json({ error: "You are not authorized to update this pin" }, { status: 403 });
        }


        const updatedPin = await prisma.pin.update({
            where: { id: params.id },
            data: {
                title: title || existingPin.title,
                description: description || existingPin.description,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });

        return NextResponse.json(updatedPin);
    } catch (error) {
        console.error("Error updating pin:", error);
        return NextResponse.json({ error: "Failed to update pin" }, { status: 500 });
    }
}

// delete pin
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // cek kepemilikan pin
        const existingPin = await prisma.pin.findUnique({
            where: { id: params.id },
            include: { user: true }
        });

        if (!existingPin) {
            return NextResponse.json({ error: "Pin not found" }, { status: 404 });
        }

        if (existingPin.user.clerkId !== user.id) {
            return NextResponse.json({ error: "You are not authorized to delete this pin" }, { status: 403 });
        }

        await prisma.pin.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: "Pin deleted successfully" });
    } catch (error) {
        console.error("Error deleting pin:", error);
        return NextResponse.json({ error: "Failed to delete pin" }, { status: 500 });
    }
}