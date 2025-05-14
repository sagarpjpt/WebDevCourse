
const Filter = (props) => {

    let filterData = props.filterData;
    let catagory = props.catagory;
    let setCatagory = props.setCatagory;

    function filterHandler(title) {
        setCatagory(title);
        console.log(title, catagory);
    }

    return (
        <div className="w-11/12 flex flex-wrap sm:max-w-max space-x-4 gap-y-4
        mx-auto py-4 justify-center bg-mainBg">
            {
                filterData.map((data) => {
                    return (
                        <button key={data.id} 
                            className={`text-lg px-2 py-1 rounded-md
                            font-medium text-white hover:bg-btnclkBg
                            transition-colors duration-300 cursor-pointer 
                            ${catagory === data.title ? 'border-white border-2 border-solid bg-btnclkBg' : 'bg-btnBg' }`} 
                            onClick={() => filterHandler(data.title)}
                        >
                            {data.title}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Filter