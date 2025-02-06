"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@heroui/react"

interface ApiButtonProps {
    onClick?: () => void // Optional function to trigger after API call
}

export default function ApiButton({ onClick }: ApiButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [apiUrl, setApiUrl] = useState("")

    useEffect(() => {
        // Ensure this only runs on the client side
        if (typeof window !== "undefined") {
            setApiUrl(`${window.location.origin}/api/users`)
        }
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
            setMessage("DB Populated, if the elements dont load inmediatlly reload the page.")
            console.log("API Response:", data)

            // Call the provided onClick function if it exists
            if (onClick) {
                onClick()
            }
        } catch (error) {
            setMessage("Error calling API")
            console.error("API call error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [apiUrl, onClick])

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
