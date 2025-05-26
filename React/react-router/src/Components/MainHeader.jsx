import { Outlet } from "react-router-dom"

function MainHeader() {
    return (
        // copy Home component content
        <div>
            <Outlet/>
            {/* outlet ka matlb main header ke ander jitne bhi child route hai unko render hone do */}
        </div>
    )
}
export default MainHeader