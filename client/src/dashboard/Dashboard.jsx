import React from 'react'
import "../navbar/Navbar.css"
import { Link } from 'react-router-dom'
import { Button } from 'bootstrap'

const Dashboard = () => {
  return (
    <>
      
<div class="flex items-center justify-center  min-h-screen">
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
<h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
Admin DashBoard
</h5>
<p class="text-sm font-normal text-gray-500 dark:text-gray-400"> Admin can add and manage products, oversee user accounts, handle orders, manage categories, and ensure system integrity and security.</p>
<ul class="my-4 space-y-3">
<li>
<a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
<Link><button class="flex-1 ms-3 whitespace-nowrap">Add Product</button></Link>
</a>
</li>
<li>
<a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
<Link to="/userList"><button class="flex-1 ms-3 whitespace-nowrap">Manages user</button></Link>
</a>
</li>
<li>
<a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
<Link><button class="flex-1 ms-3 whitespace-nowrap">Track order</button></Link>
</a>
</li>
<li>
<a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
<Link><button class="flex-1 ms-3 whitespace-nowrap">Manages categories</button></Link>
</a>
</li>
<li>
<a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
<Link><span class="flex-1 ms-3 whitespace-nowrap">Others</span></Link>
</a>
</li>
</ul>
<div>
<a href="#" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
<svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
Why admin have all this power?</a>
</div>
</div>
</div>
    </>
    
  )
}

export default Dashboard
