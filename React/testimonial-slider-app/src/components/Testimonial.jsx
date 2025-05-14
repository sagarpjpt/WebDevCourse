import { useState } from 'react';
import Card from './Card';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Testimonial(props) {

    let reviews = props.reviews;
    const [ind, setIndex] = useState(0);

    function leftShiftHandler() {

        if(ind <= 0){
            setIndex(reviews.length - 1);
        }
        else{
            setIndex(ind - 1);
        }

    }

    function rightShiftHandler() {
        setIndex( (ind + 1) % reviews.length);
    }

    function supriseHandler() {
        setIndex(Math.floor(Math.random() * reviews.length))
    }

    return (
        <div className='bg-white w-[85vw] md:w-[700px] flex flex-col justify-center items-center
        mt-10 p-10 transition-all duration-500 shadow-md hover:shadow-xl rounded-md'>

            <Card review = {reviews[ind]} />

            <div className='flex text-3xl mt-5 gap-3 text-violet-400 font-bold 
            justify-center items-center'>

                <button className='cursor-pointer' 
                onClick={leftShiftHandler}>
                    <FiChevronLeft />
                </button>

                <button className='cursor-pointer'
                onClick={rightShiftHandler}>
                    <FiChevronRight />
                </button>

            </div>

            <div className='mt-5'>
                
                <button className='bg-violet-400 hover:bg-violet-500 transition-all 
                duration-200 cursor-pointer px-10 py-2 font-bold text-white text-lg rounded-md uppercase'
                onClick={supriseHandler}>
                    suprise me
                </button>

            </div>

        </div>
    )
}

export default Testimonial