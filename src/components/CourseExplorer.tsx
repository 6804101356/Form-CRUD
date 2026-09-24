"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

type CourseExplorerProps = {
    courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
    // 1. State สำหรับช่องค้นหา, รายการโปรด, และตัวกรอง
    const [keyword, setKeyword] = useState<string>("");
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [onlyFavorite, setOnlyFavorite] = useState<boolean>(false);

    // 2. ฟังก์ชัน Event Handlers
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

    // 3. Derived State คำนวณรายการวิชาที่จะแสดง
    const searchText = keyword.trim().toLowerCase();
    const visibleCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchText) ||
            course.code.includes(searchText);

        const matchesFavorite = onlyFavorite
            ? favoriteIds.includes(course.id)
            : true;

        return matchesSearch && matchesFavorite;
    });

    return (
        <div>
            {/* แถบเครื่องมือ: ช่องค้นหา + ปุ่มตัวกรองรายการโปรด */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", marginTop: "16px" }}>
                <input
                    type="search"
                    aria-label="ค้นหารายวิชา"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา..."
                    style={{ padding: "8px 12px", flex: 1 }}
                />

                <button
                    type="button"
                    onClick={() => setOnlyFavorite((prev) => !prev)}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: onlyFavorite ? "#e11d48" : "#f3f4f6",
                        color: onlyFavorite ? "#ffffff" : "#000000",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {onlyFavorite ? "แสดงทั้งหมด" : `แสดงเฉพาะรายการโปรด (${favoriteIds.length})`}
                </button>
            </div>

            {/* ข้อความสรุปจำนวนรายการที่พบ */}
            <p style={{ marginBottom: "16px" }}>
                พบ {visibleCourses.length} รายวิชา (รายการโปรดทั้งหมด {favoriteIds.length} วิชา)
            </p>

            {/* ส่วนแสดงผลวิชา: วนลูป CourseCard หรือแสดง Empty State */}
            {visibleCourses.length === 0 ? (
                <p style={{ color: "#666" }}>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
            ) : (
                <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isFavorite={favoriteIds.includes(course.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}