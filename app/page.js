"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const router = useRouter()



  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[47vh] gap-5 p-7">
        <div className="flex flex-col justify-center items-center gap-1 ">
          <div className="text-5xl text-center sm:flex gap-4 sm:items-center sm:justify-center">Get me a Chai <span className="relative bottom-1 flex justify-center items-center md:mt-0 mt-4">
            <lord-icon
              src="https://cdn.lordicon.com/pwbcwjje.json"
              trigger="loop"
              style={{ height: "50px", width: "50px" }}>
            </lord-icon></span></div>
          <p className="opacity-70 text-center ">A crowdfunding platform for creators. Get funded by your fans and followers</p>
        </div>
        <div className="flex gap-4">
          <Link href={"/login"}>
          <button className="border border-black py-1 px-4 rounded-lg hover:text-white hover:bg-black cursor-pointer ">
            Start Now
          </button>
          </Link>

          <Link href={"/about"}>
          <button className="border border-black py-1 px-4 rounded-lg hover:text-white hover:bg-black cursor-pointer">
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="h-0.5 mt-4 bg-black opacity-10"></div>

      <div className="p-4 my-5 flex flex-col justify-center items-center gap-8 ">
        <h1 className="text-3xl font-semibold text-center">Your Fans Can buy you a Chai</h1>
        <div className=" lg:flex space-y-10 w-[70vw] justify-around gap-14">


          <div className="flex flex-col justify-center items-center">
            <div className="p-4 border w-[100px] h-[100px] rounded-full ">
              <lord-icon
                src="https://cdn.lordicon.com/yycecovd.json"
                trigger="loop"
                style={{ width: "100%", height: "100%" }}
              >
              </lord-icon>
            </div>
            <p className="text-center">Your fans want to help</p>
            <p className="text-center">Your fans are available to help you</p>
          </div>


          <div className="flex flex-col justify-center items-center">
            <div className="p-4 border w-[100px] h-[100px] rounded-full ">
              <lord-icon
                src="https://cdn.lordicon.com/dnupukmh.json"
                trigger="loop"
                style={{ width: "100%", height: "100%" }}
              >
              </lord-icon>
            </div>
            <p className="text-center">Your fans want to help</p>
            <p className="text-center">Your fans are available to help you</p>
          </div>


          <div className="flex flex-col justify-center items-center">
            <div className="p-4 border w-[100px] h-[100px] rounded-full ">
              <lord-icon
                src="https://cdn.lordicon.com/fqbvgezn.json"
                trigger="loop"
                style={{ width: "100%", height: "100%" }}
              >
              </lord-icon>
            </div>
            <p className="text-center">Your fans want to help</p>
            <p className="text-center">Your fans are available to help you</p>
          </div>

        </div>
      </div>
      <div className="h-0.5 mt-4 bg-black opacity-10"></div>

      <div className="p-4 my-5 flex flex-col justify-center items-center gap-8">
        <h1 className="text-3xl font-semibold text-center">Learn More About Us</h1>
        <div className="flex w-[70vw] justify-around gap-14">


          <iframe className="min-w-[160px]  sm:w-[350px] sm:h-[196px] md:w-[560px] md:h-[315px] aspect-video " src="https://www.youtube.com/embed/LNeS-JizfN4?si=-4F3QcdSIRVC1yFX" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        </div>
      </div>
    </>
  );
}


