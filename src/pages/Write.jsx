import {useAuth, useUser} from '@clerk/clerk-react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Upload } from '../components/Upload';


const Write = ()=>{
    const navigate = useNavigate()
    const {getToken} = useAuth()
    const [value,setValue] = useState('')
    const [cover,setCover] = useState('')
    const [img,setImg] = useState('')
    const [video,setVideo] = useState('')
    const [progress,setProgress] = useState(0)
    const {isLoaded,isSignedIn} = useUser();
    const {mutate,isPending,isError,error} = useMutation({
        mutationFn: async (newPost)=>{
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`,newPost,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res)=>{
            toast("Post has been created.")
            navigate(`/${res.data.slug}`)
        }
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            img:cover.filePath || "",
            title:formData.get("title"),
            desc:formData.get("desc"),
            category:formData.get("category"),
            content:value
        }
        mutate(data)
    }

    useEffect(()=>{
        img && setValue(prev=>prev+`<p><image src=${img.url} /></p>`)
    },[img])
    useEffect(()=>{
        video && setValue(prev=>prev+`<p><iframe class="ql-video" src=${video.url}/></p>`)
    },[video])
    
    // if(!isLoaded) return <div>Loading...</div>
    // if(isLoaded && !isSignedIn) return <div>Sign in to write a post.</div>
    return(
    <div className='h-[calc(100vh-64px)] md:h-[cal(100vh-80px)] flex flex-col gap-6'>
        <h1 className='text-xl font-light'>Create a new post</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
            <Upload type='image' setProgress={setProgress} setData={setCover}>
            <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover image</button>
            </Upload>
            <input type='text' className='text-4xl font-semibold bg-transparent outline-none' name='title' placeholder="My awesome story"/>
            <div className='flex gap-4 items-center'>
                <label htmlFor='category' className='text-sm'>Choose a category:</label>
                <select name='category' id='category' className='p-2 rounded-xl bg-white shadow-md'>
                    <option value='general'>General</option>
                    <option value='technology'>Technology</option>
                    <option value='art'>Art</option>
                    <option value='design'>Design</option>
                    <option value='nature'>Nature</option>
                </select>
            </div>
            <textarea name='desc' placeholder='A short description' className='p-4 rounded-xl bg-white shadow-md'/>
            <div className='flex flex-1'>
                <div className='flex gap-2 flex-col mr-2 mt-2'>
                    <Upload type='image' setProgress={setProgress} setData={setImg}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    </Upload>
                    <Upload type='video' setProgress={setProgress} setData={setVideo}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                    </Upload>
                </div>
            <ReactQuill theme="snow" className='flex-1 rounded-xl bg-white shadow-md' value={value} onChange={setValue} readOnly={0<progress && progress<100}/>
            </div>
            
            <button disabled={isPending || (0<progress && progress<100)} className='bg-blue-800 text-white rounded-xl p-2 w-36 mt-4 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed'>
                {isPending?"Loading...":"Send"}
            </button>
            {"Progress:"+progress}
            {/* {isError && <span>{error.message}</span>} */}
        </form>
    </div>)
}

export default Write;