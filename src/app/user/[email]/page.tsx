"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Mail, MapPin, Phone, Calendar, ArrowLeft } from "lucide-react"
import { Card, CardBody, CardHeader, Avatar, Button, Spinner, Divider } from "@heroui/react"

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

export default function UserProfile() {
    const params = useParams()
    const email = params.email as string

    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/users/search?email=${email}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch user")
                }
                const data = await response.json()

                if (!data.results || data.results.length === 0) {
                    throw new Error("User not found")
                }

                setUser(data.results[0])
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
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="flex justify-center items-center h-screen text-danger">Error: {error || "User not found"}</div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" passHref>
                    <Button variant="light" startContent={<ArrowLeft className="h-4 w-4" />} className="mb-6">
                        Back to all users
                    </Button>
                </Link>
                <Card className="w-full">
                    <CardHeader className="flex flex-col items-center pb-6 pt-6 px-4">
                        <Avatar
                            src={user.picture.large || "/placeholder.svg"}
                            alt={`${user.name.first} ${user.name.last}`}
                            className="w-32 h-32 text-large"
                        />
                        <h1 className="text-2xl font-bold mt-4">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-6 py-4">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-primary mr-3" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                                <span>{`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-secondary mr-3" />
                                <span>{`Phone: ${user.phone}, Cell: ${user.cell}`}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-warning mr-3" />
                                <span>{`Date of Birth: ${new Date(user.dob.date).toLocaleDateString()} (Age: ${user.dob.age})`}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

