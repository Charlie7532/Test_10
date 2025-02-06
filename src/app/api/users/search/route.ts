import { NextRequest, NextResponse } from "next/server"

let users: any[] = []

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const random = searchParams.get("random")

    if (email) {
        const user = users.find((u) => u.email === email)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        return NextResponse.json({ results: [user] })
    } else if (random) {
        const amount = parseInt(random, 10) || 1
        const shuffled = [...users].sort(() => 0.5 - Math.random())
        return NextResponse.json({ results: shuffled.slice(0, amount) })
    }

    return NextResponse.json({ results: users })
}
