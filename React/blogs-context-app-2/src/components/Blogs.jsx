import { useContext } from "react"
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";

function Blogs(){

    // step 3 ---> consuming context
    const {posts, loading} = useContext(AppContext);
    console.log('printing posts after fetching from Blogs.jsx ---');
    console.log(posts);

    return(
        <div className="w-11/12 md:max-w-[700px] mx-auto p-4 py-8 flex flex-col gap-y-9 my-18">
            {
                loading ? ( <Spinner /> ) : ( 
                    posts.length === 0 ? ( 
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-lg">No post found</p>
                        </div>
                     ) : (
                        // posts.map( (post) => { return <Card /> } )
                        posts.map( (post) => (
                            <BlogDetails key={post.id} post={post} />
                        ) )
                     )
                )
            }
        </div>
    )
}

export default Blogs