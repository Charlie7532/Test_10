import { NextRequest, NextResponse } from "next/server"

// Simulated in-memory database (Replace with a real DB later)
let users: any[] = []

// Function to fetch users from randomuser.me API
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

// POST: Populate the database with random users
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const count = body.users || 1 // Default to 1 user if no count provided

        if (typeof count !== "number" || count <= 0) {
            return NextResponse.json({ error: "Invalid number of users" }, { status: 400 })
        }

        const newUsers = await fetchRandomUsers(count)
        users.push(...newUsers) // Store in memory (Replace with DB insert)

        return NextResponse.json({
            message: `${count} users added successfully`,
            users: newUsers,
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 })
    }
}

// GET: Fetch users (by email or all)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const random = searchParams.get("random")

    if (email) {
        // Find user by email
        const user = users.find((u) => u.email === email)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        return NextResponse.json({ results: [user] })
    } else if (random) {
        // Return a random subset of users
        const amount = parseInt(random, 10) || 1
        const shuffled = [...users].sort(() => 0.5 - Math.random())
        return NextResponse.json({ results: shuffled.slice(0, amount) })
    }

    return NextResponse.json({ results: users }) // Return all users if no params
}
