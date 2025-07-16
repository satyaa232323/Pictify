import { auth, currentUser } from "@clerk/nextjs/server"
import { db, prisma } from "./prisma";

export const GetUserClerk = async () =>  {
    const user = await currentUser();

    const name = user?.fullName || user?.firstName || user?.lastName || "Guest";

    if(!user){
        return null;
    }

    try{
        const loggedUser = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
        })
        if(loggedUser){
            return loggedUser;
        }

        const newUser = await db.user.create({
            data: {
                clerkId: user.id,
                name: name,
                image: user.imageUrl || "",
                email: user.emailAddresses[0]?.emailAddress || "",
            }
        })
        return newUser;
    }
    catch(error) {
        console.error("Error fetching or creating user:", error);
        return null;
    }
}

// Auth utilities
export async function getCurrentUser() {
    const user = await currentUser()

    if (!user) return null

    // Get user from database
    const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id }
    })

    return dbUser
}

export async function getCurrentUserId() {
    const { userId } = await auth()

    if (!userId) return null

    const dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { id: true }
    })

    return dbUser?.id || null
}

export async function requireAuth() {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error('Authentication required')
    }

    return user
}

// For server components
export async function getAuthUser() {
    try {
        const user = await getCurrentUser()
        return user
    } catch (error) {
        return null
    }
}
