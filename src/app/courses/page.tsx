import CourseExplorer from "@/components/CourseExplorer";
import { courses } from "@/data/courses"; 

export default function CoursesPage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "black",
        }}
      >
        รายวิชา
      </h1>

      <CourseExplorer courses={courses} />
    </main>
  );
}