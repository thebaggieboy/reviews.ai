"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, Plus } from "lucide-react"

// Mock data for existing businesses
const existingBusinesses = [
  { id: 1, name: "John's Coffee Shop", location: "New York, NY" },
  { id: 2, name: "Sarah's Bakery", location: "Los Angeles, CA" },
  { id: 3, name: "Mike's Diner", location: "Chicago, IL" },
]

export default function OnboardingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [newBusiness, setNewBusiness] = useState({ name: "", location: "" })
  const [isAddingNew, setIsAddingNew] = useState(false)
  const router = useRouter()

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
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to review.ai</CardTitle>
          <CardDescription>Let's get started by setting up your business profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Search for your business</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
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
          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

