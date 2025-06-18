import { NavLink } from "react-router-dom"

function NavBar(){
    return(
        <div className="flex flex-row gap-10 w-screen justify-center items-center p-3">
            <NavLink to='/'>
                Home
            </NavLink>

            <NavLink to='/pastes'>
                Pastes
            </NavLink>
        </div>
    )
}

export default NavBar