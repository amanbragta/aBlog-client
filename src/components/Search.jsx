import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Search = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams,setSearchParams] = useSearchParams()
    const handleKeyDown = (e)=>{
        if(e.key === "Enter"){
            const query = e.target.value;
            if(location.pathname === "/posts"){
                setSearchParams({...Object.fromEntries(searchParams), search:query})
            } else{
                navigate(`/posts?search=${query}`)
            }
        }
    }
    return(
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
        <input type="text" className="bg-transparent" placeholder="search a post..." onKeyDown={handleKeyDown}/>
        </div>
    )
}

export default Search;