import { useState } from 'react';
import Card from './Card'

function Cards(props) {

    let courses = props.courses;
    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);

    // returns you a list of all courses
    const getCourses = () => {
        if(category === "All"){
            let allCourses = [];
            console.log('printing courses ' + courses );
            Object.values(courses).forEach( (courseCategory) => {
                courseCategory.forEach( (course) => {
                    allCourses.push(course);
                })
            })
            return allCourses;
        }
        else{
            // main sirf specific category ka data pass karunga
            return courses[category];
        }
    }

    return (
        <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center min-h-[50vh]
        gap-4 mb-4'>

            {/* {
                getCourses().map( (course) => {
                    return <Card course = {course} key={course.id} 
                            likedCourses = {likedCourses}
                            setLikedCourses = {setLikedCourses} />
                })
            } */}

            {
                !courses ? (
                    <div>
                        <p>No Data Found</p>
                    </div>
                ) : (
                    getCourses().map( (course) => {
                        return <Card course = {course} key={course.id} 
                                likedCourses = {likedCourses}
                                setLikedCourses = {setLikedCourses} />
                    })
                )
            }
            
        </div>
    )
}
export default Cards