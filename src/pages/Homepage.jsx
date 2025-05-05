import { Link } from "react-router-dom";
import MainCategory from "../components/MainCategory";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = ()=>{
    return(
    <div className="mt-4 flex flex-col gap-4">
        <div className="flex gap-4">
            <Link to='/' className="text-blue-800">Home</Link>
            <span>|</span>
            <span>Blogs and Articles</span>
        </div>
        <div className="flex items-center justify-between gap-6">
            <div className="">
                <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">Welcome to aBlog!</h1>
                <p className="mt-8 text-md md:text-xl">Hey there! This is my blog where I post about whatever catches my interest — from cool ideas to random thoughts. Feel free to dive in, share the vibe, or let your own passions do the talking.</p>
            </div>
            <div className="hidden md:flex items-center justify-center gap-4 border-2 border-blue-800 p-4 rounded-lg">
                <div className="xl:animate-bounce text-center text-nowrap">Write your story</div>
                <Link to='/write' className="bg-blue-800 p-4 rounded-full text-white transition-all hover:scale-110 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 lg:size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            </Link>
            </div>
        </div>
        <MainCategory/>
        <FeaturedPosts/>
        <div className="">
            <h2 className="my-8 text-2xl text-gray-600">Recent posts</h2>
            <PostList/>
        </div>
    </div>)
}

export default Homepage;