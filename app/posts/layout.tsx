

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
// import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Posts",
  description: "Admin Posts Dashboard",
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <AppSidebar />

            {/* Right Content */}
            <div className="flex flex-col flex-1">
              {/* Top Header */}
              <DashboardHeader />

              {/* Page Content */}
              <main className="flex-1 p-6 bg-muted/40">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
