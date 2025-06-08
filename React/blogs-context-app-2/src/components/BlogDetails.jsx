import { NavLink } from "react-router-dom"


function BlogDetails({post}){
    console.log(post);
    return(
        <div>
            <NavLink to={`/blog/${post.id}`} >
                <span className="title">{post.title}</span>
            </ NavLink>
            <p className="text-[15px] mt-1">
                By 
                <span className="italic">{post.author}</span> on 
                {" "} 
                <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
                    <span className="font-bold">{post.category}</span>
                </NavLink>
            </p>
            <p className="text-[15px]">Posted on {post.date}</p>
            <p className="mt-3 text-[17px]">{post.content}</p>
            <div className="flex gap-x-3 font-bold underline text-sm mt-1 flex-wrap">
                {
                    post.tags.map( (tag, index) => (
                        <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                            <span className="text-blue-700">{`#${tag}`}</span>
                        </NavLink>
                    ) )
                }
            </div>
        </div>
    )
}

export default BlogDetails