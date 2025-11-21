import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();


    const pinId = formData.get("pinId") as string;
    const boardId = formData.get("boardId") as string;



    if (!pinId || !boardId) {
        return new Response("Pin ID and Board ID are required", { status: 400 });
    }


    const board = await prisma.board.findUnique({
        where: {
            id: boardId,
        }
    })



    if (!board || board.userId !== user.id) {
        return new Response("Forbidden: You don't own this board", { status: 403 });
    }


    const pin = await prisma.pin.findUnique({
        where: { id: pinId },
    });

    if (!pin) {
        return new Response("Pin not found", { status: 404 });
    }


    try {
        const postPinBoard = await prisma.boardPin.create({
            data: {
                boardId,
                pinId,
            }
        });

        return new Response(JSON.stringify(postPinBoard), { status: 200 });


    } catch (error: unknown) {
          // Type guard for Prisma error
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return new Response("Pin is already added to this board", { status: 409 });
        }
        console.error("Error adding pin to board:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}