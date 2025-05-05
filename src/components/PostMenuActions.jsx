import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostMenuActions = ({post})=>{
    const queryClient = useQueryClient()
    const {getToken} = useAuth()
    const navigate = useNavigate()
    const {user} = useUser()
    const isAdmin = user?.publicMetadata?.role === "admin" ||false;

    const {data:savedPosts, isPending, isError}=useQuery({
        queryKey:["savedPosts"],
        queryFn: async ()=>{
            const token = await getToken()
            return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
    const isSaved = savedPosts?.data?.some(p=>p===post._id) || false

    const saveMutation = useMutation({
            mutationFn: async () => {
                const token = await getToken();
                return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, {postId:post._id}, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
              },
              onMutate:(postId)=>{
                queryClient.cancelQueries(["savedPosts"])
                const prevData = queryClient.getQueryData(["savedPosts"])
                if(!isSaved){
                    queryClient.setQueryData(['savedPosts'],(oldData)=>{
                    return {...oldData, data: [...oldData.data, postId]}
                })
                } else{
                    queryClient.setQueryData(["savedPosts"],(oldData)=>{
                        const newList = oldData.data.filter(id=>id!=postId)
                        return {...oldData,data:[...newList]}
                    })
                }
                console.log(queryClient.getQueryData(["savedPosts"]))
                return prevData;
              },
            
            onError:(_err, _postId, context)=>{
                queryClient.setQueryData(["savedPosts"],context.prevData)
                toast.error("Failed to save post.")
            }
        })

    const mutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          },
        onSuccess: ()=>{
            toast.success("Deleted successfully.")
            navigate("/")
        },
        onError:(err)=>{
            toast.error(err.response.data)
        }
    })

    const featureMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`,{postId:post._id}, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["post",post.slug]})
        },
        onError:(err)=>{
            toast.error(err.response.data)
        }
    })

    const handleFeature=()=>{
        featureMutation.mutate()
    }

    const handleDelete = ()=>{
        mutation.mutate(post._id)
    }

    const toggleSave=()=>{
        if(!user) return navigate("/login")
        saveMutation.mutate(post._id)
    }

    return(
        <div className="">
            <h2 className="mt-8 mb-4 text-sm font-medium">Actions</h2>
            {isPending?"Loading..." : isError ? "There was an error" : 
            <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={toggleSave}>
               
                    <svg xmlns="http://www.w3.org/2000/svg" fill={!isSaved? "none":"black"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    {!isSaved ? <span>Save this post</span>: <span>Unsave post</span> }
            </div>
            }
            {isAdmin && <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleFeature}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={featureMutation.isPending? post.isFeatured? "none":"black" : post.isFeatured? "black":"none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
                <span>Feature</span>
                {featureMutation.isPending && <span className="text-xs">(in progress)</span>}
                </div>}
            {user && (post?.user?.username === user.username || isAdmin) && (
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer text-red-500" onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    
                <span>Delete this post</span>
                {mutation.isPending && <span className="text-xs">(in progress)</span>}
                </div>
            )}
            
        </div>
    )
}

export default PostMenuActions;