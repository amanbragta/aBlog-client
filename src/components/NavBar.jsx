import { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

const NavBar = ()=>{
    const [open,setOpen] = useState(false)
    const {getToken} = useAuth()

    useEffect(()=>{
       getToken().then(()=>{})
    },[])
    return (
        <div className="w-full flex h-16 md:h-20 items-center justify-between">
            <Link to='/' className="flex items-center gap-4 text-2xl font-bold">
                <Image src='/logo.png' alt="Logo" w={32} h={32}/>
                <span>aBlog.</span>
            </Link>
            <div className="md:hidden">
                <div className="cursor-pointer" onClick={()=>setOpen(prev=>!prev)}>
                    {!open? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    }
                </div>
                <div className={`z-10 bg-[#e6e6ff] w-full h-screen flex flex-col items-center justify-center absolute top-16 gap-8 font-medium text-lg transition-all ease-in-out ${open? '-right-0':'-right-[100%]'}`}>
                <Link to='/'>Home</Link>
                <Link to='/'>Trending</Link>
                <Link to='/'>Most Popular</Link>
                <Link to='/'>About</Link>
                <SignedOut>
                <Link to='/login'>
                    <button className="py-2 px-4 bg-blue-800 rounded-3xl text-white">Login</button>
                </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to='/'>Home</Link>
                <Link to='/'>Trending</Link>
                <Link to='/'>Most Popular</Link>
                <Link to='/'>About</Link>
                <SignedOut>
                <Link to='/login'>
                    <button className="py-2 px-4 bg-blue-800 rounded-3xl text-white">Login</button>
                </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default NavBar;