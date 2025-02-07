import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { ObjectId } from "mongodb"

interface User {
    _id: ObjectId
    name: string
    email: string
    // Add other fields as necessary
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const random = searchParams.get("random")

    try {
        const client = await clientPromise
        const db = client.db("userDatabase")
        const usersCollection = db.collection<User>("users")

        if (email) {
            const user = await usersCollection.findOne({ email })
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 })
            }
            return NextResponse.json({ results: [user] })
        } else if (random) {
            const amount = Number.parseInt(random, 10) || 1
            const randomUsers = await usersCollection.aggregate([{ $sample: { size: amount } }]).toArray()
            return NextResponse.json({ results: randomUsers })
        }

        // If no specific query, return all users (with a reasonable limit)
        const allUsers = await usersCollection.find().limit(100).toArray()
        return NextResponse.json({ results: allUsers })
    } catch (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 })
    }
}

