import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Moon, Wrench, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ContactInfo } from "./components/contact-info"

export default function DashboardPage() {
  const stats = [
    {
      name: "Active Guests",
      value: "0",
      description: "No guests currently registered",
      icon: UserPlus,
      href: "/dashboard/guest",
      color: "text-green-500",
    },
    {
      name: "Pending Sleepovers",
      value: "1",
      description: "One sleepover request pending approval",
      icon: Moon,
      href: "/dashboard/sleepover",
      color: "text-purple-500",
    },
    {
      name: "Maintenance Requests",
      value: "1",
      description: "One maintenance request in progress",
      icon: Wrench,
      href: "/dashboard/maintenance",
      color: "text-orange-500",
    },
    {
      name: "Complaints",
      value: "0",
      description: "No active complaints",
      icon: AlertTriangle,
      href: "/dashboard/complaints",
      color: "text-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your student living status.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Latest updates from management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">Weekend Maintenance</h3>
                <p className="text-sm text-muted-foreground">
                  The water will be shut off on Saturday from 10am-2pm for routine maintenance.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Posted 2 days ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">New Laundry Services</h3>
                <p className="text-sm text-muted-foreground">
                  We've upgraded the laundry room with new machines. Please read the instructions before use.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Posted 1 week ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ContactInfo />
      </div>
    </div>
  )
}

