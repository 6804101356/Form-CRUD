"use client";

import { useState } from "react";
import type { Game, CartItem } from "@/types/game";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {

  const [games, setGames] = useState<Game[]>(initialGames);

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showOnlyCart, setShowOnlyCart] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("Mobile (iOS / Android)");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};
    if (!title.trim()) nextErrors.title = "กรุณาระบุชื่อเกม";
    if (!genre.trim()) nextErrors.genre = "กรุณาระบุแนวเกม";
    if (price === "") nextErrors.price = "กรุณาระบุราคา";
    else if (Number(price) < 0) nextErrors.price = "ราคาต้องไม่ติดลบ";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newGame: Game = {
      id: crypto.randomUUID(),
      title: title.trim(),
      genre: genre.trim(),
      price: Number(price),
      platform: platform.trim() || "Mobile (iOS / Android)",
    };

    setGames([newGame, ...games]);
    setTitle("");
    setGenre("");
    setPrice("");
    setPlatform("Mobile (iOS / Android)");
    setErrors({});
    setIsSubmitting(false);

    setSuccessMsg(`เพิ่มเกม "${newGame.title}" เรียบร้อยแล้ว!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDeleteGame = (gameId: string) => {
    if (confirm("ต้องการลบเกมนี้ออกจากระบบใช่หรือไม่?")) {
      setGames(games.filter((g) => g.id !== gameId));
      setCart(cart.filter((c) => c.gameId !== gameId));
    }
  };

  const handleAdd = (gameId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.gameId === gameId);
      if (existing) {
        return prev.map((item) =>
          item.gameId === gameId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { gameId, quantity: 1 }];
    });
  };

  const handleRemove = (gameId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.gameId === gameId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQuantity = (gameId: string) => {
    return cart.find((item) => item.gameId === gameId)?.quantity || 0;
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const game = games.find((g) => g.id === item.gameId);
    return sum + (game ? game.price * item.quantity : 0);
  }, 0);


  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice = maxPrice === "" || game.price <= Number(maxPrice);

    if (showOnlyCart) {
      return matchesSearch && matchesPrice && getQuantity(game.id) > 0;
    }
    return matchesSearch && matchesPrice;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        เกมยอดนิยม
      </h1>

      {successMsg && (
        <div
          style={{
            backgroundColor: "#dcfce7",
            color: "#15803d",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "16px",
            border: "1px solid #bbf7d0",
            fontWeight: "bold",
          }}
        >
          ✓ {successMsg}
        </div>
      )}

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginTop: 0, marginBottom: "16px" }}>
          เพิ่มเกมใหม่เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleAddGame} noValidate style={{ display: "grid", gap: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <input
                type="text"
                placeholder="ชื่อเกม (เช่น ROV, Free Fire)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: errors.title ? "1px solid #ef4444" : "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
              {errors.title && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0 0" }}>
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="แนวเกม (เช่น MOBA, Battle Royale)"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: errors.genre ? "1px solid #ef4444" : "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
              {errors.genre && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0 0" }}>
                  {errors.genre}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <input
                type="number"
                placeholder="ราคา (บาท)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: errors.price ? "1px solid #ef4444" : "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
              {errors.price && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0 0" }}>
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="แพลตฟอร์ม (เช่น Mobile / PC)"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? "#9ca3af" : "#16a34a",
              color: "#ffffff",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "กำลังบันทึกข้อมูล..." : "บันทึกเกมใหม่"}
          </button>
        </form>
      </div>

      {/* ค้นหาและตัวกรอง */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="ค้นหาชื่อเกมหรือประเภท..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: "2",
            minWidth: "200px",
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
        <input
          type="number"
          placeholder="ราคาไม่เกิน (บาท)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            flex: "1",
            minWidth: "140px",
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
        <button
          type="button"
          onClick={() => setShowOnlyCart(!showOnlyCart)}
          style={{
            padding: "10px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: showOnlyCart ? "#e5e7eb" : "#ffffff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {showOnlyCart ? "แสดงทั้งหมด" : `แสดงเฉพาะในตะกร้า (${totalItemsCount})`}
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
          color: "#4b5563",
          fontSize: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          พบ {filteredGames.length} รายการ (ตะกร้ามีทั้งหมด {totalItemsCount} ชิ้น)
        </span>
        <span style={{ fontWeight: "bold", color: "#2563eb", fontSize: "16px" }}>
          ราคารวม: {totalPrice.toLocaleString()} บาท
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredGames.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#6b7280",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            ไม่พบรายการเกม
          </div>
        ) : (
          filteredGames.map((game) => {
            const qty = getQuantity(game.id);
            return (
              <div
                key={game.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteGame(game.id)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "transparent",
                    color: "#9ca3af",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                  title="ลบเกมออกจากระบบ"
                >
                </button>

                <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 10px 0" }}>
                  {game.title}
                </h2>
                <p style={{ margin: "4px 0", color: "#6b7280", fontSize: "14px" }}>
                  แนวเกม: {game.genre} | แพลตฟอร์ม: {game.platform}
                </p>
                <p style={{ margin: "4px 0 16px 0", color: "#1f2937", fontWeight: "bold" }}>
                  ราคา: {game.price === 0 ? "ฟรี" : `${game.price.toLocaleString()} บาท`}
                </p>

                {qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => handleAdd(game.id)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    + เพิ่มลงตะกร้า
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => handleRemove(game.id)}
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      อยู่ในตะกร้า {qty} ชิ้น
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdd(game.id)}
                      style={{
                        backgroundColor: "#16a34a",
                        color: "white",
                        border: "none",
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}