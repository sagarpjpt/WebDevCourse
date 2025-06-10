import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux"
import {add, remove} from '../redux/Slices/CartSlice'

function Product({item}){

    // const {cart} = useSelector((state) => state);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(add(item));
        toast.success("Item added to Cart")
    }

    const removeFromCart = () => {
        dispatch(remove(item.id))
        toast.error('Item removed from Cart')
    }

    return(
        <div className='flex flex-col p-4 gap-3 mt-10 ml-5 items-center justify-between
        shadow-gray-400 shadow-md rounded-xl hover:scale-110 hover:shadow-xl 
        transition-all duration-300'>
            <div className='text-blue-900 font-bold capitalize mt-1 text-lg'>
                {
                    item.title.length > 17 ? (
                        <p>{item.title.substring(0, 17)}<span>...</span></p>
                    ) : (
                        <p>{item.title}</p>
                    )
                }
            </div>
            <div className='w-[75%] text-gray-400 font-normal text-xs text-center'>
                {
                    item.description.length > 51 ? (
                        <p>{item.description.substring(0, 51)}<span>...</span></p>
                    ) : (
                        <p>{item.description}</p>
                    )
                }
            </div>
            <div className='h-[180px] mt-2'>
                <img src={item.image} alt="" className='w-full h-full' />
            </div>
            <div className='flex justify-between w-full mt-3'>
                <div className='flex text-green-600 font-bold'>
                    <span>$</span>
                    <p>{item.price}</p>
                </div>
                <div>
                    {
                        cart.some((p) => p.id === item.id) ? (
                            <button onClick={removeFromCart} 
                                className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold
                                p-1 px-3 uppercase text-[12px] 
                                hover:bg-gray-700 hover:text-white transition-all duration-100'
                            >
                                Remove Item
                            </button>
                        ) : (
                            <button onClick={addToCart}
                                className='text-gray-700 border-2 border-gray-700 rounded-full font-bold
                                p-1 px-3 uppercase text-[12px]
                                hover:bg-gray-700 hover:text-white transition-all duration-100'
                            >
                                Add to Cart
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Product