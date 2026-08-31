import { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <article
      style={{
        border: "2px solid black",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#e0f2fe", 
        color: "black",
      }}
    >
      {}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
          {band.name}
        </h2>
        <p style={{ margin: "4px 0", fontSize: "14px" }}>แนวเพลง: {band.genre}</p>
        <p style={{ margin: "4px 0", fontSize: "14px" }}>
          จำนวนสมาชิก: {band.membersCount} คน
        </p>
        <p
          style={{
            margin: "4px 0",
            fontSize: "14px",
            fontWeight: "bold",
            color: band.isActive ? "green" : "red",
          }}
        >
          {band.isActive ? "ยังคงทำผลงาน" : "ยุบวงแล้ว/พักงาน"}
        </p>
      </div>

      {}
      <div>
        <img
          src={band.imageUrl}
          alt={band.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </article>
  );
}