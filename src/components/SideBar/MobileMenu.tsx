import type React from "react"

import { Home, Search, PlusSquare, User } from "lucide-react"

const MobileBottomMenu: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-lightBackground dark:bg-darkBackground border-t border-gray-200 px-4 py-2">
      <ul className="flex justify-between items-center">
        <li className="flex flex-col items-center">
          <Home className="h-6 w-6 text-gray-800 dark:text-white" />
          <span className="text-xs mt-1 text-gray-600 dark:text-white">Inicio</span>
        </li>
        <li className="flex flex-col items-center">
          <Search className="h-6 w-6 text-gray-800 dark:text-white" />
          <span className="text-xs mt-1 text-gray-600 dark:text-white">Explorar</span>
        </li>
        <li className="flex flex-col items-center">
          <PlusSquare className="h-6 w-6 text-gray-800 dark:text-white" />
          <span className="text-xs mt-1 text-gray-600 dark:text-white">Crear</span>
        </li>
        <li className="flex flex-col items-center">
          <User className="h-6 w-6 text-gray-800 dark:text-white" />
          <span className="text-xs mt-1 text-gray-600 dark:text-white">Perfil</span>
        </li>
      </ul>
    </nav>
  )
}

export default MobileBottomMenu

