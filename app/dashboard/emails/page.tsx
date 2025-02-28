"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, Star, ThumbsUp, Clock, AlertCircle, Filter, Paperclip } from "lucide-react"
 
import GenerateResponse from "../../../components/GenerateResponse"
import getResponseData from "../../../lib/getResponseData"

export default function EmailManagementPage() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [response, setResponse] = useState("")
  const [isResponse, setIsResponse] = useState(false)


  const emails = [
    {
      id: 1,
      from: "Alice Johnson",
      subject: "Order #1234 Inquiry",
      preview: "I have a question about my recent order...",
      status: "New",
      priority: "High",
      receivedAt: "2023-06-10T14:30:00Z",
    },
    {
      id: 2,
      from: "Bob Smith",
      subject: "Urgent Support Request",
      preview: "We need assistance with our account...",
      status: "Urgent",
      priority: "High",
      receivedAt: "2023-06-10T15:45:00Z",
    },
    {
      id: 3,
      from: "Charlie Brown",
      subject: "Newsletter Subscription",
      preview: "I would like to subscribe to your newsletter...",
      status: "Pending",
      priority: "Low",
      receivedAt: "2023-06-10T16:20:00Z",
    },
  ]

  const handleEmailSelect = (email) => {
    setSelectedEmail(email)
  }

  // const [formData, setFormData] = useState({
	// 	user_response: "",
		
	// })

	// const {user_response} =  formData 
  // console.log(user_response)

	// const inputChangeHandler = (e) => {
	// 	const { name, value } = e.target
	// 	setFormData((prevValue) => {
	// 		return {
	// 			...prevValue,
	// 			[name]: value
	// 		}
	// 	})

	// }

  const generateResponseSubmit = async(e)=>{
    e.preventDefault()
    console.log("Generating response: ")
  }

  const generateResponseForm = (e) => {
    e.preventDefault()
    console.log("Response Form: ")
    setIsResponse(true)
    getResponseData("http:localhost:5000/api/response/generate")
    
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-1/3 bg-white border-r overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 mb-4">
            <Input placeholder="Search emails..." className="flex-grow" />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>
          </Tabs>
        </div> <br/>
        <div className="overflow-y-auto  flex-grow">
          {emails.map((email) => (
            <Card
              key={email.id}
              className={`mb-2 mx-2 cursor-pointer transition-all hover:shadow-md ${selectedEmail?.id === email.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleEmailSelect(email)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={
                      email.status === "Urgent" ? "destructive" : email.status === "New" ? "default" : "secondary"
                    }
                  >
                    {email.status}
                  </Badge>
                  <Flag className={`h-4 w-4 ${email.priority === "High" ? "text-red-500" : "text-gray-400"}`} />
                </div>
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${email.from}`} />
                    <AvatarFallback>{email.from[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{email.from}</h3>
                    <p className="text-xs text-gray-600">{email.subject}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                <div className="flex items-center text-xs text-gray-400 mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(email.receivedAt).toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedEmail ? (
        <>
          <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Emails</h2>
          <p className="text-muted-foreground">Manage and respond to your customer Emails</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Emails</SelectItem>
              <SelectItem value="5">Inbox</SelectItem>
              <SelectItem value="4">Important</SelectItem>
              <SelectItem value="3">Sent</SelectItem>
              <SelectItem value="2">Spam</SelectItem>
            
            </SelectContent>
          </Select>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All
            <Badge className="ml-2 bg-primary/10 text-primary" variant="secondary">
              24
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending
            <Badge className="ml-2" variant="destructive">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="responded" className="relative">
            Responded
            <Badge className="ml-2 bg-primary/10 text-primary" variant="secondary">
              21
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {[
            {
              author: "Sarah Johnson",
              rating: 5,
              time: "2 minutes ago",
              status: "pending",
              content:
                "Amazing coffee and even better service! The staff was incredibly friendly and the atmosphere was perfect for getting some work done. Will definitely be coming back!",
            },
   
          ].map((review, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder-user-${i + 1}.jpg`} />
                      <AvatarFallback>
                        {review.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedEmail.from}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span>{selectedEmail.subject}</span>
                          {review.status === "pending" ? (
                            <Badge variant="destructive">
                              <Clock className="mr-1 h-3 w-3" />
                              Needs Response
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <ThumbsUp className="mr-1 h-3 w-3" />
                              Responded
                            </Badge>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">{review.content}</p> <br />
                    {isResponse == true ? <GenerateResponse/> : ""}

                  </div>
                  {review.response && (
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/logo.png" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Auto Response • 5 minutes ago</span>
                      </div>
                      <p className="text-sm">{review.response}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  {/* {review.status === "pending" ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span>Response needed within 24 hours</span> 
                      <br />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Response sent</span>
                    </div>
                  )} */}
                  <div className="flex gap-2">
                    {review.status === "pending" ? (
                      <>
                      
                        <Button  variant="outline" size="sm">
                          Generate Response
                        </Button>
                        <Button onClick={generateResponseForm} size="sm"> {isResponse == true ? "Send" : "Respond Manually"} </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                        <Button size="sm">Edit Response</Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
        </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Select an email from the inbox to view details.</p>
          </div>
        )}
      </div>
    </div>
  )
}

