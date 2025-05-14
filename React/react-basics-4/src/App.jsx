import { useEffect, useState } from "react"


function App() {
  
  const [text, setText] = useState('')

  function changeHandler(event) {
    // console.log(text);
    setText(event.target.value)
  }

// on every render
  // useEffect( () => {
  //   console.log("UI RENDERING DONE");
  //   console.log(text);
  // })

// on first render
  // useEffect( () => {
  //   console.log('UI RENDERING')
  //   console.log('text is ' +  text);
  // }, []);

// first render + whenever dependency changes
  // useEffect( () => {
  //   console.log('change observed')
  // }, [text]);

// to handle unmounting of a component
  useEffect( () => {
    console.log('listner added')

    return () => {
      console.log('Listner Removed')
    }
  }, [text])

  return (
    <div className='App'>
      <input type="text" onChange={changeHandler}/>
    </div>
  )
}

export default App
