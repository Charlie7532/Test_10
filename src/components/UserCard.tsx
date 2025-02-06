import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

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

interface UserCardProps {
    user: User
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <Link href={`/user/${encodeURIComponent(user.email)}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img src={user.picture.large || "/placeholder.svg"} alt={`${user.name.first} ${user.name.last}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl dark:text-black font-semibold mb-2">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
                    <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-600">{`${user.location.city}, ${user.location.country}`}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
