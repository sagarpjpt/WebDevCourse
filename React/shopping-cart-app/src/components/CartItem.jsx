import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import {add, remove} from '../redux/Slices/CartSlice'

function CartItem({item, itemIndex}){

    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(remove(item.id))
        toast.error('Item Removed');
    }

    return(
        <div className="flex flex-col lg:flex-row border-b-2 p-3 pb-8 gap-1 lg:gap-5 items-center justify-center">
            
            <div className="lg:w-[30%]">
                <img src={item.image} alt="" className="h-[175px] lg:w-[90%] lg:h-[90%]" />
            </div>

            <div className="flex flex-col lg:w-[70%] h-full p-3">
                <h1 className="font-bold text-slate-800 text-xl">{item.title}</h1>
                <h1 className="text-gray-500 font-normal lg:text-[17px] mt-4">
                    {
                        item.description.length > 100 ? (
                            <p>{item.description.substring(0, 100)}<span>...</span></p>
                        ) : (
                            <p>{item.description}</p>
                        )
                    }
                </h1>
                <div className="flex justify-between items-center mt-4 py-2">
                    <div className='flex text-green-600 font-bold text-lg'>
                        <span>$</span>
                        <p>{item.price}</p>
                    </div>
                    <div onClick={removeFromCart} 
                        className="text-2xl p-2 bg-red-200 text-red-500 rounded-full cursor-pointer
                        hover:bg-red-500 hover:text-white transition-all duration-200 mr-3"
                    >
                        <MdDelete />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartItem