import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, Clock, AlertCircle } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">Manage and respond to your customer reviews</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
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
            {
              author: "Michael Chen",
              rating: 4,
              time: "1 hour ago",
              status: "responded",
              content:
                "Great atmosphere and good coffee. Slightly long wait times during peak hours but worth it. The pastries are fresh and delicious.",
              response:
                "Thank you for your feedback, Michael! We appreciate your patience during busy hours and we're glad you enjoyed our coffee and pastries. We're working on improving our service speed during peak times.",
            },
            {
              author: "Emily Rodriguez",
              rating: 3,
              time: "2 hours ago",
              status: "pending",
              content: "Decent coffee but the service was a bit slow today. Usually have a better experience here.",
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
                      <CardTitle className="text-base">{review.author}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span>{review.time}</span>
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
                    <p className="text-sm">{review.content}</p>
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
                  {review.status === "pending" ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span>Response needed within 24 hours</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Response sent</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {review.status === "pending" ? (
                      <>
                        <Button variant="outline" size="sm">
                          Generate Response
                        </Button>
                        <Button size="sm">Respond Manually</Button>
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
  )
}

