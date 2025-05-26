import { Routes, Route, NavLink} from 'react-router-dom'
import Home from './Components/Home'
import Support from './Components/Support'
import About from './Components/About'
import Labs from './Components/Labs'
import NotFound from './Components/NotFound'
import MainHeader from './Components/MainHeader'
// import { NavLink } from 'react-router-dom'

function App() {

  return (
    <div className="App">

      {/* as path of diff page not known by user so add nav NavLinks to all these components */}

      {/* <nav>
        <ul>
          <li>
            <Link to = '/'>Home</Link>
          </li>
          <li>
            <Link to = '/about'>About</Link>
          </li>
          <li>
            <Link to = '/support'>Support</Link>
          </li>
          <li>
            <Link to = '/labs'>Labs</Link>
          </li>
        </ul>
      </nav> */}

      {/* link vs navLink ---> using navLink when cliked on link than it adds a class='active' in that navLink 
        i.e. <a href='' class='active'>link name</a> see inspect to verify helps to identify clicked element
        so then can add css file to active class clicked link
      */}

      <nav>
        <ul>
          <li>
            <NavLink to = '/'>Home</NavLink>
          </li>
          <li>
            <NavLink to = '/about'>About</NavLink>
          </li>
          <li>
            <NavLink to = '/support'>Support</NavLink>
          </li>
          <li>
            <NavLink to = '/labs'>Labs</NavLink>
          </li>
        </ul>
      </nav>

      {/* nesting routing  
        by default parent route ele wont let the child route to render
        so in order to render child have to use <Outlet/> in Home ie. parent component
      */}
      <Routes>
        <Route path='/' element = {<MainHeader />}>
          {/* yaha index likhne ka matlb ye hai ki ye default route hai 
          jab bhi koi aur route amtch nahi hoga tab ye default route render ho jaayega*/}
          <Route index element = {<Home />} />
          <Route path='/support' element = {<Support />}></Route>
          <Route path='/about' element = {<About />}></Route>
          <Route path='/labs' element = {<Labs />}></Route>
          <Route path='*' element = {<NotFound />}></Route> 
          {/* path = '*' covers all path which are not defined */}
          {/* what is difference between 1st and last child ??? */}
        </Route>
      </Routes>

      {/* <Routes>
        <Route path='/' element = {<Home />}></Route>
        <Route path='/support' element = {<Support />}></Route>
        <Route path='/about' element = {<About />}></Route>
        <Route path='/labs' element = {<Labs />}></Route>
        <Route path='*' element = {<NotFound />}></Route> 
        {/* path = '*' covers all path which are not defined */}
      {/* </Routes> */}

      {/* <Routes>
        <Route path='/' element = {<div>Home Page</div>}></Route>
        <Route path='/support' element = {<div>Support Page</div>}></Route>
        <Route path='/about' element = {<div>About Page</div>}></Route>
        <Route path='/labs' element = {<div>Labs  Page</div>}></Route>
        <Route path='*' element = {<div>Page Not Found</div>}></Route>
      </Routes> */}

    </div>
  )
}

export default App
