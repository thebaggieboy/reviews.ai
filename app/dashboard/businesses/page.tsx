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
import { MapPin, Star, Plus, Edit, Eye, RefreshCcw, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, USER_TYPES } from "@/features/user/userSlice"

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
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const auth_type = USER_TYPES.custom

  const googleAuth = async() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    // Call the Next Api to get the Google Auth URL
    const redirectUri = "http://localhost:3000/api/auth/callback";
    const scope = "openid email profile https://www.googleapis.com/auth/gmail.readonly";
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
    console.log("Google Client ID:", clientId); 
    window.location.href = authUrl;
  };
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

  if(auth_type === USER_TYPES.custom){
    console.log("You have not synced your email yet")
  }else{
    console.log("You have not synced your email yet")
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600" >
            <RefreshCcw />Sync Email
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect your gmail account</DialogTitle>
             
            </DialogHeader> <br />
            <Button className="w-full" onClick={googleAuth} variant="outline">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="mr-2 h-5 w-5">
                               <path
                                 fill="#FFC107"
                                 d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                               />
                               <path
                                 fill="#FF3D00"
                                 d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                               />
                               <path
                                 fill="#4CAF50"
                                 d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                               />
                               <path
                                 fill="#1976D2"
                                 d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                               />
                             </svg>
                             Sign up with Google
                           </Button>
        
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>A list of all email accounts associated with your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
             
                <TableHead>Replies</TableHead>
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

