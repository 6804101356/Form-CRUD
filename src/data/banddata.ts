import { Band } from "@/types/band";

export const favoriteBands: Band[] = [
  {
    id: 1,
    name: "Tattoo Colour",
    genre: "Pop / Indie Rock",
    membersCount: 4,
    isActive: true,
    imageUrl: "/images/tatoo/tattoo_colour.jpg",
    members: [
      { name: "ดิม", role: "ร้องนำ", imageUrl: "/images/tatoo/ดิมแทททู.jpg" },
      { name: "รัฐ", role: "กีตาร์", imageUrl: "/images/tatoo/รัฐแทททู.jpg" },
      { name: "ตง", role: "กลอง", imageUrl: "/images/tatoo/ตง.jpg" },
      { name: "จั๊ม", role: "เบส", imageUrl: "/images/tatoo/จั๊มแทททู.jpg" }
    ]
  },
  {
    id: 2,
    name: "Three Man Down",
    genre: "Pop Rock",
    membersCount: 4,
    isActive: true,
    imageUrl: "/images/Three_man_down/Three_man_down.jpg",
    members: [
      { name: "กิต", role: "ร้องนำ", imageUrl: "/images/Three_man_down/กิตthree.jpg" },
      { name: "ตูน", role: "กีตาร์", imageUrl: "/images/Three_man_down/ตูน.jpg" },
      { name: "เต", role: "กลอง", imageUrl: "/images/Three_man_down/เต.jpg" },
      { name: "เส็ง", role: "ซินธิไซเซอร์", imageUrl: "/images/Three_man_down/เส็ง.jpg" }
    ]
  },
  {
    id: 3,
    name: "Season Five",
    genre: "Pop / A Cappella",
    membersCount: 4,
    isActive: true,
    imageUrl: "/images/season5/season_5.jpg",
    members: [
      { name: "เอก", role: "ร้องนำ (Tenor)", imageUrl: "/images/season5/เอก.jpg" },
      { name: "เจ", role: "ร้อง (Baritone)", imageUrl: "/images/season5/เจ.jpg" },
      { name: "จั๊ก", role: "ร้อง (Tenor)", imageUrl: "/images/season5/จั๊ก.jpg" },
      { name: "เปา", role: "ร้อง (Bass)", imageUrl: "/images/season5/เปา.jpg" }
    ]
  }
];