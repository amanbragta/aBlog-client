import { Link, useSearchParams } from 'react-router-dom';
import Search from './Search'
const SideMenu = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const handleFilterChange = (e)=>{
        if(searchParams.get("sort")!==e.target.value){
            setSearchParams((prev)=>{
                const newParams = new URLSearchParams(prev)
                newParams.set('sort',e.target.value)
                return newParams;
            })
            // setSearchParams({...Object.fromEntries(searchParams.entries()), sort:e.target.value})
        }
    }
    const handleCategory=(category)=>{
        if(searchParams.get("cat") !== category){
            setSearchParams((prev)=>{
                const newParams = new URLSearchParams(prev)
                newParams.set('cat',category)
                return newParams;
            })
            // setSearchParams({...Object.fromEntries(searchParams.entries()),cat:category})
        }
    }
    return(
        <div className="h-max sticky px-4 top-8">
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search/>
            <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
            <div className='flex flex-col gap-2 text-sm'>
                <label htmlFor='newest' className='flex gap-2 items-center cursor-pointer'>
                    <input type='radio' onChange={handleFilterChange} id='newest' name='sort' value='newest' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-full checked:bg-blue-800'/>
                    Newest
                </label>
                <label htmlFor='popular' className='flex gap-2 items-center cursor-pointer'>
                    <input type='radio' onChange={handleFilterChange} id='popular' name='sort' value='popular' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-full checked:bg-blue-800'/>
                    Most popular
                </label>
                <label htmlFor='trending' className='flex gap-2 items-center cursor-pointer'>
                    <input type='radio' onChange={handleFilterChange} id='trending' name='sort' value='trending' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-full checked:bg-blue-800'/>
                    Trending
                </label>
                <label htmlFor='oldest' className='flex gap-2 items-center cursor-pointer'>
                    <input type='radio' onChange={handleFilterChange} id='oldest' name='sort' value='oldest' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-full checked:bg-blue-800'/>
                    Oldest
                </label>
            </div>
            <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
            <div className='flex flex-col gap-2 text-sm'>
                <span className='underline cursor-pointer' onClick={()=>handleCategory("general")}>All</span>
                <span className='underline cursor-pointer' onClick={()=>handleCategory("technology")}>Technology</span>
                <span className='underline cursor-pointer' onClick={()=>handleCategory("art")}>Art</span>
                <span className='underline cursor-pointer' onClick={()=>handleCategory("design")}>Design</span>
                <span className='underline cursor-pointer' onClick={()=>handleCategory("nature")}>Nature</span>
            </div>
        </div>
    )
}

export default SideMenu;