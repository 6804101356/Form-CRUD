import { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowed?: boolean;
  onToggleFollow?: (id: number) => void;
  likeCount?: number;
  onLike?: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowed,
  onToggleFollow,
  likeCount = 0,
  onLike,
}: BandCardProps) {
  return (
    <article
      style={{
        border: "2px solid black",
        borderRadius: "8px",
        padding: "18px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#c9e8fd",
        color: "black",
      }}
    >
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
          {band.name}
        </h2>
        <p style={{ margin: "4px 0", fontSize: "14px" }}>แนวเพลง: {band.genre}</p>
        <p style={{ margin: "4px 0", fontSize: "14px" }}>
          จำนวนสมาชิก: {band.membersCount} คน
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button
            type="button"
            onClick={() => onToggleFollow?.(band.id)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: isFollowed ? "#ffcfcf" : "#ffffff",
              cursor: "pointer",
            }}
          >
            {isFollowed ? "ยกเลิกติดตาม" : "ติดตาม"}
          </button>

          <button
            type="button"
            onClick={() => onLike?.(band.id)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
          >
            👍 Like ({likeCount})
          </button>
        </div>
      </div>

      <div>
        <img
          src={band.imageUrl}
          alt={band.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #a9a9a9",
          }}
        />
      </div>
    </article>
  );
}