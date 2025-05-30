import Random from './components/Random'
import Tag from './components/Tag'


function App() {

  return (
    <div className="w-full min-h-screen flex flex-col background relative">
      
      <h1 className="background-random rounded-md text-black text-center
      w-[95%] mx-auto mt-10 py-4 text-3xl uppercase font-bold">Random Gifs</h1>

      <div className="flex flex-col py-10">

        <Random />
        <Tag />

      </div>

    </div>
  )
}

export default App
