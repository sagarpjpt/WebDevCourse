import { useContext } from "react"
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";

function Blogs(){

    // step 3 ---> consuming context
    const {posts, laoding} = useContext(AppContext);
    console.log('printing posts after fetching from Blogs.jsx ---');
    console.log(posts);

    return(
        <div className="w-11/12 md:max-w-[700px] mx-auto p-4 py-8 flex flex-col gap-y-9 my-18">
            {
                laoding ? ( <Spinner /> ) : ( 
                    posts.length === 0 ? ( 
                        // <div className="w-full h-full flex items-center justify-center">
                        //     <p className="text-lg">No post found</p>
                        // </div>
                        <Spinner />
                     ) : (
                        // posts.map( (post) => { return <Card /> } )
                        posts.map( (post) => (
                            // no need to write return when u used (...) brackets
                            <div key={post.id}>
                                <p className="title">{post.title}</p>
                                <p className="text-[15px] mt-1">
                                    By <span className="italic">{post.author}</span> On <span className="font-bold">{post.category}</span> 
                                </p>
                                <p className="text-[15px]">Posted on <span>{post.date}</span></p>
                                <p className="mt-3 text-[17px]">{post.content}</p>
                                <div className="flex gap-x-3 font-bold underline text-sm mt-1 flex-wrap">
                                    {
                                        post.tags.map( (tag, index) => {
                                            // have to write return when used curly braces
                                            return <a key={index} className="text-blue-700" href="#">{`#${tag}`}</a>
                                        })
                                    }
                                </div>
                            </div>
                        ) )
                     )
                )
            }
        </div>
    )
}

export default Blogs