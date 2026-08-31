export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

export const courses: Course[] = [
  {
    id: 1,
    code: "10301231",
    title: "Web Technology",
    credits: 3,
    isOpen: true,
  },
  {
    id: 2,
    code: "10301232",
    title: "Database Systems",
    credits: 3,
    isOpen: false,
  },
];