import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('query') || '';


    if(!query){
        return NextResponse.json({ error: "Mising query" }, { status: 400 });
    }

    const results = await prisma.pin.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive',
            },
        },
        take: 10,
    })

    return NextResponse.json(results);
}