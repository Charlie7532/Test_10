import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const results = searchParams.get("results") || "5" // Default to 5 if not provided

    const API_URL = `https://randomuser.me/api?results=${results}`

    try {
        // Fetch random users from the API
        const response = await fetch(API_URL, {
            // Note: In Next.js 15, fetch requests are no longer cached by default
            // If you want to enable caching, you can add cache options here
            // cache: 'force-cache',
            // next: { revalidate: 60 }, // Revalidate every minute
        })

        if (!response.ok) {
            throw new Error("Failed to fetch users")
        }

        const data = await response.json()

        // Return the users as a JSON response
        return NextResponse.json(data.results)
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }
}

