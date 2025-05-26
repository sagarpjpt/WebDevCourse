import { useNavigate } from "react-router-dom"

function Support() {
    const navigate = useNavigate();
    function clickHandler(){
        // move to lab page
        navigate('/labs')
    }
    function backHandler() {
        navigate(-1) // 1 page back from where we came
    }
    return (
        <div>
            <div>
                this is support page
            </div>
            <button onClick={clickHandler}>move to labs page</button>
            <button onClick={backHandler}>Go Back</button>
        </div>
    )
}

export default Support