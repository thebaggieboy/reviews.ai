"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Mail } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {selectUser, setUser} from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"


const googleAuth = async() => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = "https://reviews-gray.vercel.app/api/auth/callback";
  const scope = "openid email profile https://www.googleapis.com/auth/business.manage";
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  console.log("Google Client ID:", clientId); 
  window.location.href = authUrl;
};

function connect(){
  console.log("Connecting to Google")
  
}

export default function LoginPage() {
 
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials and make an API call
    console.log("Logging in with:", email, password)
    // For demo purposes, we'll just redirect to the dashboard
    router.push("/dashboard")
  }
	const [spinner, setSpinner] = useState(false)	
	
	
  	

	const [formData, setFormData] = useState({

		email: "",
		password: ""
	})

	const { email, password } = formData
  console.log("Form Data: ", formData)

	const inputChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		})

	}
	function loginSuccess() {
		    // Set cookies
      
		router.push("/dashboard?user=success")
	}
	const submit = async (e) => {
		
		e.preventDefault();
		try {
			// if (password1 !== password2) {
			// 	throw { password: "Passwords do not match" }
			// }
			setSpinner(true)
			const url = "https://email-management-backend.onrender.com/api/login"
			const res = await fetch(url, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password}),
                credentials: "include"

            })
            // Response should be a jwt token
            const data = await res.json()

            if (res.status >= 200 & res.status <= 209) {
            console.log("user logged in.")
         
            dispatch(setUser(data))
            console.log("User[STATE]: ", data)
            setSpinner(false)
            loginSuccess()
           
                
            }
			
            const error = { ...data }
            throw error

			
		
		} catch (error) {
			 
			console.log("SIGNUP ERROR: ", error)
		}
	};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="grid gap-4">
            <Button variant="outline" onClick={googleAuth} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                
                onChange={inputChangeHandler}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password"  onChange={inputChangeHandler} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button onClick={submit} className="w-full bg-black" type="submit">
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm">
              <Link href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

