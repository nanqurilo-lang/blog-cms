// "use client"

// import { Bell, User } from "lucide-react"
// import { SidebarTrigger } from "@/components/ui/sidebar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function DashboardHeader() {
//   return (
//     <header className="flex items-center justify-between h-14 px-4 pl-10 border-b bg-background">
//       {/* Left */}
//       <div className="flex items-center gap-3">
//         <SidebarTrigger />
//         <h1 className="text-lg font-semibold">Dashboard</h1>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         {/* 🔔 Notification */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="relative p-2 rounded-full hover:bg-muted">
//               <Bell size={18} />
//               {/* future badge */}
//               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-64">
//             <p className="px-3 py-2 text-sm text-muted-foreground">
//               No notifications yet
//             </p>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* 👤 Profile */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-2 p-2 rounded-full hover:bg-muted">
//               <User size={18} />
//               <span className="text-sm">Name</span>
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem className="text-red-500">
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
        
//       </div>
//     </header>

    
//   )
// }






"use client"

import { Bell, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 👉 helper function to convert path to title
function getTitleFromPath(pathname: string) {
  if (pathname === "/") return "Dashboard"

  const segments = pathname.split("/").filter(Boolean)

  const lastSegment = segments[segments.length - 1]

  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function DashboardHeader() {
  const pathname = usePathname()
  const title = getTitleFromPath(pathname)

  return (
    <header className="flex items-center justify-between h-14 px-4 pl-10 border-b bg-background">
      {/* Left */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notification */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-muted">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <p className="px-3 py-2 text-sm text-muted-foreground">
              No notifications yet
            </p>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 👤 Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-muted">
              <User size={18} />
              <span className="text-sm">Name</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
