"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses: initialCourses }: CourseExplorerProps) {
  const [courseList, setCourseList] = useState<Course[]>(initialCourses);

  const [keyword, setKeyword] = useState<string>("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newCode, setNewCode] = useState<string>("");
  const [newCredits, setNewCredits] = useState<number>(3);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleToggleOnlyFavorite() {
    setOnlyFavorite((prev) => !prev);
  }

  function handleAddCourse(e: FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    const newCourse: Course = {
      id: Date.now(), 
      title: newTitle,
      code: newCode,
      credits: newCredits,
      isOpen: true,
    };

    setCourseList((prev) => [newCourse, ...prev]);
    setNewTitle("");
    setNewCode("");
  }

  function handleDeleteCourse(id: number) {
    setCourseList((prev) => prev.filter((course) => course.id !== id));
    setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courseList.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);

    const matchesFavorite = onlyFavorite
      ? favoriteIds.includes(course.id)
      : true;

    return matchesSearch && matchesFavorite;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      <form
        onSubmit={handleAddCourse}
        style={{
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <h3 style={{ width: "100%", margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold" }}>
        เพิ่มรายวิชาใหม่
        </h3>
        <input
          type="text"
          placeholder="รหัสวิชา (เช่น CS101)"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          required
          style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", flex: 1 }}
        />
        <input
          type="number"
          placeholder="หน่วยกิต"
          value={newCredits}
          onChange={(e) => setNewCredits(Number(e.target.value))}
          min={1}
          max={6}
          style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", width: "80px" }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          เพิ่มข้อมูล
        </button>
      </form>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหารายวิชาหรือรหัสวิชา"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />

        <button
          type="button"
          onClick={handleToggleOnlyFavorite}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: onlyFavorite ? "#d1e7dd" : "#ffffff",
            cursor: "pointer",
          }}
        >
          {onlyFavorite ? "แสดงทั้งหมด" : "แสดงเฉพาะรายการโปรด"}
        </button>

        <span>รายการโปรด: {favoriteIds.length} รายการ</span>
      </div>

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {visibleCourses.map((course) => (
            <div key={course.id} style={{ position: "relative" }}>
              <CourseCard
                course={course}
                isFavorite={favoriteIds.includes(course.id)}
                onToggleFavorite={handleToggleFavorite}
              />
              <button
                type="button"
                onClick={() => handleDeleteCourse(course.id)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                ลบ
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}