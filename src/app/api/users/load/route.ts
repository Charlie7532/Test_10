/* eslint-disable no-console */

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiKey = process.env.MONDAY_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
  }

  await dbConnect()

  const { users } = await request.json()

  const API_URL = `https://randomuser.me/api?results=${results}`

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
