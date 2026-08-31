import { favoriteBands } from "@/data/banddata";
import BandCard from "@/components/BandCard";

export default function BandPage() {
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
        }}
      >
        วงดนตรีที่ชื่นชอบ
      </h1>

      <div>
        {favoriteBands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </main>
  );
}