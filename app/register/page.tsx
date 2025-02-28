"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to register the user
    console.log("Registering:", { company, email, password })
    // For demo purposes, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

	const [spinner, setSpinner] = useState(false)	
	
	const [formData, setFormData] = useState({
		company: "",
		email: "",
		password: ""
	})

	const { company, email, password } = formData
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
		router.push("/accounts/login?user=success")
	}
	const submit = async (e) => {
		
		e.preventDefault();
		try {
			// if (password1 !== password2) {
			// 	throw { password: "Passwords do not match" }
			// }
			setSpinner(true)
			const url = "http://localhost:5000/api/register"
			const res = await fetch(url, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ company, email, password}),
                credentials: "include"

            })
            const data = await res.json()

            if (res.status >= 200 & res.status <= 209) {
            console.log("New User Registered.")
            console.log(data)
            setSpinner(false)
            signUpSuccess()
           
                
            }
			
            const error = { ...data }
            throw error

			
		
		} catch (error) {
			setFormErr(error)
			console.log("SIGNUP ERROR: ", error)
		}
	};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details to create your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
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
            <Button className="w-full" type="submit" onClick={submit} >
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

