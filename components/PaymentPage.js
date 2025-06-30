"use client"
import { useState, useEffect, useCallback } from 'react'
import React from 'react'
import Script from 'next/script'
import { fetchuser, initiate, fetchpayments } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { redirect } from 'next/dist/server/api-utils'
import { useSearchParams, notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'



const PaymentPage = ({ params }) => {



    const { username } = React.use(params);

    const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", email: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])

    const router = useRouter()

    const searchParams = useSearchParams();
    const gatData = useCallback(async (username) => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
    }, []);

    useEffect(() => {
        gatData(username);
    }, [gatData, username]);


    const handleChange = (e) => {
        setPaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Payment Recieved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            toast('Thankyou for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            router.push(`/${username}`)
        }
    }, [router, searchParams, username])







    const pay = async (amount) => {

        let a = await initiate(amount, username, paymentform)
        let orderId = a.id;

        var options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            "amount": amount * 100, // amount in paise
            "currency": "INR",
            "name": "Get me a Chai",
            "description": "Test Transaction",
            "image": "/assets/dp.png",
            "order_id": orderId,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,


            "prefill": {
                "name": "",
                "email": "",
                "contact": ""
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        if (typeof window !== "undefined" && window.Razorpay) {
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            alert("Razorpay SDK not loaded");
        }
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />


            <div>
                <div className="banner flex-col flex items-center justify-center h-fit w-full">
                    <div className=" relative w-full flex items-center justify-center ">
                        <div className="overflow-hidden relative w-full h-[25vh] sm:h-[35vh] md:h-[45vh]">
                            <img
                                className="object-cover w-full h-full"
                                src={currentUser.coverPicture || "/assets/banner.jpg"}
                                alt="Profile Picture link not working"
                            />
                        </div>
                        <div className="w-28 h-28 absolute bottom-0 ">
                            <img
                                src={currentUser.profilePicture || "/assets/dp.png"}
                                alt="Profile Picture link not working"
                                className="logo border absolute h-28 w-28 rounded-full -bottom-[50%] "
                            />
                        </div>
                    </div>
                    <div className="mt-14">
                        <div className="text-2xl font-semibold">
                            <p>@{username}</p>
                        </div>
                    </div>

                    <div className="text-sm opacity-70 text-center m-1">
                        <p>Lets help {username} get a chai!</p>
                        <p>{payments.length} Payments &bull; ₹ {payments.reduce((a, b) => a + b.amount, 0)} raised</p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row w-[80vw] gap-4 justify-self-center m-4 h-full'>
                    <div className='border flex-1 max-h-[25rem] rounded-2xl flex flex-col'>

                        <h1 className='text-xl font-semibold m-4 mb-1'>Supporters</h1>

                        <div className='flex-1 overflow-auto ml-2 mb-3 custom-scrollbar  '>
                            {payments.length === 0 && <div className='text-center text-lg font-semibold'>No Supporters Yet</div>}
                            {payments.map((p, i) => (
                                <div key={p.oid} className=' flex mx-4 m-0.5 min-h-14 '>
                                    <span className='min-w-[50px]  flex items-start mt-1.5 justify-center'><img src="/assets/dp.png" width="54px" height="54px" alt="" className='rounded-full mr-1 flex items-center' />
                                    </span>
                                    <div className='flex flex-col justify-center ml-4'>
                                        <span className='text-lg font-semibold'>{p.name}</span>
                                        <div className='text-sm text-opacity-70 text-justify'>
                                            <span className=''>Donated </span><span className='font-bold text-opacity-100'>₹{p.amount}</span><span> with a message &quot;</span>{p.message}<span></span><span>&quot;</span>
                                        </div>
                                    </div>

                                </div>
                            ))
                            }


                        </div>

                    </div>

                    <div className='border flex-1 h-[25rem] rounded-2xl '>
                        <div className=' payments m-4 mr-7'>
                            <h1 className='text-xl font-semibold ml-2'>Payments</h1>
                            <div>
                                <form action="" className='flex flex-col'>

                                    <input onChange={handleChange} name='name' value={paymentform.name || ""} type="text" placeholder='Name' className='border m-2 w-full rounded-4xl p-2 pl-5' />
                                    <input onChange={handleChange} type="text" value={paymentform.email || ""} placeholder='Email' name="email" className='border m-2 w-full rounded-4xl p-2 pl-5' />
                                    <input onChange={handleChange} name='message' value={paymentform.message || ""} type="text" placeholder='Message' className='border m-2 w-full rounded-4xl p-2 pl-5' />
                                    <input onChange={handleChange} name='amount' value={paymentform.amount || ""} type="text" placeholder='Amount' className='border m-2 w-full rounded-4xl p-2 pl-5' />


                                </form>
                                <button
                                    type="button"
                                    onClick={() => { pay(Number.parseInt(paymentform.amount)) }}
                                    className={`border m-2 w-full rounded-4xl p-2 pl-5 bg-blue-500 text-white ${(
                                        Number(paymentform.amount) < 1 ||
                                        paymentform.name.length < 3 ||
                                        paymentform.message.length < 3 ||
                                        paymentform.email.length < 3
                                    ) ? 'opacity-50' : ''}`}
                                    disabled={
                                        Number(paymentform.amount) < 1 ||
                                        paymentform.name.length < 3 ||
                                        paymentform.message.length < 3 ||
                                        paymentform.email.length < 3
                                    }
                                >
                                    Submit
                                </button>
                                <div className=' flex flex-wrap justify-center  gap-4  w-full rounded-4xl p-2 pl-5 '>
                                    <button className='border px-7 py-2 rounded-4xl bg-black text-white ' onClick={() => setPaymentform({ ...paymentform, amount: 10 })} >₹ 10</button>
                                    <button className='border px-7 py-2 rounded-4xl bg-black text-white ' onClick={() => setPaymentform({ ...paymentform, amount: 20 })} >₹ 20</button>
                                    <button className='border px-7 py-2 rounded-4xl bg-black text-white ' onClick={() => setPaymentform({ ...paymentform, amount: 50 })}>₹ 50</button>
                                    <button className='border px-7 py-2 rounded-4xl bg-black text-white ' onClick={() => setPaymentform({ ...paymentform, amount: 100 })} >₹ 100</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />

        </>
    )

}

export default PaymentPage
