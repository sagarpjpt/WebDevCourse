import './Spinner.css';

function Spinner() {
    return(
        <div className="flex flex-col items-center justify-center space-y-2 min-h-[50vh]">
            <div className="w-10 h-10 border-4 border-white border-t-transparent 
            rounded-full spinner-slow"></div>
            <p className='text-navbarBg text-lg font-semibold text-white'>Loading...</p>
        </div>
    )
}

export default Spinner;