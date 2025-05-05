import PostListItem from "./PostListItem";
import {useInfiniteQuery} from "@tanstack/react-query"
import axios from 'axios'
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fetchPosts = async (pageParam,searchParams)=>{
    const searchObj = Object.fromEntries(searchParams)
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
        params:{page:pageParam,limit:5, ...searchObj}
    })
    return data
}

const PostList = ()=>{
    const {ref,inView} = useInView()
    const [searchParams,setSearchParams] = useSearchParams()
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isPending
      } = useInfiniteQuery({
        queryKey: ['posts',searchParams.toString()],
        queryFn: ({pageParam})=>fetchPosts(pageParam,searchParams),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.hasMore? pages.length+1:undefined,
      })
    
      useEffect(()=>{
        if(inView){fetchNextPage()
        }
      },[inView,fetchNextPage])

   
    return (
    <div>
      {isPending && <span>Loading...</span>}
         {data?.pages.map((pageData) => {
          return pageData.posts.map((post)=><PostListItem key={post._id} post={post} />)
         }
         )
         }
         <div className="h-2" ref={ref}>{isFetchingNextPage && <span>Loading...</span>}</div>
    </div>
  );
};

export default PostList;