/* eslint-disable no-console */

import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const apiKey = process.env.MONDAY_API_KEY
    if (!apiKey) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 })
    }

    const { title, user, description, location } = await request.json()

    const boardId = process.env.MONDAY_BUG_BOARD
    const url = "https://api.monday.com/v2"

    const today = new Date().toISOString().split("T")
    const date = today[0]
    const time = today[1].split(".")[0]

    const query = `mutation {
    create_item (
      board_id: ${boardId},
      item_name: "${title}",
      column_values: "{
        \\"bug_status\\":\\"Awaiting Review\\",
        \\"status_18\\":\\"Alpha\\",
        \\"external_user_mkm2s584\\": {
          \\"text\\" : \\"${user?.name || ""}\\\", 
          \\"email\\" : \\"${user?.email || ""}\\"},
        \\"date9\\": {
          \\"date\\" : \\"${date}\\", 
          \\"time\\" : \\"${time}\\"},
        \\"text_mkm1cmpq\\":\\"${location}\\",
        \\"long_text\\":\\"${description}\\"
      }") {id}}`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: apiKey,
            },
            body: JSON.stringify({ query }),
        })

        const result = await response.json()

        if (result.errors) {
            console.error(JSON.stringify(result, null, 2))
            return NextResponse.json({ error: "Error submitting bug report to Monday.com" }, { status: 500 })
        }

        return NextResponse.json({ success: true, id: result.data.create_item.id })
    } catch (error) {
        console.error("Failed to submit bug report:", error)
        return NextResponse.json({ error: "Failed to submit bug report" }, { status: 500 })
    }
}

