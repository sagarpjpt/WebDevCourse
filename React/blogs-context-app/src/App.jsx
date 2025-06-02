import Header from "./components/Header"
import Blogs from "./components/Blogs"
import Pagination from "./components/Pagination"
import { useContext, useEffect } from "react"
import { AppContext } from "./context/AppContext"

function App() {

  // consuming context(ie function to make api call)
  const {fetchBlogPosts} = useContext(AppContext);

  useEffect(() => {
    fetchBlogPosts(1);
  }, []); // only made this call on first render

  return (
    <div className="relative">
      
      <Header />

      <Blogs />

      <Pagination />

    </div>
  )
}

export default App
