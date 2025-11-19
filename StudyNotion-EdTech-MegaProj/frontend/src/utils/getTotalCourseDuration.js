export const getTotalCourseDuration = (course) => {
  if (!course?.courseContent) return "0 min";

  let totalMinutes = 0;

  // Loop through sections
  course.courseContent.forEach((section) => {
    // Loop through subsections
    section.subSection.forEach((sub) => {
      if (sub.timeDuration) {
        // Extract number from "15 min"
        const minutes = parseInt(sub.timeDuration.replace("min", "").trim());
        totalMinutes += minutes;
      }
    });
  });

  // Convert minutes → days, hours, minutes
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  // Build readable output
  let result = [];
  if (days > 0) result.push(`${days} day`);
  if (hours > 0) result.push(`${hours} hr`);
  if (minutes > 0 || result.length === 0) result.push(`${minutes} min`);

  return result.join(" ");
}