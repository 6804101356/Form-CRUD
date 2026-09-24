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
        <p
          style={{
            margin: "4px 0",
            fontSize: "14px",
            fontWeight: "bold",
            color: band.isActive ? "green" : "red",
          }}
        >
          <p
            style={{
              margin: "4px 0",
              fontSize: "14px",
              fontWeight: "bold",
              color: band.isActive ? "green" : "red",
            }}
          >
            {band.isActive ? "กำลังทำเพลง" : "ยุบวงแล้ว/พักงาน"}
          </p>


          <div style={{ marginTop: "12px" }}>
            <p style={{ margin: "4px 0", fontSize: "14px", fontWeight: "bold" }}>สมาชิก:</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
              {band.members.map((member, index) => (
                <div key={index} style={{ textAlign: "center", width: "70px" }}>
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "1px solid #ccc"
                    }}
                  />
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", fontWeight: "bold" }}>
                    {member.name}
                  </p>
                  <p style={{ margin: "0", fontSize: "10px", color: "#555" }}>
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>


        </p>
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
