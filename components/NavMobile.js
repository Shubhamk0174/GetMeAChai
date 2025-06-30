"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const NavMobile = () => {
  const { data: session } = useSession()
  return (
    <nav className='    '>
      <div className=' sm:hidden '>

        {(session) &&
          <ul className='flex gap-4 flex-col items-center w-full relative top-4 '>
            <li><Link href={"/updatedashboard"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative min-w-40 px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Update Dashboard
              </span>
            </button></Link></li>




            <li><Link href={`/${session.user.email.split('@')[0]}`}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative min-w-40 px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Your Page
              </span>
            </button></Link></li>


            <li><button onClick={() => { signOut() }} className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative min-w-40 px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Logout
              </span>
            </button></li>


          </ul>



        }


        {(!session) &&
          <ul className='flex gap-4 flex-col items-center w-full relative top-4 '>
            <li><Link href={"/login"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative min-w-40 px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Login
              </span>
            </button></Link></li>


          </ul>}


      </div>
    </nav>
  )
}

export default NavMobile
