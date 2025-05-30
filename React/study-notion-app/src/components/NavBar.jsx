import { Link } from "react-router-dom"
import logo from '../assets/Logo.svg'
import { toast } from 'react-hot-toast'
 
function NavBar(props){

    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    return(
        <div className="w-11/12 max-w-[1160px] mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center text-white
        py-4  text-lg">

            <Link to='/'>
                <img src={logo} alt="" width={160} height={32} loading="lazy" />
            </Link>

            <nav>
                <ul className="flex gap-x-6">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/'>About</Link>
                    </li>
                    <li>
                        <Link to='/'>Contact</Link>
                    </li>
                </ul>
            </nav>

            {/* login signup logout and dashboard 
             every button link to some page */}
            <div className="flex items-center gap-x-4">

                {   
                    !isLoggedIn &&
                    <Link to='/login'>
                        <button className="bg-richblack-800 py-[8px] px-[12px]
                        rounded-[8px] border border-richblack-700 text-custom-text">
                            Log In
                        </button>
                    </Link>
                }

                {
                    !isLoggedIn &&
                    <Link to='/signup'>
                        <button className="bg-richblack-800 py-[8px] px-[12px]
                        rounded-[8px] border border-richblack-700 text-custom-text">
                            Sign Up
                        </button>
                    </Link>
                }

                {
                    isLoggedIn &&
                    <Link to='/'>
                        <button onClick={() => {
                            setIsLoggedIn(false);
                            toast.success('Logged Out');
                        }} className="bg-richblack-800 py-[8px] px-[12px]
                        rounded-[8px] border border-richblack-700 text-custom-text" >
                            Log Out
                        </button>
                    </Link>
                }

                {
                    isLoggedIn &&
                    <Link to='/dashboard'>
                        <button className="bg-richblack-800 py-[8px] px-[12px]
                        rounded-[8px] border border-richblack-700 text-custom-text">
                            DashBoard
                        </button>
                    </Link>
                }

            </div>

        </div>
    )
}

export default NavBar