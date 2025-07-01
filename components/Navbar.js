"use client"
import React, { useEffect, useRef } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchuser } from '@/actions/useractions'
import NavMobile from './NavMobile'


const Navbar = () => {
  const { data: session } = useSession()
  
  const more = useRef()
  const morebtn = useRef()


  const moreClick = ()=>{
    if(more.current){
      if(more.current.classList.contains("-right-250")){
        more.current.classList.remove("-right-250")
        more.current.classList.add("right-0")
        setTimeout(() => {
          morebtn.current.src="/assets/navcross.svg"
        }, 250);
      }
      else{
        more.current.classList.remove("right-0")
        more.current.classList.add("-right-250")
        morebtn.current.src="/assets/more.svg"

      }
    }
  }



  return (
    <nav className=' bg-black text-white flex justify-between items-center h-12 px-7 '>

      <div className='logo'>
        <Link href={'/'} className=' text-2xl font-bold  flex item-center gap-2 pt-2'>
          <span>
            <lord-icon
              src="https://cdn.lordicon.com/pwbcwjje.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"

              style={{ width: "30px", height: "30px" }}>
            </lord-icon>
          </span>
          <span>Get Me A Chai</span>
        </Link>

      </div>

      <div className='hidden md:block'>

        {(session) &&
          <ul className='flex gap-4'>
            <li><Link href={"/"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Home
              </span>
            </button></Link></li>
            
            <li><Link href={"/updatedashboard"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Update Dashboard
              </span>
            </button></Link></li>
            



            <li><Link href={`/${session.user.email.split('@')[0]}`}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Your Page
              </span>
            </button></Link></li>


            <li><button onClick={() => { signOut() }} className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Logout
              </span>
            </button></li>

           


          </ul>



        }


        {(!session) &&
          <ul className='flex gap-4'>
            <li><Link href={"/"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Home
              </span>
            </button></Link></li>
            <li><Link href={"/about"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                About Us
              </span>
              
            </button></Link></li>
            <li><Link href={"/login"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
              <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
                Login
              </span>
            </button></Link></li>

            {/* <li><Link href={"/Signup"}><button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium -disabled:text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none -disabled:focus:ring-blue-300 focus:ring-blue-800">
            <span className="relative px-3 py-1 transition-all ease-in duration-75 -disabled:bg-white bg-gray-900 rounded-md group-hover:bg-transparent">
              SignUp
            </span>
            </button></Link></li> */}

          </ul>}

      </div>

      <div className='md:hidden' onClick={moreClick}>
            <img ref={morebtn}  src="/assets/more.svg" width={25} className='invert '  alt="" />
      </div>
      <div ref={more}  className='md:hidden  bg-black h-screen w-[250px] z-10 text-white p-2 fixed top-12 -right-250 transition-all duration-500 '>
        <NavMobile />
      </div>
    </nav>
  )
}

export default Navbar
