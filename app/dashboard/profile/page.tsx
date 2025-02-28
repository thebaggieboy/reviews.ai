"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Briefcase, MapPin, Calendar, Phone } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings and personal information.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Owner at John's Coffee Shop</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-4">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Full Name</p>
                {isEditing ? (
                  <Input defaultValue="John Doe" className="mt-1" />
                ) : (
                  <p className="text-sm text-muted-foreground">John Doe</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                {isEditing ? (
                  <Input defaultValue="john@example.com" className="mt-1" />
                ) : (
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Business Name</p>
                {isEditing ? (
                  <Input defaultValue="John's Coffee Shop" className="mt-1" />
                ) : (
                  <p className="text-sm text-muted-foreground">John's Coffee Shop</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                {isEditing ? (
                  <Input defaultValue="New York, NY" className="mt-1" />
                ) : (
                  <p className="text-sm text-muted-foreground">New York, NY</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">January 2023</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                {isEditing ? (
                  <Input defaultValue="+1 (555) 123-4567" className="mt-1" />
                ) : (
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                defaultValue="Owner of John's Coffee Shop, passionate about serving the best coffee in town and creating a welcoming atmosphere for our customers."
                className="mt-1"
              />
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Owner of John's Coffee Shop, passionate about serving the best coffee in town and creating a welcoming
                atmosphere for our customers.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

