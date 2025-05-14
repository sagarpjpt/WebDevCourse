import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from "react-icons/fc";
import { toast } from 'react-toastify';

const Card = (props) => {

    let course = props.course; 
    let likedCourses = props.likedCourses;
    let setLikedCourses = props.setLikedCourses;

    function clickHandler() {

        // logic
        if(likedCourses.includes(course.id)) {
            // pahle se like hua pada 
            setLikedCourses(  (prev) => 
                prev.filter( 
                    (cid) => cid !== course.id 
                ) 
            );
            toast.warning('like removed')
        }
        else{
            // pahle se like nahi hai
            // so insert krna hai ye course liked courses me
            if(likedCourses.length === 0) {
                setLikedCourses([course.id])
            }
            else{
                // non empty pehle se
                setLikedCourses( (prev) => [...prev, course.id] )
            }
            toast.success('Liked Succesfully');
        }
        
    }

    return (
        <div className='w-[300px] bg-navbarBg/80 rounded-md overflow-hidden hover:-translate-y-2 transition-all duration-200
        cursor-pointer'>
            
            <div className='relative'>
                
                <img src={course.image.url} alt="" />
                
                <div className='w-[40px] h-[40px] bg-white rounded-full absolute right-2 -bottom-3
                grid place-items-center'>

                    <button onClick={clickHandler}>
                        {
                            likedCourses.includes(course.id) ? (
                                <FcLike fontSize="1.75rem" />
                            ) : (
                                <FcLikePlaceholder fontSize="1.75rem" />
                            )
                        }
                    </button>
                    
                </div>

            </div>

            <div className='p-4'>
                <p className='text-white font-semibold text-lg leading-5'>{course.title}</p>
                <p className='mt-3 text-white text-sm'>
                    {
                        course.description.length > 200 ? (
                            course.description.substring(0, 200)
                        ) + "..." : (
                                course.description
                        )
                    }
                </p>
            </div>

        </div>
    )
}

export default Card