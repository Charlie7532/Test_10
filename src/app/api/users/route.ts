import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import users from "../../../DB/users.json"; // Import JSON directly

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const usersParam = searchParams.get("users");
        const usersCount = usersParam ? parseInt(usersParam, 10) : 1;

        if (isNaN(usersCount) || usersCount < 1) {
            return NextResponse.json({ error: 'Invalid "users" parameter.' }, { status: 400 });
        }

        // If users are imported, use them directly
        if (Array.isArray(users) && users.length > 0) {
            const shuffledUsers = users.sort(() => 0.5 - Math.random()).slice(0, usersCount);
            return NextResponse.json(shuffledUsers, { status: 200 });
        }

        // Otherwise, try reading from the file
        const filePath = path.join(process.cwd(), "src/DB/users.json");

        try {
            const fileData = await fs.readFile(filePath, "utf-8");
            const usersData = JSON.parse(fileData);

            if (!Array.isArray(usersData) || usersData.length === 0) {
                return NextResponse.json({ error: "No users available." }, { status: 404 });
            }

            const shuffledUsers = usersData.sort(() => 0.5 - Math.random()).slice(0, usersCount);
            return NextResponse.json(shuffledUsers, { status: 200 });
        } catch {
            return NextResponse.json({ error: "No users available." }, { status: 404 });
        }

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Failed to process request", details: (error as Error).message }, { status: 500 });
    }
}
