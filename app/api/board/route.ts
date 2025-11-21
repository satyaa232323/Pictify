import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";



function safeGet(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}


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
        const pinId = formData.get("pinId") as string;
        const boardId = formData.get("boardId") as string;

        if(!name){
            return new Response("Name is required", { status: 400 });
        }


        if (!pinId || !boardId) {
            return new Response("Pin ID and Board ID are required", { status: 400 });
        }

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

        const uploadedBoard = postBoard.id;

    }
    catch (error) {
        console.error("Error creating board:", error);
        return new Response("Failed to create board", { status: 500 });
    }
}

