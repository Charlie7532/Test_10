import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"

export async function POST(request: NextRequest) {
    let rawBody
    try {
        // Log the raw body for debugging
        rawBody = await request.text()
        console.log("Raw request body:", rawBody)

        // Parse the JSON body
        const body = JSON.parse(rawBody)
        const { users } = body

        console.log("Parsed users:", users)

        // Validate the input
        if (!users || typeof users !== "number" || users < 1) {
            return NextResponse.json({ error: 'Invalid input. "users" must be a positive number.' }, { status: 400 })
        }

        // Fetch random users from the API
        const API_URL = `https://randomuser.me/api?results=${users}`
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error("Failed to fetch users from Random User API")
        }

        const data = await response.json()
        console.log("Fetched users data:", data) // Log the parsed response data
        const fetchedUsers = data.results

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db("randomusers") // Ensure the database name is correct

        // Store users in MongoDB
        const result = await db.collection("users").insertMany(fetchedUsers)

        // Return success message
        return NextResponse.json(
            {
                message: `Successfully stored ${result.insertedCount} users in the database.`,
                count: result.insertedCount,
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Error processing request:", error)
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                {
                    error: "Invalid JSON in request body",
                    details: error.message,
                    rawBody: rawBody,
                },
                { status: 400 },
            )
        }
        return NextResponse.json({ error: "Failed to process request", details: (error as Error).message }, { status: 500 })
    }
}

