"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import UserCard from "@/components/UserCard"
import { filterUsers } from "@/utils/search"

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
    city: string
    country: string
  }
  login: {
    uuid: string
  }
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/users?random=20")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        if (data.results && Array.isArray(data.results)) {
          setUsers(data.results)
        } else {
          throw new Error("Invalid data format")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = filterUsers(users, searchTerm)

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user: any) => (
            <UserCard key={user.login.uuid} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-8">No users found</div>
      )}
    </div>
  )
}

