"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DailySignInPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  const handleSignIn = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSignedIn(true)
      toast({
        title: "Signed in successfully",
        description: "You have been marked present for today.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Sign-in</h1>
        <p className="text-muted-foreground">Sign in to mark your attendance for today.</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Daily Attendance</CardTitle>
          <CardDescription>
            {signedIn
              ? "You're all set for today! You've been marked as present."
              : "Tap the button below to sign in for today."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {signedIn ? (
            <div className="bg-green-50 text-green-700 p-3 rounded-md">
              <p className="font-medium">Successfully signed in</p>
              <p className="text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              You need to sign in once every day to maintain your attendance record.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={handleSignIn} disabled={loading || signedIn}>
            {loading ? "Signing in..." : signedIn ? "Signed In" : "Sign In Now"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>Your recent sign-in activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {signedIn && (
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Today</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Present</div>
              </div>
            )}
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">Yesterday</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(Date.now() - 86400000).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Present</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">Two days ago</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(Date.now() - 172800000).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Present</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

