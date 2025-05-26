import { Outlet } from "react-router-dom"

function Home() {
    return (
        <div>
            {/* <Outlet />
            THis is home page */}
            {/* this text is displayed in all child route also so how to display it only 
            in home component */}

            THis is my HOmePage 
            {/* how to render it ? so that not visible in child routes */}
        </div>
    )
}

export default Home