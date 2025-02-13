
export interface Sentence {
  id: number;
  text: string;
  category: "sight" | "hearing" | "smell" | "touch" | "taste";
  icon: string;
}

export const sentences: Sentence[] = [
  { id: 1, text: "Two little eyes to see all around.", category: "sight", icon: "eye" },
  { id: 2, text: "Two little ears to hear each sound.", category: "hearing", icon: "ear" },
  { id: 3, text: "One little nose to smell what's sweet.", category: "smell", icon: "flower" },
  { id: 4, text: "One little mouth that likes to eat.", category: "taste", icon: "utensils" },
  { id: 5, text: "I can see the tall trees.", category: "sight", icon: "tree" },
  { id: 6, text: "I can hear the birds chirping.", category: "hearing", icon: "music" },
  { id: 7, text: "I can smell the flowers.", category: "smell", icon: "flower" },
  { id: 8, text: "I can touch the rough bark of the tree.", category: "touch", icon: "hand" },
  { id: 9, text: "I can taste the sweet apple.", category: "taste", icon: "apple" },
  // ... add all other sentences with appropriate categories and icons
];
