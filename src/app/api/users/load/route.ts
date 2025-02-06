import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/User"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const results = searchParams.get("results") || "5" // Default to 5 if not provided

  const API_URL = `https://randomuser.me/api?results=${results}`

  try {
    // Connect to MongoDB
    await dbConnect()

    // Fetch random users from the API
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    const data = await response.json()
    const users = data.results

    // Store users in MongoDB
    for (const user of users) {
      const newUser = new User(user)
      await newUser.save()
    }

    // Return the users as a JSON response
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching or storing users:", error)
    return NextResponse.json({ error: "Failed to fetch or store users" }, { status: 500 })
  }
}
