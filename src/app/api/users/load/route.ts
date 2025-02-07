import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

const fetchRandomUsers = async (count: number) => {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}`)
        if (!response.ok) {
            throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error fetching users:", error)
        return []
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const count = body.users || 1

        if (typeof count !== "number" || count <= 0) {
            return NextResponse.json({ error: "Invalid number of users" }, { status: 400 })
        }

        const newUsers = await fetchRandomUsers(count)

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db("userDatabase")
        const usersCollection = db.collection("users")

        // Insert new users into MongoDB
        const result = await usersCollection.insertMany(newUsers)

        return NextResponse.json(
            {
                message: `${result.insertedCount} users added successfully`,
                users: newUsers,
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 })
    }
}

