
import { PrismaClient } from '@prisma/client';
import { DummyData } from '../app/data/DummyData';

const prisma = new PrismaClient();

async function main() {
    // Ambil user pertama dari database
    const user = await prisma.user.findFirst();
    if (!user) {
        throw new Error('No user found. Please seed user first.');
    }
    for (const item of DummyData) {
        await prisma.pin.upsert({
            where: { id: item.id.toString() },
            update: {},
            create: {
                id: item.id.toString(),
                title: item.title,
                imageUrl: item.src,
                description: item.alt,
                userId: user.id,
            },
        });
    }
    console.log('Seeded DummyData as pins');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });