"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Settings } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

const initialTemplates = [
  { id: 1, name: "John's Coffee Shop", location: "New York, NY", rating: 4.5, reviewCount: 120 },

]

export default function AutoResponsesPage() {

    const [businesses, setBusinesses] = useState(initialTemplates)
    const [newBusiness, setNewBusiness] = useState({ name: "", location: "" })
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [selectedBusiness, setSelectedBusiness] = useState(null)
  
    const handleAddBusiness = () => {
      if (newBusiness.name && newBusiness.location) {
        setBusinesses([
          ...businesses,
          {
            id: businesses.length + 1,
            ...newBusiness,
            rating: 0,
            reviewCount: 0,
          },
        ])
        setNewBusiness({ name: "", location: "" })
        setIsAddDialogOpen(false)
      }
    }
  
    const handleEditBusiness = () => {
      if (selectedBusiness) {
        const updatedBusinesses = businesses.map((business) =>
          business.id === selectedBusiness.id ? selectedBusiness : business,
        )
        setBusinesses(updatedBusinesses)
        setIsEditDialogOpen(false)
      }
    }
  
    const openEditDialog = (business) => {
      setSelectedBusiness(business)
      setIsEditDialogOpen(true)
    }
  
    const openViewDialog = (business) => {
      setSelectedBusiness(business)
      setIsViewDialogOpen(true)
    }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Auto Responses</h2>
        <p className="text-muted-foreground">Manage and customize your AI-powered automatic response templates.</p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Template</DialogTitle>
              <DialogDescription>Enter the details of your new template below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Template Name
                </Label>
                <Input
                  id="name"
                  value={newBusiness.name}
                  onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newBusiness.location}
                  onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={newBusiness.location}
                  onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
                  className="col-span-3 border-1 border-gray-100"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBusiness}>Add Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Positive Review Response", type: "Positive" },
              { name: "Negative Review Response", type: "Negative" },
              { name: "Neutral Review Response", type: "Neutral" },
              { name: "Feature Request Response", type: "Feature Request" },
              { name: "Bug Report Response", type: "Bug Report" },
              { name: "Thank You Response", type: "General" },
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>{template.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is a sample response for a {template.type.toLowerCase()} review. Click edit to customize the
                    content.
                  </p>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} className="p-2">
          <DialogTrigger asChild>
          <div className="">
          <Button className="bg-green-600 text-white mt-2 mb-2 text-xs float-right">
              Edit Template
            </Button><br />
          </div> 
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
              <DialogDescription>Enter the details of your new business below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Template Name
                </Label>
                <Input
                  id="name"
                  value={newBusiness.name}
                  onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newBusiness.location}
                  onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={newBusiness.location}
                  onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
                  className="col-span-3 border-1 border-gray-100"
                ></textarea>
              </div>
            </div>
            <Button className="mt-4 bg-white text-black border-bold" onClick={handleEditBusiness} variant="outline">
                    Edit Template
                  </Button>
          </DialogContent>
        </Dialog>
                 
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Response Settings</CardTitle>
              <CardDescription>Configure your AI-powered auto-response system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Input id="ai-model" value="GPT-4" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="response-tone">Response Tone</Label>
                <Input id="response-tone" placeholder="e.g., Friendly, Professional, Casual" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-length">Maximum Response Length</Label>
                <Input id="max-length" type="number" placeholder="e.g., 150 words" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords to Include</Label>
                <Textarea id="keywords" placeholder="Enter keywords separated by commas" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

