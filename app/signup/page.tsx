"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    gmailPassword: "",
    appPassword: "",
    confirmPassword: "",
    phone: "",
    placeOfStudy: "",
    roomNumber: "",
    tenantCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Please enter a valid Gmail address"
    }

    // Password validation
    if (!formData.gmailPassword) {
      newErrors.gmailPassword = "Gmail password is required"
    }

    if (!formData.appPassword) {
      newErrors.appPassword = "App password is required"
    } else if (formData.appPassword.length < 8) {
      newErrors.appPassword = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.appPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Other fields validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.placeOfStudy) {
      newErrors.placeOfStudy = "Place of study is required"
    }

    if (!formData.roomNumber) {
      newErrors.roomNumber = "Room number is required"
    }

    if (!formData.tenantCode) {
      newErrors.tenantCode = "Tenant code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials",
      })

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl">My Domain Student Living</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 bg-muted">
        <div className="container px-4 md:px-6">
          {success ? (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 animate-pulse-slow">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Account Created!</CardTitle>
                <CardDescription>
                  Your account has been created successfully. You will be redirected to the login page shortly.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90">Go to Login</Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>Fill in your details to sign up for My Domain Student Living.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Gmail Account</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.name@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gmailPassword">Gmail Password</Label>
                    <Input
                      id="gmailPassword"
                      name="gmailPassword"
                      type="password"
                      value={formData.gmailPassword}
                      onChange={handleChange}
                      className={errors.gmailPassword ? "border-destructive" : ""}
                    />
                    {errors.gmailPassword && <p className="text-destructive text-sm">{errors.gmailPassword}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appPassword">My Domain App Password</Label>
                    <Input
                      id="appPassword"
                      name="appPassword"
                      type="password"
                      value={formData.appPassword}
                      onChange={handleChange}
                      className={errors.appPassword ? "border-destructive" : ""}
                    />
                    {errors.appPassword && <p className="text-destructive text-sm">{errors.appPassword}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                    />
                    {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placeOfStudy">Place of Study</Label>
                    <Input
                      id="placeOfStudy"
                      name="placeOfStudy"
                      placeholder="University/College Name"
                      value={formData.placeOfStudy}
                      onChange={handleChange}
                      className={errors.placeOfStudy ? "border-destructive" : ""}
                    />
                    {errors.placeOfStudy && <p className="text-destructive text-sm">{errors.placeOfStudy}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input
                      id="roomNumber"
                      name="roomNumber"
                      placeholder="e.g., A-101"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      className={errors.roomNumber ? "border-destructive" : ""}
                    />
                    {errors.roomNumber && <p className="text-destructive text-sm">{errors.roomNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenantCode">Tenant Code</Label>
                    <Input
                      id="tenantCode"
                      name="tenantCode"
                      placeholder="Your assigned tenant code"
                      value={formData.tenantCode}
                      onChange={handleChange}
                      className={errors.tenantCode ? "border-destructive" : ""}
                    />
                    {errors.tenantCode && <p className="text-destructive text-sm">{errors.tenantCode}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign Up"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t py-6 md:py-0 bg-secondary text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2025 My Domain Student Living. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

