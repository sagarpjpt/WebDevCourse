import { useNavigate } from "react-router-dom"

function Labs() {
    const navigate = useNavigate();
    function clickHandler() {
        // move to about page
        navigate('/about');
    }
    return(
        <div>
            <div>
            this is labs page
            </div>
            {/* use of useNavigate hook */}
            <button onClick={clickHandler}>Move to About Page</button>
        </div>
    )
}
export default Labs