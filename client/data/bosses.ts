export interface Boss {
  id: string;
  name: string;
  emoji: string;
  description: string;
  maxHP: number;
  chapter: number;
  difficulty: "Easy" | "Medium" | "Hard";
  damagePerCorrectAnswer: number;
  rewards: {
    xp: number;
    badge: string;
    treasureChest: string;
  };
}

export const BOSSES: Boss[] = [
  {
    id: "boss-1",
    name: "Shadow Goblin",
    emoji: "👹",
    description: "Chapter 1 Boss - A mischievous goblin guarding the first treasure",
    maxHP: 100,
    chapter: 1,
    difficulty: "Easy",
    damagePerCorrectAnswer: 15,
    rewards: {
      xp: 150,
      badge: "Goblin Slayer",
      treasureChest: "Bronze Chest",
    },
  },
  {
    id: "boss-2",
    name: "Stone Giant",
    emoji: "🗿",
    description: "Chapter 2 Boss - A mighty stone giant blocking your path",
    maxHP: 150,
    chapter: 2,
    difficulty: "Medium",
    damagePerCorrectAnswer: 20,
    rewards: {
      xp: 250,
      badge: "Giant Crusher",
      treasureChest: "Silver Chest",
    },
  },
  {
    id: "boss-3",
    name: "Lava Dragon",
    emoji: "🐉",
    description: "Chapter 3 Boss - A fierce dragon breathing fire and chaos",
    maxHP: 200,
    chapter: 3,
    difficulty: "Hard",
    damagePerCorrectAnswer: 25,
    rewards: {
      xp: 400,
      badge: "Dragon Slayer",
      treasureChest: "Gold Chest",
    },
  },
  {
    id: "boss-4",
    name: "Ice Wraith",
    emoji: "👻",
    description: "Chapter 4 Boss - A spectral being from the frozen lands",
    maxHP: 180,
    chapter: 4,
    difficulty: "Hard",
    damagePerCorrectAnswer: 22,
    rewards: {
      xp: 350,
      badge: "Wraith Vanquisher",
      treasureChest: "Diamond Chest",
    },
  },
  {
    id: "boss-5",
    name: "Shadow Lord",
    emoji: "💀",
    description: "Chapter 5 Boss - The ultimate evil from the dark dimension",
    maxHP: 250,
    chapter: 5,
    difficulty: "Hard",
    damagePerCorrectAnswer: 30,
    rewards: {
      xp: 500,
      badge: "Dark Slayer",
      treasureChest: "Platinum Chest",
    },
  },
];

export function getBossByChapter(chapter: number): Boss | undefined {
  return BOSSES.find((boss) => boss.chapter === chapter);
}
