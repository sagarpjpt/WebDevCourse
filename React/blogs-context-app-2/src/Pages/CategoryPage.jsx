import Blogs from "../components/Blogs";
import Header from "../components/Header"
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

function CategoryPage(){

    const navigation  = useNavigate();
    const location = useLocation();
    const category = location.pathname.split('/').at(-1);
    console.log('category' + category)

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
                    Blogs on <span className="text-md underline">{category}</span>
                </h2>
            </div>
            <Blogs/>
            <Pagination/>
        </div>
        
    )
}

export default CategoryPage