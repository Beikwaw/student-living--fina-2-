import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, UserCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl">My Domain Student Living</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 grid md:grid-cols-2">
        {/* Hero Image Section - Spans both columns on mobile */}
        <div className="relative h-[200px] md:h-auto md:col-span-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-08%20at%2023.14.23-j6GYkX8FPuMBcI8zmjfog5k9sgNVF3.png"
            alt="My Domain Student Living Building"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Welcome to My Domain</h1>
          </div>
        </div>

        {/* Portal Selection Section */}
        <section className="p-6 flex items-center justify-center bg-background">
          <Card className="w-full max-w-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pt-4">
              <Link href="/admin/login">
                <Button size="lg" className="w-[200px]">
                  <Shield className="mr-2 h-5 w-5" />
                  Access Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="p-6 flex items-center justify-center bg-background">
          <Card className="w-full max-w-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Student Portal</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pt-4">
              <Link href="/login">
                <Button size="lg" className="w-[200px]">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Access Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-6 bg-secondary text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2025 My Domain Student Living. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

