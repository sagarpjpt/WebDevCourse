import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function Pagination(){

    const {page, handlePageChange, totalPages} = useContext(AppContext)

    return(
        <div className="w-full border-t-1 py-2 fixed bg-white bottom-0 flex justify-between md:justify-evenly items-center gap-x-8 px-2">
            <div className="flex gap-4">
                {   
                    page > 1 &&
                    (<button onClick={() => handlePageChange(page-1)}
                     className="bg-gray-500 px-4 py-2 border-1 rounded-md text-white font-bold">
                        Previous
                    </button>)
                }

                {
                    page < totalPages &&
                    (<button onClick={() => handlePageChange(page+1)}
                     className="bg-gray-500 px-4 py-2 border-1 rounded-md text-white font-bold">
                        Next
                    </button>)
                }
            </div>

            <p className="font-bold">
                Page {page} of {totalPages}
            </p>
        </div>
    )
}

export default Pagination