interface User {
    name: {
        title: string
        first: string
        last: string
    }
    email: string
    location: {
        city: string
        country: string
    }
}

export function filterUsers(users: User[], searchTerm: string): User[] {
    if (!searchTerm) return users

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    return users.filter((user) => {
        const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase()
        const location = `${user.location.city} ${user.location.country}`.toLowerCase()

        return (
            fullName.includes(lowerCaseSearchTerm) ||
            user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            location.includes(lowerCaseSearchTerm)
        )
    })
}

