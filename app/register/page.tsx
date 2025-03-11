"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {selectUser, setUser} from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"


const googleAuth = async() => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/auth/callback";
  const scope = "openid email profile https://www.googleapis.com/auth/business.manage";
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  console.log("Google Client ID:", clientId); 
  window.location.href = authUrl;
};

export default function RegisterPage() {

  const router = useRouter()
  const dispatch = useDispatch()


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // For demo purposes, we'll just redirect to the dashboard
    router.push("/onboarding")
  }

	const [spinner, setSpinner] = useState(false)	
  const [formError, setFormError] = useState(null)
	
	const [formData, setFormData] = useState({
		companyName: "",
		email: "",
		password: ""
	})

	const { companyName, email, password } = formData
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
	function signUpSuccess() {
		// Set cookies
    dispatch(setUser({companyName, email, password}))
    console.log("User[STATE]: ", {companyName, email, password})
		router.push("/onboarding")
	}
	const submit = async (e) => {
		
		e.preventDefault();
		try {
			// if (password1 !== password2) {
			// 	throw { password: "Passwords do not match" }
			// }
			setSpinner(true)
			const url = "http://email-management-backend.onrender.com/api/register"
			const res = await fetch(url, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ companyName:companyName, email, password}),
                credentials: "include"

            })
            const data = await res.json()

            if (res.status >= 200 && res.status <= 209) {
            console.log("New User Registered.")
            console.log(data)
            setSpinner(false)
            //handleRegister()
            signUpSuccess()
            
           
                
            }
			
            const error = { ...data }
            throw error

			
		
		} catch (error) {
      setFormError(error)
			
			console.log("SIGNUP ERROR: ", error)
		}
	};

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
      
      <Card className="w-[350px]">
        {formError !== null ? <p className="bg-red-200 p-2 text-center text-xs text-black">User already exists</p> : ""}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details to create your account</CardDescription>
        </CardHeader>
        <form >
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Acme Inc."
              
                onChange={inputChangeHandler}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                
                onChange={inputChangeHandler}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password"  onChange={inputChangeHandler} />
            </div>
            {/* Password strength indicator would go here */}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-green-600" onClick={submit} >
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </div>
            <br />
            
          <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div> <br />
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
            </div>
          </CardFooter>

        </form>
      </Card>
    </div>
  )
}

