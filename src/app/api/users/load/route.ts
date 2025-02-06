/* eslint-disable no-console */

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const apiKey = process.env.MONDAY_API_KEY
    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
    }

    const { title } = await request.json()


    const today = new Date().toISOString().split('T')
    const date = today[0]
    const time = today[1].split('.')[0]

    const query = `mutation {
    create_item (
      board_id: ${boardId},
      item_name: "${title}",
      column_values: "{
        \\"email\\": {
          \\"text\\" : \\"${user?.name || ''}\\", 
          \\"email\\" : \\"${user?.email || ''}\\"},
        \\"date_mkm2gphh\\": {
          \\"date\\" : \\"${date}\\", 
          \\"time\\" : \\"${time}\\"},
        \\"text\\":\\"${location}\\",
        \\"type_mkmwdrkv\\":\\"${type}\\",
        \\"long_text\\":\\"${description}\\"
      }"
    ) {id}}`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
            },
            body: JSON.stringify({ query }),
        })

        const result = await response.json()

        if (result.errors) {
            console.error(JSON.stringify(result, null, 2))
            return NextResponse.json({ error: 'Error submitting feedback to Monday.com' }, { status: 500 })
        }

        return NextResponse.json({ success: true, id: result.data.create_item.id })
    } catch (error) {
        console.error('Failed to submit feedback:', error)
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
    }
}
