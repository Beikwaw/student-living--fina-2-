"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface Complaint {
  id: string
  studentName: string
  roomNumber: string
  category: string
  subject: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  department?: string
  comments: Array<{
    text: string
    date: string
    author: string
  }>
}

export function ComplaintManagement() {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "1",
      studentName: "John Doe",
      roomNumber: "A-101",
      category: "maintenance",
      subject: "Broken AC",
      description: "The air conditioning unit in my room is not working properly.",
      status: "pending",
      comments: [],
    },
  ])

  const handleStatusChange = (complaintId: string, newStatus: Complaint["status"]) => {
    setComplaints(
      complaints.map((complaint) => (complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint)),
    )
  }

  const handleDepartmentAssign = (complaintId: string, department: string) => {
    setComplaints(
      complaints.map((complaint) => (complaint.id === complaintId ? { ...complaint, department } : complaint)),
    )
  }

  const addComment = (complaintId: string, comment: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              comments: [
                ...complaint.comments,
                {
                  text: comment,
                  date: new Date().toISOString(),
                  author: "Admin",
                },
              ],
            }
          : complaint,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complaint Management</CardTitle>
          <CardDescription>View and manage student complaints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{complaint.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      Room {complaint.roomNumber} - {complaint.studentName}
                    </p>
                  </div>
                  <Badge
                    variant={
                      complaint.status === "resolved"
                        ? "default"
                        : complaint.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {complaint.status === "resolved" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {complaint.status === "in-progress" && <Clock className="mr-1 h-3 w-3" />}
                    {complaint.status === "pending" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {complaint.status}
                  </Badge>
                </div>

                <p className="text-sm">{complaint.description}</p>

                <div className="flex gap-4">
                  <Select
                    defaultValue={complaint.department}
                    onValueChange={(value) => handleDepartmentAssign(complaint.id, value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Assign Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    defaultValue={complaint.status}
                    onValueChange={(value) => handleStatusChange(complaint.id, value as Complaint["status"])}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Comments</span>
                  </div>
                  {complaint.comments.map((comment, index) => (
                    <div key={index} className="bg-muted p-2 rounded-md text-sm">
                      <p>{comment.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {comment.author} - {new Date(comment.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Textarea placeholder="Add a comment..." className="min-h-[60px]" />
                    <Button
                      onClick={() => {
                        const textarea = document.querySelector("textarea")
                        if (textarea && textarea.value) {
                          addComment(complaint.id, textarea.value)
                          textarea.value = ""
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

