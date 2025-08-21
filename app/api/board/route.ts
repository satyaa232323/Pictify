import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const boards = await prisma.board.findMany({
            where: {
                userId: user.id
            }
        });

        return new Response(JSON.stringify(boards), { status: 200 });

    } catch (error) {
        console.error("Error fetching boards:", error);
        return new Response("Failed to fetch boards", { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const user = await currentUser();

        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const formData = await request.formData();

        const name = formData.get("name") as string;

        

        



        const postBoard = await prisma.board.create({
            data: {
                name,
                userId: user.id,
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
        return new Response(JSON.stringify(postBoard), { status: 201 });
    }
    catch (error) {
        console.error("Error creating board:", error);
        return new Response("Failed to create board", { status: 500 });
    }
}

