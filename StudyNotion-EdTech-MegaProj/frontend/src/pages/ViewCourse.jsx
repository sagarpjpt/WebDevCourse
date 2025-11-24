import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";

import { apiConnector } from "../services/apiConnector";
import { courses } from "../services/apis";

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../redux/slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiConnector(
          "GET",
          courses.GET_COURSE_DETAILS + courseId
        );

        const response2 = await apiConnector('GET', courses.GET_COURSE_PROGRESS + courseId)

        if (!response?.data?.success) {
          toast.error(response?.data?.message || "Failed to fetch course");
          return;
        }

        const course = response.data.course;

        // Safety check
        if (!course) {
          toast.error("Course not found");
          return;
        }

        // 1) Set complete course data
        dispatch(setEntireCourseData(course));

        // 2) Set section + subsections
        dispatch(setCourseSectionData(course.courseContent || []));

        // 3) Completed lectures (fallback [])
        dispatch(setCompletedLectures(response2?.data?.completedVideos || []));

        // 4) Calculate total lectures
        let totalLectures = 0;
        course.courseContent?.forEach((section) => {
          totalLectures += section.subSection?.length || 0;
        });

        dispatch(setTotalNoOfLectures(totalLectures));

      } catch (err) {
        console.error("COURSE FETCH ERROR:", err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    })();
  }, [courseId, dispatch]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6 my-6">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
