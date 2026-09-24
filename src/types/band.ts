export type Member = {
  name: string;
  role: string;
  imageUrl: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  membersCount: number;
  isActive: boolean;
  imageUrl: string;
  members: Member[]; 
};