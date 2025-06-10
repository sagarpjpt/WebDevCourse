import {FaShoppingCart} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

function NavBar(){

    const cart = useSelector((state) => state.cart);

    return(
        <div>

            <div className="w-full lg:w-9/12 lg:max-w-6xl h-20 mx-auto flex justify-between items-center px-3">
                
                <NavLink to='/'>
                    <div>
                        <img src="../logo.png" alt=""  className='w-43' />
                    </div>
                </NavLink>
                
                <div className='flex items-center text-lg gap-x-6'>
                    <NavLink to='/'>
                        <p>Home</p>
                    </NavLink>
                    
                    <NavLink to='/cart'>
                        <div className='relative' >
                            <FaShoppingCart className='text-2xl' />
                            {
                                cart.length > 0 &&
                                <span className='absolute -top-1.5 -right-1.5 bg-green-600
                                text-xs w-5 h-5 flex justify-center items-center rounded-full animateBounce' >{cart.length}</span>
                            }
                        </div>
                    </NavLink>
                </div>

            </div>

        </div>
    )
}

export default NavBar