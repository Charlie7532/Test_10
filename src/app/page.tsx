"use client"

import { useState, useEffect } from "react"
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
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users?users=6")
      const data = await response.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const filteredUsers = filterUsers(users, searchTerm)

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
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.email} user={user} />
        ))}
      </div>
    </div>
  )
}

