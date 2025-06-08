import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import BlogDetails from "../components/BlogDetails";

function BlogPage(){

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([])
    const location = useLocation();
    const navigation = useNavigate();

    console.log(location.pathname)
    const blogId = location.pathname.split("/").at(-1);
    console.log(blogId)

    const {setLoading, loading} = useContext(AppContext);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`
        console.log(url)
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data)

            setBlog(data.blog)
            setRelatedBlogs(data.relatedBlogs)
        }
        catch(error){
            console.log("error while fetching relatedblog")
            setBlog(null)
            setRelatedBlogs([])
        }
        setLoading(false)
    }

    useEffect( () => {
        if(blogId){
            fetchRelatedBlogs();
        }
    }, [location.pathname] )

    return(
        <div>
            <Header />
            <div className="mt-22 -mb-24 w-11/12 md:max-w-[700px] mx-auto p-4 flex flex-row gap-x-4 items-center">
                <button onClick={() => navigation(-1)}
                    className="bg-gray-500 px-4 py-2 border-1 rounded-md text-white font-bold capitalize cursor-pointer"
                >
                    back
                </button>
            </div>
            {
                loading ? (<Spinner />) : blog ? ( 
                    <div className="w-11/12 md:max-w-[700px] mx-auto p-4 py-8 flex flex-col gap-y-9 my-18">
                        <BlogDetails post={blog} />
                        <h2 className="font-bold text-3xl">Related Blogs</h2>
                        {
                            relatedBlogs.map( (relatedBlog) => (
                                <div key={relatedBlog.id}>
                                    <BlogDetails post={relatedBlog} />
                                </div>
                            ) )
                        }
                    </div>
                 ) : ( 
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-lg">No post found</p>
                    </div>
                  )
            }
        </div>
    )
}

export default BlogPage