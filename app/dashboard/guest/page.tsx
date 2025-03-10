"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Clock, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GuestRegistrationPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeGuests, setActiveGuests] = useState<any[]>([])

  const handleRegisterGuest = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const guestName = formData.get("guestName") as string
    const guestRoom = formData.get("guestRoom") as string
    const leaseholderPhone = formData.get("leaseholderPhone") as string
    const fromDate = formData.get("fromDate") as string
    const tillDate = formData.get("tillDate") as string

    // Simulate API call
    setTimeout(() => {
      const newGuest = {
        id: Date.now().toString(),
        name: guestName,
        roomNumber: guestRoom,
        leaseholderPhone: leaseholderPhone,
        fromDate: fromDate,
        tillDate: tillDate,
        checkInTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }

      setActiveGuests([...activeGuests, newGuest])
      setLoading(false)

      // Reset form - Fix the syntax error here
      const form = e.target as HTMLFormElement
      form.reset()

      toast({
        title: "Guest registered successfully",
        description: `${guestName} has been registered as your guest.`,
      })
    }, 1000)
  }

  const handleCheckoutGuest = (guestId: string) => {
    setActiveGuests(activeGuests.filter((guest) => guest.id !== guestId))

    toast({
      title: "Guest checked out",
      description: "Your guest has been checked out successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guest Registration</h1>
        <p className="text-muted-foreground">Register visitors and manage your active guests.</p>
      </div>

      <Tabs defaultValue="register">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register Guest</TabsTrigger>
          <TabsTrigger value="active">Active Guests ({activeGuests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Register a New Guest</CardTitle>
                  <CardDescription>Fill in the details to register a visitor for today.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleRegisterGuest}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Guest Full Name</Label>
                  <Input id="guestName" name="guestName" placeholder="Enter guest's full name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestRoom">Guest Room Number</Label>
                  <Input id="guestRoom" name="guestRoom" placeholder="Enter guest's room number" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaseholderPhone">Phone Number of Leaseholder</Label>
                  <Input
                    id="leaseholderPhone"
                    name="leaseholderPhone"
                    placeholder="Enter your phone number"
                    required
                    type="tel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Visit</Label>
                  <Input id="purpose" name="purpose" placeholder="e.g., Study session, Social visit" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromDate">From Date</Label>
                    <Input id="fromDate" name="fromDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tillDate">Till Date</Label>
                    <Input id="tillDate" name="tillDate" type="date" required />
                  </div>
                </div>

                <div className="rounded-md bg-muted p-3">
                  <h4 className="mb-2 text-sm font-medium">Guest Policy Reminder</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Guests must leave by 10:00 PM unless a sleepover is approved</li>
                    <li>• You are responsible for your guest's behavior</li>
                    <li>• Guests must be accompanied by you at all times</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register Guest"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Guests</CardTitle>
              <CardDescription>Currently registered visitors in the building.</CardDescription>
            </CardHeader>
            <CardContent>
              {activeGuests.length === 0 ? (
                <div className="text-center py-6">
                  <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No active guests at the moment</p>
                  <p className="text-xs text-muted-foreground mt-1">Register a guest using the "Register Guest" tab</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeGuests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Room: {guest.roomNumber}</span>
                          <span>•</span>
                          <span>
                            From: {guest.fromDate} to {guest.tillDate}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleCheckoutGuest(guest.id)}>
                        <X className="h-4 w-4 mr-1" />
                        Check-out
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

