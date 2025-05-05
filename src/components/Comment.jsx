import { useAuth, useUser } from "@clerk/clerk-react";
import {format} from "timeago.js"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = ({comment, postId})=>{
    const {user} = useUser()
    const {getToken} = useAuth()
    const role = user?.publicMetadata?.role || "user"
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
    mutationFn: async () => {
        const token = await getToken();
        return axios.delete(
          `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        toast.success("Comment deleted successfully");
      },
      onError: (error) => {
        toast.error(error.response.data);
      },
    });

    const handleDelete=()=>{
        deleteMutation.mutate()
    }

    return(
        <div className="p-4 bg-slate-50 rounded-xl mb-4">
            <div className="flex gap-4 items-center">
                {comment.user.img &&  <img src={comment.user.img} className='w-10 h-10 rounded-full object-cover'/>}
                <span className="font-medium">{comment.user.username}</span>
                <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
                {user && (comment?.user?.username === user.username || role==="admin") && <span className="text-xs cursor-pointer text-red-300 hover:text-red-600" 
                onClick={handleDelete}
                >Delete
                {deleteMutation.isPending && <span>(in progress)</span>}
                </span>}
            </div>
            <div className="mt-4">
                <p>{comment.desc}</p>
            </div>
        </div>
    )
}

export default Comment;