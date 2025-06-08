
function Spinner(){
    
    return(
        <div className="flex justify-center items-center h-[60vh] flex-col gap-3">
            <div className="loader"></div>
            <div className="text-lg font-bold">Loading...</div>
        </div>
    )
}

export default Spinner;