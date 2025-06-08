import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

// step 1 ---> context creation
export const AppContext = createContext();

function AppContextProvider({children}) //here children represent that component or components / tags
// which is listed under the tag <AppContextProvider> ... </AppContextProvider> i.e. <App /> component here
{
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    // data filling pending now via api calls
    async function fetchBlogPosts(page = 1, tag = null, category){
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url += `&tag=${tag}`;
        }
        if(category){
            url += `&category=${category}`;
        }
        // console.log('printing url --->')
        // console.log(url)
        try{
            const result = await fetch(url);
            const data = await result.json();
            console.log('printing data after fetching api')
            console.log(url);
            console.log(data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages)
        }
        catch(e){
            console.error('while fetching data some error occured!')
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false)
    }

    //handle when next and prev button are clicked
    function handlePageChange(page){
        navigate( {search: `?page=${page}`});
        setPage(page);
        // fetchBlogPosts(page);
    }

    // all these context(data and functions) has to pass to consumer of context... 
    const value = {
        posts,
        setPosts, 
        loading, 
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    }

    // step 2 ----> context provided to children i.e. <App /> component here
    return(
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    ) 
    
}

export default AppContextProvider;