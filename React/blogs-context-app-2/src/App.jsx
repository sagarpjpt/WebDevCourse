import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import BlogPage from "./Pages/BlogPage";
import { useContext, useEffect } from "react"
import { AppContext } from "./context/AppContext"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom"

function App() {

  // consuming context(ie function to make api call)
  const {fetchBlogPosts} = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    
    const page = searchParams.get('page') ?? 1;
    console.log(page);
    console.log(location);
    if(location.pathname.includes('tags')){
      // tag wala page show karna hai
      const tag = location.pathname.split('/').at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag)
    }
    else if(location.pathname.includes('categories')){
      const category = location.pathname.split('/').at(-1).replaceAll("-"," ")
      fetchBlogPosts(Number(page), null, category)
    }
    else{
      fetchBlogPosts(Number(page));
    }

  }, [location.pathname, location.search]); // only made this call on first render

  return (
    // <div className="relative">
      
    //   <Header />

    //   <Blogs />

    //   <Pagination />

    // </div>

    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/blog/:blogId" element = {<BlogPage />} />
      <Route path="/tags/:tag" element = {<TagPage />} />
      <Route path="/categories/:category" element = {<CategoryPage />} />
      {/* i.e. this certain path hit then render the respective element */}
    </Routes>

  )
}

export default App
