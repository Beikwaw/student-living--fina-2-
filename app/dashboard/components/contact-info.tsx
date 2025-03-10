import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Shield, CreditCard, Mail, Phone } from "lucide-react"

export function ContactInfo() {
  const contacts = [
    {
      department: "Building Management",
      email: "obs@mydomainliving.co.za",
      phone: null,
      icon: Building,
    },
    {
      department: "Security & Reception",
      email: null,
      phone: "087 897 9085",
      icon: Shield,
    },
    {
      department: "Finance",
      email: "carmen@swish.co.za",
      phone: null,
      icon: CreditCard,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Important contacts for your student living experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
              <div className="bg-primary/10 p-2 rounded-full">
                <contact.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{contact.department}</h3>
                {contact.email && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <a href={`mailto:${contact.email}`} className="hover:underline">
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

