import { NextRequest, NextResponse } from "next/server"

let users: any[] = []

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
        users.push(...newUsers)

        return NextResponse.json({
            message: `${count} users added successfully`,
            users: newUsers,
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 })
    }
}
