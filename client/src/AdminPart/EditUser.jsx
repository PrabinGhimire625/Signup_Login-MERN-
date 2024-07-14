import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditUser = () => {
    const {id}=useParams()
    const [username, setUsername]=useState("")
    const [email, setEmail]=useState("")

    const navigate=useNavigate()

    const fetchUser= async()=>{
        try{
            const response= await axios.get(`http://localhost:3000/auth/singleUser/${id}`)
            const data=response.data.data
            setUsername(data.username)
            setEmail(data.email)
        }catch(err){
            console.log("User fetching error",err)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:3000/auth/edituser/${id}`,{username, email})
            alert("Successfully update the user")
            navigate("/userList/")
        }catch(err){
            console.log("Error",err)
        }
    }

    console.log(username)
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Edit the user
              </h1>
              <form onSubmit={handleSubmit}>
                  <div>
                      <label for="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input onChange={(e)=>(setUsername(e.target.value))} value={username} type="userName" name="userName" id="userName" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input onChange={(e)=>(setEmail(e.target.value))} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                  </div>
                
                  <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-7">Edit user</button>      
              </form>  
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default EditUser
