import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../../features/user/userSlice";
import { selectUserEmail,  setUserEmail,  setUserEmailType } from "../../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../../features/token/tokenSlice";
import Head from "next/head"
import Loader from "../../../components/Loader";
import useLogin from "../../../hooks/useLogin";
import { useSearchParams } from 'next/navigation'

export default function Remove(){
    const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const user_email = useSelector(selectUserEmail);
	const token = useSelector(selectToken);

	const [decodedToken, setDecodedToken] = useState("")
	const [userType, setUserType] = useState("")
	const isBrand = useSelector(selectUserType) == USER_TYPES.brand
	const router = useRouter();
	const [formErr, setFormErr] = useState(null)
	const [searchQuery, setSearchQuery] = useState('');
	const [profileQuery, setProfileQuery] = useState([]);
	const searchParams = useSearchParams()
	const search = searchParams.get('user')

  async function logout() {
		try {
		
			document.cookie = ""

			dispatch(setToken(null))
			dispatch(setBrandToken(null))
			dispatch(setUserEmail(null))
			dispatch(setUser(null));
			dispatch(setBrandUser(null));
			setDecodedToken("")
		
		
			
			
		} catch (error) {
			console.log(error);
		}
	}
  const deleteUser = (url)=>{
    fetch(url, {method: "DELETE"})
    console.log("Deleted User!")
    logout()

  }

  useEffect(()=>{
    if(user == null ){
      router.push("/signup")
    } 
  }) 
return (
      <>
      

<section class="bg-white p-5 dark:bg-gray-900" style={{lineHeight:'100%', letterSpacing:3, fontFamily:'Poppins, Sans-serif'}}>
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 px-4">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Are you sure you want to delete?</h1>

      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <button onClick={deleteUser(`https://altclan-api.onrender.com/api/users/${user?.id}`)} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Yes, i'm sure
              <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </button>
          <a href={router.back()} class="py-3 px-5 sm:ms-4 text-sm font-medium text-blue-400 focus:outline-none bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
              Cancel
          </a>  
      </div>
  </div>
</section>

      </>
  )
}