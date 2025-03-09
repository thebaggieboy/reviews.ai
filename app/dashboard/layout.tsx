"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarChart3, Bell, Home, MessageSquare, Settings, Star, Zap, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
  
    { href: "/dashboard/emails", icon: BarChart3, label: "Emails" },
    { href: "/dashboard/reviews", icon: Star, label: "Reviews" },
    { href: "/dashboard/businesses", icon: BarChart3, label: "Sync" },
    { href: "/dashboard/responses", icon: Zap, label: "Auto Responses" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <SidebarProvider defaultOpen={isDesktop}>
      <div className="flex min-h-screen bg-background">
        {isDesktop && (
          <Sidebar className="border-r hidden md:block">
            <SidebarHeader className="border-b px-6 py-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MessageSquare className="h-6 w-6 text-emerald-500" />
                <span>review.ai</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-4">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-4 px-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">John's Coffee Shop</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>
        )}
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                {isDesktop ? (
                  <SidebarTrigger />
                ) : (
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                      <div className="flex flex-col h-full">
                        <div className="border-b px-6 py-4">
                          <Link href="/" className="flex items-center gap-2 font-semibold">
                            <MessageSquare className="h-6 w-6 text-emerald-500" />
                            <span>review.ai</span>
                          </Link>
                        </div>
                        <nav className="flex-1 overflow-y-auto p-4">
                          {menuItems.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                              <Button variant="ghost" className="w-full justify-start mb-1">
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                              </Button>
                            </Link>
                          ))}
                        </nav>
                        <div className="border-t p-4">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-1 flex-col">
                              <span className="text-sm font-medium">John's Coffee Shop</span>
                              <span className="text-xs text-muted-foreground">Admin</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
                <h1 className="text-xl font-semibold">
                  {pathname === "/dashboard"
                    ? "Overview"
                    : pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        3
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Oliver Markus left a new review</p>
                            <p className="text-sm text-muted-foreground">1 minute ago</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>SD</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Sarah Davis left a new review</p>
                            <p className="text-sm text-muted-foreground">5 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>JL</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">John Lee left a new review</p>
                            <p className="text-sm text-muted-foreground">10 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {!isDesktop && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </header>
          <main className="flex-1">
            <div className="container py-6 px-4 md:px-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

