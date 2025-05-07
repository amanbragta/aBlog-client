import { Link } from 'react-router-dom';
import Image from './Image.jsx'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {format} from "timeago.js"

const fetchFeatured = async ()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`)
    return data;
}

const FeaturedPosts = ()=>{
    const {isPending,data,isError,error} = useQuery({
        queryKey:["featuredPosts"],
        queryFn:()=>fetchFeatured()
    })
    const posts = data?.posts;
    if(!posts || posts.length === 0) return
    if(isPending) return <div>Loading...</div>
    if(isError) return <div>{error.message}</div>

    return (
        <div className='mt-6'>
            <h2 className='text-2xl text-gray-600'>Featured Posts</h2>
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
            {posts[0] && <Image src={posts[0].img} className='rounded-3xl object-cover' w='895'/>}
                <div className='flex items-center gap-4'>
                    <h2 className='font-semibold lg:text-lg'>01.</h2>
                    <Link to={`/posts?cat=${posts[0].category}`} className='text-blue-800 lg:text-lg'>{posts[0].category}</Link>
                    <span className='text-gray-500'>{format(posts[0].createdAt)}</span>
                </div>
                <Link to={`/${posts[0].slug}`} className='text-xl lg:text-3xl font-semibold lg:font-bold'>
                    {posts[0].title}
                </Link>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
                {posts[1] && <div className='lg:h-1/3 flex gap-4'>
                {posts[1].img && <div className='w-1/3 aspect-video'>
                <Image src={posts[1].img} className='rounded-3xl object-cover h-full w-full' w='298'/>
                </div>}
                <div className='w-2/3'>
                    <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                        <h2 className='font-semibold'>02.</h2>
                        <Link to={`posts?category=${posts[1].category}`} className='text-blue-800'>{posts[1].category}</Link>
                        <span className='text-gray-500 text-sm'>{format(posts[1].createdAt)}</span>
                    </div>
                    <Link to={`/${posts[1].slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
                    
                    {posts[1].title}</Link>
                </div>
                </div>}
                
                {posts[2] && <div className='lg:h-1/3 flex gap-4'>
                {posts[2].img && <div className='w-1/3 aspect-video'>
                <Image src={posts[2].img} className='rounded-3xl object-cover h-full w-full' w='298'/>
                </div>}
                <div className='w-2/3'>
                    <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                        <h2 className='font-semibold'>03.</h2>
                        <Link to={`posts?category=${posts[2].category}`} className='text-blue-800'>{posts[2].category}</Link>
                        <span className='text-gray-500 text-sm'>{format(posts[2].createdAt)}</span>
                    </div>
                    <Link to={`/${posts[2].slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
                    
                    {posts[2].title}</Link>
                </div>
                </div>}
                {posts[3] && <div className='lg:h-1/3 flex gap-4'>
                {posts[3].img && <div className='w-1/3 aspect-video'>
                <Image src={posts[3].img} className='rounded-3xl object-cover h-full w-full' w='298'/>
                </div>}
                <div className='w-2/3'>
                    <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                        <h2 className='font-semibold'>04.</h2>
                        <Link to={`posts?category=${posts[3].category}`} className='text-blue-800'>{posts[3].category}</Link>
                        <span className='text-gray-500 text-sm'>{format(posts[3].createdAt)}</span>
                    </div>
                    <Link to={`/${posts[3].slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
                    
                    {posts[3].title}</Link>
                </div>
                </div>}
            </div>
        </div>
        </div>
    )
}

export default FeaturedPosts;