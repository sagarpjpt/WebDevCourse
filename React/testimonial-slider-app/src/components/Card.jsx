import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';


function Card(props) {

    let review = props.review;

    return (
        <div className='flex flex-col relative'>

            <div className='relative md:absolute md:top-[-7rem] z-10 mx-auto'>

                <img className='aspect-square rounded-full w-[140px] h-[140px]' src={review.image} alt="" />

                <div className='w-[140px] h-[140px] bg-violet-500 rounded-full absolute
                top-[-6px] z-[-1] left-[10px]'></div>

            </div>

            <div className='mt-7'>
                <p className='font-bold text-2xl capitalize tracking-wide'>{review.name}</p>
            </div>

            <div className=''>
                <p className='text-violet-300 uppercase text-sm'>{review.job}</p>
            </div>

            <div className='text-violet-400 mx-auto mt-5'>
                <FaQuoteLeft />
            </div>

            <div className='mt-4 text-slate-500'>
                <p>{review.text}</p>
            </div>

            <div className='text-violet-400 mx-auto mt-5'>
                <FaQuoteRight />
            </div>

        </div>
    )
}

export default Card