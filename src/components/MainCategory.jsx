import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategory = ()=>{
    return(
        <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
            <div className="flex-1 flex items-center justify-between flex-wrap">
                <Link to='/posts' className="bg-blue-800 rounded-full px-4 py-2 text-white">All posts</Link>
                <Link to='/posts?cat=technology' className="hover:bg-blue-50 rounded-full px-4 py-2">Technology</Link>
                <Link to='/posts?cat=nature' className="hover:bg-blue-50 rounded-full px-4 py-2">Nature</Link>
                <Link to='/posts?cat=art' className="hover:bg-blue-50 rounded-full px-4 py-2">Art</Link>
                <Link to='/posts?cat=design' className="hover:bg-blue-50 rounded-full px-4 py-2">Design</Link>
            </div>
            <span className="text-xl font-medium">|</span>
            <Search/>
        </div>
    )
}

export default MainCategory;