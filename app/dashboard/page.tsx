"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, BarChart3, Clock, MessageSquare, Star, ThumbsUp, TrendingUp, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { use, useEffect, useState } from "react"

import api from "@/lib/api"


import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";






interface Review {
  user: string;
  action: string;
  time: string;
  message: string;
  platform: string;
}

const reviewData = [
  { name: "Jan", reviews: 65 },
  { name: "Feb", reviews: 59 },
  { name: "Mar", reviews: 80 },
  { name: "Apr", reviews: 81 },
  { name: "May", reviews: 56 },
  { name: "Jun", reviews: 55 },
  { name: "Jul", reviews: 40 },
]

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const user = useSelector(selectUser);
  const [metrics, setMetrics] = useState(null);
  const searchParams = useSearchParams();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [thread, setThread] = useState(null);

 useEffect(()=>{
    async function fetchUser(){
     fetch('/api/auth/me')
     .then((res) => res.json())
     .then((data) => { 
        setLoggedInUser(data);
      })
    


    }
    fetchUser()


    async function fetchThread(){
      fetch('/api/email/replies')
      .then((res) => res.json())
      .then((data) => { 
         setThread(data);
       })
     
 
 
     }
     fetchThread()
 }, [user])
 console.log('user session', loggedInUser);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back, {loggedInUser?.name}! 👋</h2>
          <p className="text-sm text-muted-foreground">Here's what's happening with your reviews today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
       
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-3">
              <div className="text-2xl font-bold">98.2%</div>
              <div className="flex items-center text-sm text-emerald-500">
                <ArrowUp className="h-4 w-4" />
                4.3%
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>147/150 Reviews</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: "98.2%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-3">
              <div className="text-2xl font-bold">1.2h</div>
              <div className="flex items-center text-sm text-red-500">
                <ArrowDown className="h-4 w-4" />
                0.4h
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fastest</span>
                <span className="font-medium">2m</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Slowest</span>
                <span className="font-medium">4h 12m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review Volume</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-3">
              <div className="text-2xl font-bold">1,482</div>
              <div className="flex items-center text-sm text-emerald-500">
                <ArrowUp className="h-4 w-4" />
                22%
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">This week</span>
                  <span>42</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Last week</span>
                  <span>38</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Review Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reviewData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reviews" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  user: "Sarah Johnson",
                  action: "left a new 5-star review",
                  time: "2 minutes ago",
                  message: "Amazing coffee and even better service! The staff was incredibly friendly.",
                  platform: "Google",
                },
                {
                  user: "AI Assistant",
                  action: "responded to a review",
                  time: "5 minutes ago",
                  message:
                    "Thank you for your wonderful feedback! We're delighted to hear about your positive experience...",
                  platform: "Yelp",
                },
                {
                  user: "Michael Chen",
                  action: "left a new 4-star review",
                  time: "1 hour ago",
                  message: "Great atmosphere and good coffee. Slightly long wait times during peak hours.",
                  platform: "TripAdvisor",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder-user-${i + 1}.jpg`} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time} on {activity.platform}
                    </p>
                  </div>
                  {activity.platform === "Google" && (
                    <Badge variant="secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 48 48">
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                      </svg>
                      Google
                    </Badge>
                  )}
                  {activity.platform === "Yelp" && (
                    <Badge variant="secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 48 48">
                        <path
                          fill="#FF1A1A"
                          d="M20.6,27.4l-2.5,7.6c-0.4,1.1-1.4,1.9-2.6,1.9c-1.2,0-2.2-0.8-2.6-1.9l-2.5-7.6H20.6z"
                        />
                        <path
                          fill="#FF1A1A"
                          d="M22.4,21.8l7.6-2.5c1.1-0.4,2.3,0.2,2.7,1.3c0.4,1.1-0.2,2.3-1.3,2.7l-7.6,2.5L22.4,21.8z"
                        />
                        <path
                          fill="#FF1A1A"
                          d="M35.2,33.4l-7.6-2.5l1.4,4.2c0.4,1.1,1.4,1.9,2.6,1.9c1.2,0,2.2-0.8,2.6-1.9L35.2,33.4z"
                        />
                        <path
                          fill="#FF1A1A"
                          d="M25.6,26.2l2.5-7.6c0.4-1.1,1.4-1.9,2.6-1.9c1.2,0,2.2,0.8,2.6,1.9l2.5,7.6H25.6z"
                        />
                        <path
                          fill="#FF1A1A"
                          d="M12.8,14.6l7.6,2.5l-1.4-4.2c-0.4-1.1-1.4-1.9-2.6-1.9c-1.2,0-2.2,0.8-2.6,1.9L12.8,14.6z"
                        />
                      </svg>
                      Yelp
                    </Badge>
                  )}
                  {activity.platform === "TripAdvisor" && (
                    <Badge variant="secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" fill="#4CAF50" />
                        <path
                          fill="#FFFFFF"
                          d="M31.8,26.4c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1	C34.9,27.8,33.5,26.4,31.8,26.4z M31.8,30.7c-0.7,0-1.2-0.5-1.2-1.2c0-0.7,0.5-1.2,1.2-1.2c0.7,0,1.2,0.5,1.2,1.2	C33,30.2,32.5,30.7,31.8,30.7z"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M16.2,26.4c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1	C19.3,27.8,17.9,26.4,16.2,26.4z M16.2,30.7c-0.7,0-1.2-0.5-1.2-1.2c0-0.7,0.5-1.2,1.2-1.2c0.7,0,1.2,0.5,1.2,1.2	C17.4,30.2,16.9,30.7,16.2,30.7z"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M24,15.5c-2.6,0-4.7,2.1-4.7,4.7c0,2.6,2.1,4.7,4.7,4.7c2.6,0,4.7-2.1,4.7-4.7	C28.7,17.6,26.6,15.5,24,15.5z M24,22.9c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7c1.5,0,2.7,1.2,2.7,2.7	C26.7,21.7,25.5,22.9,24,22.9z"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M24,13.2c-6.4,0-11.7,4.8-12.5,11h4c0.7-4,4.2-7,8.5-7c4.3,0,7.8,3,8.5,7h4	C35.7,18,30.4,13.2,24,13.2z"
                        />
                      </svg>
                      TripAdvisor
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pending Reviews</p>
                    <p className="text-xs text-muted-foreground">3 reviews need your attention</p>
                  </div>
                  <Link href="/dashboard/reviews">
                    <Button size="sm">Review Now</Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">AI Response Templates</p>
                    <p className="text-xs text-muted-foreground">Customize your automated responses</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Analytics Report</p>
                    <p className="text-xs text-muted-foreground">View detailed insights</p>
                  </div>
                  <Link href="/dashboard/analytics">
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

