import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, Zap, Clock, ThumbsUp, BarChart3, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import styles from "../styles/main.module.css"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{fontFamily:'Inter, Sans-serif', lineHeight:1}}>
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
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600" size="sm">Get Started</Button>
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
      <main className="flex-1 ">
        <section className="w-full py-12 md:py-24 lg:py-48  bg-green-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none">
                  AI-Powered Review Responses for Small Businesses
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Save time and improve customer satisfaction with intelligent, automated review responses.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-green-600 text-white">Start Free Trial</Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">The Core Problem</h2>
                <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Small businesses waste 5-10 hours/month manually responding to online reviews, risking reputation
                  damage with slow/poor responses.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-500" />
                    Time Wasted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">5-10 hours</p>
                  <p className="text-sm text-muted-foreground">per month spent on manual responses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-emerald-500" />
                    Reputation Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">High</p>
                  <p className="text-sm text-muted-foreground">due to slow or poor responses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-500" />
                    Lost Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Significant</p>
                  <p className="text-sm text-muted-foreground">potential customers lost to competitors</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="solution" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our MVP Solution</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AI-generated review responses that save time and improve customer satisfaction.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-emerald-500" />
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatically analyze review sentiment (positive/negative)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-emerald-500" />
                    Personalized Replies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Generate context-aware, personalized replies in seconds
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-emerald-500" />
                    One-Click Posting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Allow one-click posting to review platforms</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful tools to streamline your review management process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-emerald-500" />
                    Smart Review Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes review sentiment and key points to generate appropriate responses.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-emerald-500" />
                    Multiple Response Variations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Choose from 3 AI-generated response variations for each review.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-emerald-500" />
                    One-Click Responses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Post responses directly to Google My Business with a single click.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-500" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track your review response performance and customer satisfaction trends.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$29/mo</div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Up to 50 reviews/month
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Basic analytics
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Email support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$79/mo</div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Up to 200 reviews/month
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Custom</div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Unlimited reviews
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-emerald-500" />
                      24/7 dedicated support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses already saving time and improving customer satisfaction with review.ai.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg">Start Your Free Trial</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:py-12">
          <div className="flex flex-col gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MessageSquare className="h-6 w-6 text-emerald-500" />
              <span>review.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground">AI-powered review responses for small businesses.</p>
          </div>
          <nav className="md:ml-auto">
            <ul className="flex flex-wrap gap-4 sm:gap-6">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t">
          <div className="container flex flex-col gap-2 py-4 md:flex-row md:items-center md:py-6">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} review.ai. All rights reserved.
            </p>
            <nav className="md:ml-auto">
              <ul className="flex gap-4">
                <li>
                  <Link href="#" className="text-xs hover:underline">
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-xs hover:underline">
                    <span className="sr-only">GitHub</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

