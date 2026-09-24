// "use client";
import ButtonComponent from "@/components/ButtonComponent";
import CourseCard from "@/components/CourseCard";

import { courses } from "@/data/coursesdata";

export default function CoursesPage() {
    return (
        <>
            <ButtonComponent />

            <div className="p-4">
                {courses.map((courses, index) => (
                    <CourseCard key={index}
                        course={courses} />
                ))}
            </div>
        </>
    );

}