"use client";

import { useState, ChangeEvent } from "react";
import { favoriteBands } from "@/data/banddata";
import BandCard from "@/components/BandCard";

export default function BandPage() {
  const [keyword, setKeyword] = useState<string>("");
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowedIds((prev) =>
      prev.includes(id) ? prev.filter((bandId) => bandId !== id) : [...prev, id]
    );
  }

  function handleLike(id: number) {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  const visibleBands = favoriteBands.filter((band) =>
    band.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        วงดนตรีที่ชอบ
      </h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="search"
          placeholder="ค้นหาชื่อวงดนตรี..."
          value={keyword}
          onChange={handleSearch}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "250px" }}
        />
        <span>ติดตามอยู่: {followedIds.length} วง</span>
      </div>

      {visibleBands.length === 0 ? (
        <p>ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
      ) : (
        <div>
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
              likeCount={likes[band.id] || 0}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </main>
  );
}