import { apiUrl, filterData } from './data'
import Navbar from './components/Navbar'
import Filter from './components/Filter'
import Cards from './components/Cards'
import { useEffect } from 'react'
import { useState } from 'react'
import Spinner from './components/Spinner'
import { toast } from 'react-toastify'

function App() {

  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [catagory, setCatagory] = useState(filterData[0].title);

  // api call using useEffect
  useEffect(() => {

    async function fetchData() {
      try {

        const res = await fetch(apiUrl);
        const output = await res.json();

        // save data into a variable
        // console.log(output)

        setCourses(output.data);

      }
      catch (error) {
        toast.error('something went wrong');
      }

      setLoading(false);
    }

    fetchData();

  }, []);

  console.log('printing courses')
  console.log(courses);

  return (
    <div className='min-h-screen flex flex-col bg-mainBg'>

      <Navbar />

      <Filter
        filterData={filterData}
        catagory = {catagory}
        setCatagory = {setCatagory}
      />

      {
        loading ? (<Spinner />) : ( <Cards courses={courses} category = {catagory} />)
      }

    </div>
  )
}

export default App;
