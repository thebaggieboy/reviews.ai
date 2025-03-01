'use client' 

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"


const googleAuth = async() => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  // Call the Next Api to get the Google Auth URL
  const redirectUri = "http://localhost:3000/api/auth/callback";
  const scope = "openid email profile https://www.googleapis.com/auth/gmail.readonly";
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  console.log("Google Client ID:", clientId); 
  window.location.href = authUrl;
};


export default function SignUpPage() {
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <MessageSquare className="h-6 w-6 text-emerald-500" />
            <CardTitle className="text-2xl font-bold">review.ai</CardTitle>
          </div>
          <CardDescription className="text-center">
            Create an account to start managing your reviews across Google, Yelp, and Trustpilot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
     
          <Button className="w-full" variant="outline">
            <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="#FF1A1A">
              <path d="M20.16 12.5c-.36-.3-3.45-2.36-3.45-6.75 0-3.53 2.15-5.4 2.26-5.47a.49.49 0 0 0 .17-.51.5.5 0 0 0-.41-.36c-.06-.01-1.44-.15-2.85-.15-1.82 0-3.31.45-4.43 1.34-.45.35-.81.75-1.09 1.18-.28-.43-.64-.83-1.09-1.18C8.2.21 6.71-.24 4.89-.24c-1.41 0-2.79.14-2.85.15a.5.5 0 0 0-.41.36.49.49 0 0 0 .17.51c.11.07 2.26 1.94 2.26 5.47 0 4.39-3.09 6.45-3.45 6.75a.5.5 0 0 0-.17.54.5.5 0 0 0 .44.3h4.97c.04.36.27 3.45 3.64 3.94V12.2a.47.47 0 0 0-.09-.29L6.18 7.02a.5.5 0 0 1 .15-.72.5.5 0 0 1 .68.15l2.41 3.56V3.75c0-.28.22-.5.5-.5s.5.22.5.5v6.26l2.41-3.56a.5.5 0 0 1 .68-.15c.23.14.3.44.15.72l-3.12 4.89a.47.47 0 0 0-.09.29v5.58c3.37-.49 3.6-3.58 3.64-3.94h4.97a.5.5 0 0 0 .44-.3.5.5 0 0 0-.17-.54z" />
            </svg>
            Sign up with Yelp
          </Button>
          <Button className="w-full" variant="outline">
            <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="#00B67A">
              <path d="M22.35 8.11l-5.72-.83L14.17 2a1.29 1.29 0 0 0-2.34 0L9.37 7.28l-5.72.83a1.29 1.29 0 0 0-.72 2.21l4.14 4.04-.98 5.7a1.29 1.29 0 0 0 1.88 1.36L12 18.86l5.03 2.56a1.29 1.29 0 0 0 1.88-1.36l-.98-5.7 4.14-4.04a1.29 1.29 0 0 0-.72-2.21z" />
            </svg>
            Sign up with Trustpilot
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

