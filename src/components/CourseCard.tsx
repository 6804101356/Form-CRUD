import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "16px 20px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px", color: "#111827" }}>
        {course.title}
      </h2>
      
      {/* ข้อมูลระยะชิดกันมากขึ้น */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px", color: "#374151" }}>
        <p>รหัสวิชา: {course.code}</p>
        <p>{course.credits} หน่วยกิต</p>
        <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
      </div>

      {/* ปุ่มกดบันทึกรายการโปรด สีโทนเดิม */}
      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
        style={{
          marginTop: "12px",
          padding: "6px 14px",
          backgroundColor: isFavorite ? "#1d4ed8" : "#2563eb",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
      </button>
    </article>
  );
}