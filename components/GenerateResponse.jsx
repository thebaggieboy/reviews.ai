import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"


export default function GenerateResponse() {
    const [formData, setFormData] = useState({
      user_response: "",
      
    })
  
    const {user_response} =  formData 
    console.log("formData", formData)
  
    const inputChangeHandler = (e) => {
      const { name, value } = e.target
      setFormData((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        }
      })
  
    }
    return (


      
     <>
     <div>
                <label className="mb-3 block text-black font-bold dark:text-white">
                  Response
                </label>
                <textarea
                onChange={inputChangeHandler}
                name="user_response"
                id="user_response"
                  rows={6}
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
   <br/>
     </>
    )
  }
  