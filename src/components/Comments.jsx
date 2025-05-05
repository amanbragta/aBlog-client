import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import axios from "axios";
import {useAuth,useUser} from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const fetchComments = async (postId)=>{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return data
}

const Comments = ({postId})=>{
    const {getToken}=useAuth()
    const queryClient = useQueryClient()
    const {user} = useUser();
    const {data,isPending,isError} = useQuery({
        queryKey:["comments",postId],
        queryFn:()=>fetchComments(postId)
    })

    const {mutate} = useMutation({
        mutationFn: async (newComment)=>{
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`,newComment,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onMutate: async (newComment)=>{
            await queryClient.cancelQueries(["comments",postId])
            const prevData = queryClient.getQueryData(["comments",postId])
            queryClient.setQueryData(["comments",postId], (oldData)=>{
                return [{...newComment, _id : oldData.length+1, createdAt: new Date(), user:{
                    img:user.imageUrl,
                    username:user.username
                }}, ...oldData
                ]
            })
            return prevData
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(["comments",postId])
        },
        onError:(_error,_newComment, context)=>{
            queryClient.setQueryData(["comments",postId],context.prevData)
            toast.error("Failed to post comment.")
        }
    })

    const handleForm = e =>{
        e.preventDefault();
        if(!user){
            toast.error("Login to comment.")
            return
        }
        const formData = new FormData(e.target)
        const data = {
            desc:formData.get("desc")
        }
        mutate(data)
    }
    return(
        <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
            <h2 className="text-gray-500 text-xl underline">Comments</h2>
            <form onSubmit={handleForm} className="flex items-center justify-between gap-8 w-full">
                <textarea name="desc" placeholder="Write a comment..." className="w-full rounded-xl p-4"/>
                <button className="bg-blue-800 text-white rounded-xl py-4 px-4 font-medium">Send</button>
            </form>
            {isPending? "Loading..." : isError ? "Error loading comments..." : 
            (
                <>
                    {data?.map(comment=>(<Comment key={comment._id} comment={comment} postId={postId}/>))}
                </>
            )
            }
        </div>
    )
}

export default Comments;