import { initialGames } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";

export const metadata = {
  title: "รายการเกม - Student Hub",
};

export default function GamesPage() {
  return <GameExplorer initialGames={initialGames} />;
}