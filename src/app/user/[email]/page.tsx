"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Mail, MapPin, Phone, Calendar } from "lucide-react"
import Link from "next/link"

interface User {
    name: {
        title: string
        first: string
        last: string
    }
    email: string
    picture: {
        large: string
    }
    location: {
        street: {
            number: number
            name: string
        }
        city: string
        state: string
        country: string
        postcode: string | number
    }
    phone: string
    cell: string
    dob: {
        date: string
        age: number
    }
}

export default function UserPage() {
    const { email } = useParams()
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/user/${email}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch user")
                }
                const data = await response.json()
                setUser(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setIsLoading(false)
            }
        }

        if (email) {
            fetchUser()
        }
    }, [email])

    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>
    }

    if (error || !user) {
        return <div className="text-center mt-8 text-red-500">Error: {error || "User not found"}</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to all users
            </Link>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
                <img
                    src={user.picture.large || "/placeholder.svg"}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{`Phone: ${user.phone}, Cell: ${user.cell}`}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{`Date of Birth: ${new Date(user.dob.date).toLocaleDateString()} (Age: ${user.dob.age})`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

