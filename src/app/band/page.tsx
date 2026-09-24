import { favoriteBands } from "@/data/banddata";
import BandCard from "@/components/BandCard";

export default function BandPage() {
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
          marginBottom: "30px",
        }}
      >
        วงดนตรีที่ชอบ
      </h1>

      <div>
        {favoriteBands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </main>
  );
}