"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, UserCheck, UserPlus, Moon, Wrench, AlertTriangle, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Daily Sign-in", href: "/dashboard/sign-in", icon: UserCheck },
    { name: "Guest Registration", href: "/dashboard/guest", icon: UserPlus },
    { name: "Sleepover Requests", href: "/dashboard/sleepover", icon: Moon },
    { name: "Room Maintenance", href: "/dashboard/maintenance", icon: Wrench },
    { name: "Complaints", href: "/dashboard/complaints", icon: AlertTriangle },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold">MDO Student Living</span>
            </Link>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <div className="hidden md:flex">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <div className="hidden border-r bg-muted/40 md:block md:w-64">
          <div className="flex h-full flex-col py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background md:hidden">
            <div className="pt-20 pb-6 px-2">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

