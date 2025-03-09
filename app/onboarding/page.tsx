"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, Plus, MessageSquare, Menu } from "lucide-react"
import Link from "next/link"
import { SheetContent, Sheet, SheetTrigger } from "@/components/ui/sheet"
 
import {selectUser, setUser} from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

// Mock data for existing businesses
const existingBusinesses = [
  { id: 1, name: "Connect your gmail account", location: "Sync your email to start automating replies" },

]

export default function OnboardingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [newBusiness, setNewBusiness] = useState({ name: "", location: "" })
  const [isAddingNew, setIsAddingNew] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)



  const filteredBusinesses = existingBusinesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleContinue = () => {
    if (selectedBusiness || (isAddingNew && newBusiness.name && newBusiness.location)) {
      // Here you would typically send the selected or new business data to your backend
      console.log("Selected business:", selectedBusiness || newBusiness)
      // Then redirect to the dashboard or next onboarding step
      router.push("/dashboard")
    }
  }

  return (
   <>
          <header className="sticky top-0 z-50 w-full p-2 border-b bg-background/95 backdrop-blur  bg-black">
        <div className="container flex h-14  items-center">
          <Link href="/" className="flex text-white bolder items-center gap-2 ">
            <MessageSquare className="h-6 w-6 text-emerald-500" />
            <span>review.ai</span> 
          </Link>
          <nav className="ml-auto hidden md:flex gap-4">
            <Link href="#problem" style={{fontFamily:'Inter, Sans-serif', lineHeight:1}} className="text-sm bolder  text-white font-medium hover:underline">
              Problem
            </Link>
            <Link href="#solution" style={{fontFamily:'Inter, Sans-serif', lineHeight:1}} className="text-sm bolder  text-white font-medium hover:underline">
              Solution
            </Link>
            <Link href="#features" style={{fontFamily:'Inter, Sans-serif', lineHeight:1}} className="text-sm bolder  text-white font-medium hover:underline">
              Features
            </Link>
            <Link href="#pricing" style={{fontFamily:'Inter, Sans-serif', lineHeight:1}} className="text-sm bolder  text-white font-medium hover:underline">
              Pricing
            </Link>
          </nav>
          <div className="ml-4 hidden md:flex gap-2">
            <Link href="/signin">
              <Button variant="ghost" className='bg-white text-green-800' size="sm">
                {user !== null ? "Dashboard" : "Sign In"}
              </Button>
            </Link>
            <Link href="/signup">
            {user !== null ? "" :  <Button className="bg-green-600" size="sm">Get Started</Button>}
             
            </Link>
          </div>
          <div className="ml-auto md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href="#problem" className="text-sm font-medium hover:underline">
                    Problem
                  </Link>
                  <Link href="#solution" className="text-sm font-medium hover:underline">
                    Solution
                  </Link>
                  <Link href="#features" className="text-sm font-medium hover:underline">
                    Features
                  </Link>
                  <Link href="#pricing" className="text-sm font-medium hover:underline">
                    Pricing
                  </Link>
                  <Link href="/signin">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to review.ai</CardTitle>
          <CardDescription>Let's get started by setting up your business profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Link your gmail account to your business</Label>
            
          </div>

          {filteredBusinesses.length > 0 && (
            <RadioGroup value={selectedBusiness} onValueChange={setSelectedBusiness}>
              {filteredBusinesses.map((business) => (
                <div key={business.id} className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value={business.id} id={`business-${business.id}`} />
                  <Label htmlFor={`business-${business.id}`} className="flex-grow cursor-pointer">
                    <div>{business.name}</div>
                    <div className="text-sm text-muted-foreground">{business.location}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {filteredBusinesses.length === 0 && !isAddingNew && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No matching businesses found.</p>
              <Button variant="outline" className="mt-2" onClick={() => setIsAddingNew(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add a new business
              </Button>
            </div>
          )}

          {isAddingNew && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add a new business</h3>
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  value={newBusiness.name}
                  onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-location">Business Location</Label>
                <Input
                  id="business-location"
                  value={newBusiness.location}
                  onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleContinue} className="w-full bg-green-600">
            Continue
          </Button>

          <Button onClick={handleContinue} className="w-full ml-2 bg-gray-200 text-black">
            Skip, i would sync my email later
          </Button>
        </CardFooter>
      </Card>
    </div>
   </>
  )
}

