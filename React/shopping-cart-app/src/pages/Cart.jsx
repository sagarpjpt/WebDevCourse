import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart(){

    // const {cart} = useSelector((state) => state); ----> giving error but why ?
    // cart is an array
    const cart = useSelector((state) => state.cart);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect( () => {
        setTotalAmount( cart.reduce( (acc, curr) => acc + curr.price, 0) );
    },[cart])

    return(
        <div className="lg:w-9/12 lg:max-w-6xl mx-auto p-3 mt-4">
            {
                cart.length > 0 ? ( 
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                        {/* left div */}
                        <div className="flex flex-col lg:w-[60%] gap-3">
                            {
                                cart.map( (item, index) => {
                                    return <CartItem key={item.id} item={item} itemIndex={index} />
                                })
                            }
                        </div>
                        {/* right div */}
                        <div className="lg:w-[40%] text-green-700 p-3 mt-10">
                            <div className="text-xl font-bold uppercase">Your Cart</div>
                            <div className="text-5xl font-bold uppercase">Summary</div>
                            <p className="mt-10 font-semibold text-xl text-black">
                                <span className="font-bold">Total Items: {cart.length} </span>
                            </p>
                            <p className="mt-2 semibold text-xl text-black">
                                <span className="font-bold text-2xl">Total Amount: ${totalAmount}</span>
                            </p>
                            <button className="mt-8 w-full text-center uppercase bg-green-700 text-white
                            text-2xl py-3 rounded-md cursor-pointer hover:text-green-600 hover:bg-white hover:border-2 hover:border-green-700
                            transition-all duration-200">
                                checkout
                            </button>
                        </div>
                    </div>

                    
                 ) : ( 
                    <div className="w-full h-[75vh] flex flex-col gap-6 justify-center items-center">
                        <h1 className="text-xl font-semibold">Cart Empty!</h1>
                        <NavLink to='/'>
                            <button className="uppercase py-3 px-12 bg-green-600 text-white text-lg font-bold rounded-md
                            hover:text-green-600 hover:bg-white hover:font-bold hover:border-2 hover:border-green-600
                            transition-all duration-200">
                                shop now
                            </button>
                        </NavLink>
                    </div> 
                )
            }
        </div>
    )
}

export default Cart