"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ComplaintsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [complaints, setComplaints] = useState<any[]>([])

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const category = formData.get("category") as string
    const subject = formData.get("subject") as string
    const description = formData.get("description") as string

    // Simulate API call
    setTimeout(() => {
      const newComplaint = {
        id: Date.now().toString(),
        category,
        subject,
        description,
        status: "under-review",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        responses: [],
      }

      setComplaints([...complaints, newComplaint])
      setLoading(false)

      // Reset form - Fix the syntax error here
      const form = e.target as HTMLFormElement
      form.reset()

      toast({
        title: "Complaint submitted",
        description: "Your complaint has been submitted and is under review.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Complaints</h1>
        <p className="text-muted-foreground">Submit and track complaints about your living experience.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Submit a Complaint</CardTitle>
                <CardDescription>Report issues or concerns about your living experience.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmitComplaint}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Complaint Category</Label>
                <Select name="category" required defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noise">Noise Disturbance</SelectItem>
                    <SelectItem value="cleanliness">Cleanliness</SelectItem>
                    <SelectItem value="security">Security Concern</SelectItem>
                    <SelectItem value="facilities">Facilities Issue</SelectItem>
                    <SelectItem value="roommate">Roommate Conflict</SelectItem>
                    <SelectItem value="staff">Staff Behavior</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Brief subject of your complaint" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide details of your complaint"
                  required
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input id="location" name="location" placeholder="Where did this issue occur?" />
              </div>

              <div className="rounded-md bg-muted p-3">
                <h4 className="mb-2 text-sm font-medium">Complaint Policy</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• All complaints are reviewed within 48 hours</li>
                  <li>• Provide as much detail as possible</li>
                  <li>• False complaints may result in disciplinary action</li>
                  <li>• For emergencies, please contact security directly</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Complaint"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Complaints</CardTitle>
            <CardDescription>Track the status of your submitted complaints.</CardDescription>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-6">
                <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No complaints submitted</p>
                <p className="text-xs text-muted-foreground mt-1">Submit a complaint using the form</p>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{complaint.subject}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{complaint.category}</span>
                          <span className="text-xs text-muted-foreground">{complaint.date}</span>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          complaint.status === "resolved"
                            ? "bg-green-100 text-green-700"
                            : complaint.status === "in-progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {complaint.status === "resolved"
                          ? "Resolved"
                          : complaint.status === "in-progress"
                            ? "In Progress"
                            : "Under Review"}
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{complaint.description}</p>

                    {complaint.responses.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center gap-1 text-xs font-medium mb-2">
                          <MessageSquare className="h-3 w-3" />
                          <span>Responses</span>
                        </div>
                        {complaint.responses.map((response: any, index: number) => (
                          <div key={index} className="bg-muted rounded-md p-2 text-xs mb-2">
                            <p className="font-medium">{response.from}</p>
                            <p>{response.message}</p>
                            <p className="text-muted-foreground mt-1 text-[10px]">{response.date}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

