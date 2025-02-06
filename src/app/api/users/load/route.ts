// import { type NextRequest, NextResponse } from "next/server"
// import clientPromise from "@/lib/mongodb"

// export async function POST(request: NextRequest) {
//   try {
//     // Parse the JSON body
//     const body = await request.json()
//     const { users } = body

//     // Validate the input
//     if (!users || typeof users !== "number" || users < 1) {
//       return NextResponse.json({ error: 'Invalid input. "users" must be a positive number.' }, { status: 400 })
//     }

//     // Fetch random users from the API
//     const API_URL = `https://randomuser.me/api?results=${users}`
//     const response = await fetch(API_URL)

//     if (!response.ok) {
//       throw new Error("Failed to fetch users from Random User API")
//     }

//     const data = await response.json()
//     const fetchedUsers = data.results

//     // Connect to MongoDB
//     const client = await clientPromise
//     const db = client.db("randomusers") // You can change the database name as needed

//     // Store users in MongoDB
//     const result = await db.collection("users").insertMany(fetchedUsers)

//     // Return success message
//     return NextResponse.json(
//       {
//         message: `Successfully stored ${result.insertedCount} users in the database.`,
//         count: result.insertedCount,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error("Error processing request:", error)
//     return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
//   }
// }

