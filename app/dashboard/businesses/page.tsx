"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Star, Plus, Edit, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for businesses
const initialBusinesses = [
  { id: 1, name: "John's Coffee Shop", location: "New York, NY", rating: 4.5, reviewCount: 120 },

]

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState(initialBusinesses)
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
      <div className="flex justify-between items-center">
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Business</DialogTitle>
              <DialogDescription>Enter the details of your new business below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
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
            </div>
            <DialogFooter>
              <Button onClick={handleAddBusiness}>Add Business</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Businesses</CardTitle>
          <CardDescription>A list of all businesses associated with your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      {business.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {business.rating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{business.reviewCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openViewDialog(business)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(business)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Business Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business</DialogTitle>
            <DialogDescription>Update the details of your business.</DialogDescription>
          </DialogHeader>
          {selectedBusiness && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedBusiness.name}
                  onChange={(e) => setSelectedBusiness({ ...selectedBusiness, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="edit-location"
                  value={selectedBusiness.location}
                  onChange={(e) => setSelectedBusiness({ ...selectedBusiness, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditBusiness}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Business Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Business Details</DialogTitle>
          </DialogHeader>
          {selectedBusiness && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name:</Label>
                <span className="col-span-3">{selectedBusiness.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Location:</Label>
                <span className="col-span-3">{selectedBusiness.location}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Rating:</Label>
                <span className="col-span-3 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {selectedBusiness.rating.toFixed(1)}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Reviews:</Label>
                <span className="col-span-3">
                  <Badge variant="secondary">{selectedBusiness.reviewCount}</Badge>
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

