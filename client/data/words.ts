export interface Word {
  word: string;
  difficulty: "Easy" | "Medium" | "Hard";
  definition: string;
  category: string;
  points: number;
}

export interface ScrambledWord {
  id: string;
  originalWord: string;
  scrambled: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  hint: string;
  points: number;
}

export const WORD_LIST: Word[] = [
  {
    word: "APPLE",
    difficulty: "Easy",
    definition: "A red or green fruit",
    category: "Fruits",
    points: 5,
  },
  {
    word: "BRIGHT",
    difficulty: "Easy",
    definition: "Full of light",
    category: "Adjectives",
    points: 10,
  },
  {
    word: "CURIOSITY",
    difficulty: "Medium",
    definition: "Strong desire to know or learn",
    category: "Nouns",
    points: 20,
  },
  {
    word: "ELEPHANT",
    difficulty: "Medium",
    definition: "Large mammal with a trunk",
    category: "Animals",
    points: 15,
  },
  {
    word: "MATHEMATICS",
    difficulty: "Hard",
    definition: "Study of numbers and shapes",
    category: "Subjects",
    points: 30,
  },
  {
    word: "VOCABULARY",
    difficulty: "Hard",
    definition: "All words known by a person",
    category: "Language",
    points: 35,
  },
  {
    word: "ADVENTURE",
    difficulty: "Medium",
    definition: "An exciting or unusual experience",
    category: "Nouns",
    points: 18,
  },
  {
    word: "BEAUTIFUL",
    difficulty: "Medium",
    definition: "Pleasing to the eye",
    category: "Adjectives",
    points: 20,
  },
  {
    word: "KNOWLEDGE",
    difficulty: "Hard",
    definition: "Understanding or awareness of facts",
    category: "Nouns",
    points: 28,
  },
  {
    word: "EDUCATION",
    difficulty: "Medium",
    definition: "Teaching and learning process",
    category: "Nouns",
    points: 22,
  },
];

export const SCRAMBLED_WORDS: ScrambledWord[] = [
  {
    id: "sw1",
    originalWord: "SCIENCE",
    scrambled: "ECIENCE",
    difficulty: "Easy",
    category: "Subjects",
    hint: "Study of nature and universe",
    points: 10,
  },
  {
    id: "sw2",
    originalWord: "HISTORY",
    scrambled: "YROTSIH",
    difficulty: "Easy",
    category: "Subjects",
    hint: "Study of past events",
    points: 10,
  },
  {
    id: "sw3",
    originalWord: "COMPUTER",
    scrambled: "RUPOCTEM",
    difficulty: "Medium",
    category: "Technology",
    hint: "Electronic device for processing data",
    points: 20,
  },
  {
    id: "sw4",
    originalWord: "DEVELOPMENT",
    scrambled: "TNEMPOLEVE D",
    difficulty: "Hard",
    category: "General",
    hint: "Growth or improvement process",
    points: 30,
  },
  {
    id: "sw5",
    originalWord: "IMAGINATION",
    scrambled: "NOITANIGAMI",
    difficulty: "Hard",
    category: "Creativity",
    hint: "Creative thinking ability",
    points: 35,
  },
  {
    id: "sw6",
    originalWord: "LANGUAGE",
    scrambled: "EGAUGNAL",
    difficulty: "Easy",
    category: "Communication",
    hint: "System of words for communication",
    points: 10,
  },
  {
    id: "sw7",
    originalWord: "QUESTION",
    scrambled: "NOITSEUQ",
    difficulty: "Medium",
    category: "General",
    hint: "Something asked to get information",
    points: 18,
  },
  {
    id: "sw8",
    originalWord: "CHALLENGE",
    scrambled: "EGNELLAHC",
    difficulty: "Medium",
    category: "General",
    hint: "A difficult task to accomplish",
    points: 22,
  },
  {
    id: "sw9",
    originalWord: "ACHIEVEMENT",
    scrambled: "TNEMEVEIHA C",
    difficulty: "Hard",
    category: "Success",
    hint: "Success in accomplishing something",
    points: 32,
  },
  {
    id: "sw10",
    originalWord: "CELEBRATION",
    scrambled: "NOITARBELEC",
    difficulty: "Hard",
    category: "Events",
    hint: "Festive occasion or commemoration",
    points: 35,
  },
];
