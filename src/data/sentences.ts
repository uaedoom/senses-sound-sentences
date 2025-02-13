
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
  { id: 10, text: "There are three books on the table.", category: "sight", icon: "eye" },
  { id: 11, text: "The boys have black hair.", category: "sight", icon: "eye" },
  { id: 12, text: "The flowers are red and yellow.", category: "sight", icon: "eye" },
  { id: 13, text: "I like the smell of coffee.", category: "smell", icon: "flower" },
  { id: 14, text: "Perfume smells sweet.", category: "smell", icon: "flower" },
  { id: 15, text: "Onions have a strong smell.", category: "smell", icon: "flower" },
  { id: 16, text: "Smoke has a bad smell.", category: "smell", icon: "flower" },
  { id: 17, text: "It feels soft and round.", category: "touch", icon: "hand" },
  { id: 18, text: "It feels rough and hard.", category: "touch", icon: "hand" },
  { id: 19, text: "It is smooth and shiny.", category: "touch", icon: "hand" },
  { id: 20, text: "The car horn is loud.", category: "hearing", icon: "ear" },
  { id: 21, text: "The whisper is quiet.", category: "hearing", icon: "ear" },
  { id: 22, text: "The bell makes a high sound.", category: "hearing", icon: "ear" },
  { id: 23, text: "The drum makes a low sound.", category: "hearing", icon: "ear" },
  { id: 24, text: "Mangoes are sweet and juicy.", category: "taste", icon: "apple" },
  { id: 25, text: "Lemons are sour and cold.", category: "taste", icon: "apple" },
  { id: 26, text: "Noodles are hot and salty.", category: "taste", icon: "apple" },
  { id: 27, text: "The frog is on a log.", category: "sight", icon: "eye" },
  { id: 28, text: "The fox is on a rock.", category: "sight", icon: "eye" },
  { id: 29, text: "The clock goes tick-tock.", category: "hearing", icon: "ear" },
  { id: 30, text: "The elephant feels like a wall.", category: "touch", icon: "hand" },
  { id: 31, text: "The elephant's ear feels like a giant fan.", category: "touch", icon: "hand" },
  { id: 32, text: "The elephant's trunk feels like a wiggly snake.", category: "touch", icon: "hand" },
  { id: 33, text: "Samia sees some soft socks.", category: "sight", icon: "eye" },
  { id: 34, text: "The snake slides in the sand.", category: "sight", icon: "eye" },
  { id: 35, text: "The sun shines on the sea.", category: "sight", icon: "eye" }
];
