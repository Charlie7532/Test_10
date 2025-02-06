"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@heroui/react"

export default function ApiButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [apiUrl, setApiUrl] = useState("")

    useEffect(() => {
        // Set the API URL once the component mounts on the client side
        setApiUrl(`${window.location.origin}/api/users`)
    }, [])

    const handleClick = useCallback(async () => {
        if (!apiUrl) {
            setMessage("API URL not set")
            return
        }

        setIsLoading(true)
        setMessage("")

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ users: 20 }),
            })

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            const data = await response.json()
            setMessage("API call successful!")
            console.log(data) // Log the response data
        } catch (error) {
            setMessage("Error calling API")
            console.error("There was a problem with the API call:", error)
        } finally {
            setIsLoading(false)
        }
    }, [apiUrl])

    return (
        <div className="flex flex-col items-center gap-4">
            <Button onClick={handleClick} disabled={isLoading || !apiUrl}>
                {isLoading ? "Loading..." : "Make API Call"}
            </Button>
            {message && <p className="text-sm text-gray-600">{message}</p>}
            <p className="text-xs text-gray-400">API URL: {apiUrl || "Not set yet"}</p>
        </div>
    )
}

