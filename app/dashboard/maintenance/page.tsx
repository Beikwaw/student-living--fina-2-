"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrench, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MaintenanceRequestPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState<any[]>([])

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const issueType = formData.get("issueType") as string
    const location = formData.get("location") as string
    const roomNumber = formData.get("roomNumber") as string
    const description = formData.get("description") as string
    const priority = formData.get("priority") as string

    // Simulate API call
    setTimeout(() => {
      const newRequest = {
        id: Date.now().toString(),
        issueType,
        location,
        roomNumber,
        description,
        priority,
        status: "pending",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        updates: [],
      }

      setRequests([...requests, newRequest])
      setLoading(false)

      // Reset form - Fix the syntax error here
      const form = e.target as HTMLFormElement
      form.reset()

      toast({
        title: "Maintenance request submitted",
        description: "Your request has been submitted and is being processed.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Room Maintenance</h1>
        <p className="text-muted-foreground">Submit and track maintenance requests for your room.</p>
      </div>

      <Tabs defaultValue="new">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New Request</TabsTrigger>
          <TabsTrigger value="history">Request History ({requests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Submit a Maintenance Request</CardTitle>
                  <CardDescription>Report issues with your room or common areas.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmitRequest}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issueType">Issue Type</Label>
                  <Select name="issueType" required defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="heating">Heating/Cooling</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select name="location" required defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bedroom">Bedroom</SelectItem>
                      <SelectItem value="bathroom">Bathroom</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input id="roomNumber" name="roomNumber" placeholder="Enter your room number" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description of Issue</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please describe the issue in detail"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select name="priority" required defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Not urgent</SelectItem>
                      <SelectItem value="medium">Medium - Needs attention soon</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                      <SelectItem value="emergency">Emergency - Immediate attention required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessInstructions">Access Instructions (Optional)</Label>
                  <Input
                    id="accessInstructions"
                    name="accessInstructions"
                    placeholder="Any special instructions for maintenance staff"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Request History</CardTitle>
              <CardDescription>Track the status of your maintenance requests.</CardDescription>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <div className="text-center py-6">
                  <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No maintenance requests</p>
                  <p className="text-xs text-muted-foreground mt-1">Submit a request using the "New Request" tab</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{request.issueType}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                              {request.location} - Room {request.roomNumber}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Submitted on {request.date}</p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            request.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : request.status === "in-progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status === "completed"
                            ? "Completed"
                            : request.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{request.description}</p>
                      <div className="mt-3 text-xs font-medium text-muted-foreground">
                        Priority: {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </div>
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

