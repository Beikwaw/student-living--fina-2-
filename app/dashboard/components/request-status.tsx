"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Wrench, UserPlus, Clock, CheckCircle, XCircle } from "lucide-react"

interface RequestStatusProps {
  type: "sleepover" | "maintenance" | "guest"
}

export function RequestStatus({ type }: RequestStatusProps) {
  // This would come from an API in a real application
  const getRequestData = () => {
    switch (type) {
      case "sleepover":
        return {
          title: "Sleepover Requests",
          description: "Track the status of your sleepover requests",
          requests: [
            {
              id: "1",
              guestName: "Jane Doe",
              dates: "Mar 15 - Mar 16, 2025",
              status: "pending",
              submittedOn: "Mar 8, 2025",
              adminNotes: "",
            },
          ],
        }
      case "maintenance":
        return {
          title: "Maintenance Requests",
          description: "Track the status of your maintenance requests",
          requests: [
            {
              id: "1",
              issue: "Broken AC",
              location: "Bedroom",
              status: "approved",
              submittedOn: "Mar 5, 2025",
              adminNotes: "Maintenance team scheduled for Mar 10",
            },
          ],
        }
      case "guest":
        return {
          title: "Guest Registrations",
          description: "Track the status of your guest registrations",
          requests: [
            {
              id: "1",
              guestName: "Robert Brown",
              dates: "Mar 12, 2025",
              status: "rejected",
              submittedOn: "Mar 9, 2025",
              adminNotes: "Guest ID information incomplete",
            },
          ],
        }
    }
  }

  const data = getRequestData()

  const getIcon = () => {
    switch (type) {
      case "sleepover":
        return <Moon className="h-5 w-5 text-primary" />
      case "maintenance":
        return <Wrench className="h-5 w-5 text-primary" />
      case "guest":
        return <UserPlus className="h-5 w-5 text-primary" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {getIcon()}
          <div>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.requests.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No requests submitted</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    {type === "maintenance" ? (
                      <>
                        <p className="font-medium">{request.issue}</p>
                        <p className="text-xs text-muted-foreground">Location: {request.location}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium">{request.guestName}</p>
                        <p className="text-xs text-muted-foreground">Dates: {request.dates}</p>
                      </>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Submitted on {request.submittedOn}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                {request.adminNotes && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium mb-1">Admin Notes:</p>
                    <p className="text-sm">{request.adminNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

