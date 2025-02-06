import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "DB", "users.json");

/**
 * GET - Fetch users
 * - If ?users=X is provided, return X random users.
 * - If ?id=X is provided, return the user with that ID.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const usersParam = searchParams.get("users");
        const idParam = searchParams.get("id");

        // Read users file
        const fileData = await fs.readFile(filePath, "utf-8");
        const usersData = JSON.parse(fileData);

        if (!Array.isArray(usersData) || usersData.length === 0) {
            return NextResponse.json({ error: "No users available." }, { status: 404 });
        }

        // Fetch by ID
        if (idParam) {
            const user = usersData.find((u: any) => u.id.toString() === idParam);
            if (!user) {
                return NextResponse.json({ error: "User not found." }, { status: 404 });
            }
            return NextResponse.json(user, { status: 200 });
        }

        // Fetch a random number of users
        const usersCount = usersParam ? parseInt(usersParam, 10) : 1;
        if (isNaN(usersCount) || usersCount < 1) {
            return NextResponse.json({ error: 'Invalid "users" parameter.' }, { status: 400 });
        }

        const shuffledUsers = usersData.sort(() => 0.5 - Math.random()).slice(0, usersCount);
        return NextResponse.json(shuffledUsers, { status: 200 });

    } catch (error) {
        console.error("Error processing GET request:", error);
        return NextResponse.json({ error: "Failed to process request", details: (error as Error).message }, { status: 500 });
    }
}

/**
 * POST - Add a new user to users.json
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body || !body.name || !body.email) {
            return NextResponse.json({ error: "Missing required fields (name, email)." }, { status: 400 });
        }

        // Read existing users
        const fileData = await fs.readFile(filePath, "utf-8");
        const usersData = JSON.parse(fileData);

        // Generate new ID
        const newUser = { id: usersData.length + 1, ...body };
        usersData.push(newUser);

        // Save the updated users list
        await fs.writeFile(filePath, JSON.stringify(usersData, null, 2));

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Failed to add user", details: (error as Error).message }, { status: 500 });
    }
}
