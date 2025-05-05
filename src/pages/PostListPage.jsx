import { useState } from 'react';
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu';
const PostListPage = ()=>{
    const [open,setOpen] = useState(false)
    return(
    <div className="">
        <h1 className="mb-8 text-2xl">Development blog</h1>
        <button onClick={()=>setOpen(prev=>!prev)} className='bg-blue-800 text-sm text-white rounded-2xl md:hidden mb-4 px-4 py-2'>{open? 'Close':"Filter or Search"}</button>
        <div className="flex justify-between flex-col-reverse md:flex-row">
            <div className=''>
                <PostList/>
            </div>
            <div className={`${open? 'block':'hidden'} md:block`}>
                <SideMenu/>
            </div>
        </div>
    </div>)
}

export default PostListPage;