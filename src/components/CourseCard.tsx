import { Course } from "@/data/coursesdata";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article
      style={{
        border: "2px solid black",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#e0f2fe",
        color: "black",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
        {course.title}
      </h2>
      <p style={{ margin: "4px 0", fontSize: "14px" }}>
        รหัสวิชา: {course.code}
      </p>
      <p style={{ margin: "4px 0", fontSize: "14px" }}>
        {course.credits} หน่วยกิต
      </p>
      <p
        style={{
          margin: "4px 0",
          fontSize: "14px",
          fontWeight: "bold",
          color: course.isOpen ? "green" : "red",
        }}
      >
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>
    </article>
  );
}