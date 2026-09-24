export type Game = {
  id: string;
  title: string;
  price: number;
  genre: string;
  platform: string;
};

export type CartItem = {
  gameId: string;
  quantity: number;
};