"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser, updateprofile } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify';


const Dashboard = () => {

    const { data: session, status, update } = useSession()

    const router = useRouter()
    const [form, setform] = useState({ name: "", email: "", username: "", profilePicture: "", coverPicture: "", razorpayid: "", razorpaysecret: "" })


    const getData = useCallback(async () => {
        if (session) {
            const u = await fetchuser(session.user.id);
            setform(u);
        }
    }, [session]);

    useEffect(() => {
        getData()
        if (status === "loading") {
            return;
        }
        if (!session) {
            router.push('/login')
        }

    }, [session, status, router, getData])


    const handleChange = (e) => {
        setform({ ...form, [e.target.id]: e.target.value })
    }

    useEffect(() => {


    }, [form])


    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let a = await updateprofile(form, session.user.id);
        toast('Profile Updated Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 md:w-[80vw] lg:w-[40vw] mx-auto my-2 p-4'>
                    <h1 className='text-center text-2xl font-bold'>Welcome to your Dashboard</h1>

                    <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="name">Name</label>
                        <input onChange={handleChange} value={form.name || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Enter Name' id='name' />
                    </div>

                    <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="email">Email</label>
                        <input onChange={handleChange} value={form.email || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Enter Email' id="email" />
                    </div>
                    {/* <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="username">Username</label>
                        <input onChange={handleChange} value={form.username || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Enter Username' id="username" />
                    </div> */}
                    <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="profilePicture">Profile Picture Link</label>
                        <input onChange={handleChange} value={form.profilePicture || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Profile Picture' id="profilePicture" />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="coverPicture">Cover Picture Link</label>
                        <input onChange={handleChange} value={form.coverPicture || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Cover Picture' id='coverPicture' />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="razorpayid">Rasopay Id</label>
                        <input onChange={handleChange} value={form.razorpayid || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Rasopay id' id='razorpayid' />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <label className='font-bold' htmlFor="razorpaysecret">Rasopay Secret</label>
                        <input onChange={handleChange} value={form.razorpaysecret || ""} className='border px-2 rounded-md outline-blue-400' type="text" placeholder='Rasopay Secret' id="razorpaysecret" />
                    </div>
                    <input type="submit" className=' bg-blue-500  min-h-8 text-white font-bold rounded-full cursor-pointer' />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}



export default Dashboard
