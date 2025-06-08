import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

function TagPage(){

    const navigation  = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split('/').at(-1);
    console.log('tag' + tag)

    return(
        <div>
            <Header />
            <div className="mt-22 -mb-24 w-11/12 md:max-w-[700px] mx-auto p-4 flex flex-row gap-x-4 items-center">
                <button onClick={() => navigation(-1)}
                    className="bg-gray-500 px-4 py-2 border-1 rounded-md text-white font-bold capitalize cursor-pointer"    
                >
                    back
                </button>
                <h2 className="font-bold text-[1.3rem]">
                    Blogs Tagged <span className="text-blue-700 text-md underline">#{tag}</span>
                </h2>
            </div>
            <Blogs/>
            <Pagination/>
        </div>
    )
}
export default TagPage