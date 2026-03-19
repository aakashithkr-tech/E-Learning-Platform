export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  class: number;
  avatar: string;
  color: string;
}

export interface UserDashboardData {
  userId: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  recentActivity: {
    id: string;
    type: "lesson" | "quiz" | "badge";
    title: string;
    description: string;
    timestamp: string;
    icon: string;
  }[];
  enrolledCourses: {
    id: string;
    title: string;
    subject: string;
    progress: number;
    icon: string;
    lessons: number;
    xpReward: number;
    completedLessons: number;
  }[];
  recommendedCourses: {
    id: string;
    title: string;
    subject: string;
    progress: number;
    icon: string;
    lessons: number;
  }[];
  leaderboardRank: number;
  totalBadges: number;
  unlockedBadges: number;
}

export function generateDefaultDashboardData(userId: string): UserDashboardData {
  return {
    userId,
    level: 1,
    xp: 0,
    nextLevelXp: 500,
    streak: 0,
    recentActivity: [
      {
        id: "1",
        type: "badge",
        title: "Welcome!",
        description: "Welcome to IntelliQuest! Start your learning journey today.",
        timestamp: "Just now",
        icon: "🎉",
      },
    ],
    enrolledCourses: [
      {
        id: "1",
        title: "Human Body Systems",
        subject: "Science",
        progress: 0,
        icon: "🫀",
        lessons: 15,
        xpReward: 200,
        completedLessons: 0,
      },
      {
        id: "2",
        title: "Fractions Mastery",
        subject: "Math",
        progress: 0,
        icon: "🔢",
        lessons: 12,
        xpReward: 150,
        completedLessons: 0,
      },
      {
        id: "3",
        title: "Grammar Basics",
        subject: "English",
        progress: 0,
        icon: "📚",
        lessons: 10,
        xpReward: 120,
        completedLessons: 0,
      },
    ],
    recommendedCourses: [
      {
        id: "1",
        title: "Electricity & Circuits",
        subject: "Science",
        progress: 0,
        icon: "⚡",
        lessons: 14,
      },
      {
        id: "2",
        title: "Indian Geography",
        subject: "SST",
        progress: 0,
        icon: "🗺️",
        lessons: 13,
      },
      {
        id: "3",
        title: "Data Structures",
        subject: "Computer",
        progress: 0,
        icon: "📊",
        lessons: 20,
      },
    ],
    leaderboardRank: 100,
    totalBadges: 12,
    unlockedBadges: 0,
  };
}

// 5 Pre-saved users
export const USERS: User[] = [
  {
    id: "user-001",
    username: "arjun_sharma",
    password: "arjun123",
    name: "Arjun Sharma",
    class: 6,
    avatar: "🧑‍💻",
    color: "bg-blue-100",
  },
  {
    id: "user-002",
    username: "priya_patel",
    password: "priya123",
    name: "Priya Patel",
    class: 7,
    avatar: "👩‍🎓",
    color: "bg-pink-100",
  },
  {
    id: "user-003",
    username: "rohan_gupta",
    password: "rohan123",
    name: "Rohan Gupta",
    class: 5,
    avatar: "👦",
    color: "bg-green-100",
  },
  {
    id: "user-004",
    username: "sneha_desai",
    password: "sneha123",
    name: "Sneha Desai",
    class: 8,
    avatar: "👧",
    color: "bg-yellow-100",
  },
  {
    id: "user-005",
    username: "ravi_kumar",
    password: "ravi123",
    name: "Ravi Kumar",
    class: 6,
    avatar: "🧒",
    color: "bg-purple-100",
  },
];

// Dashboard data for each user
export const USER_DASHBOARD_DATA: Record<string, UserDashboardData> = {
  "user-001": {
    userId: "user-001",
    level: 5,
    xp: 520,
    nextLevelXp: 750,
    streak: 8,
    recentActivity: [
      {
        id: "1",
        type: "lesson",
        title: "Completed Lesson",
        description: "Human Body Systems - Lesson 5: Nervous System",
        timestamp: "1 hour ago",
        icon: "✅",
      },
      {
        id: "2",
        type: "quiz",
        title: "Quiz Completed",
        description: "Physics Basics - Score: 88%",
        timestamp: "3 hours ago",
        icon: "🎯",
      },
      {
        id: "3",
        type: "badge",
        title: "Badge Earned",
        description: "Science Explorer - Completed first science quiz",
        timestamp: "1 day ago",
        icon: "⭐",
      },
    ],
    enrolledCourses: [
      {
        id: "1",
        title: "Human Body Systems",
        subject: "Science",
        progress: 65,
        icon: "🫀",
        lessons: 15,
        xpReward: 200,
        completedLessons: 10,
      },
      {
        id: "2",
        title: "Electricity & Circuits",
        subject: "Science",
        progress: 45,
        icon: "⚡",
        lessons: 14,
        xpReward: 180,
        completedLessons: 6,
      },
      {
        id: "3",
        title: "Fractions Mastery",
        subject: "Math",
        progress: 30,
        icon: "🔢",
        lessons: 12,
        xpReward: 150,
        completedLessons: 4,
      },
    ],
    recommendedCourses: [
      {
        id: "1",
        title: "Electricity & Circuits",
        subject: "Science",
        progress: 45,
        icon: "⚡",
        lessons: 14,
      },
      {
        id: "2",
        title: "Indian Geography",
        subject: "SST",
        progress: 0,
        icon: "🗺️",
        lessons: 13,
      },
      {
        id: "3",
        title: "Data Structures",
        subject: "Computer",
        progress: 20,
        icon: "📊",
        lessons: 20,
      },
    ],
    leaderboardRank: 3,
    totalBadges: 12,
    unlockedBadges: 7,
  },
  "user-002": {
    userId: "user-002",
    level: 6,
    xp: 680,
    nextLevelXp: 900,
    streak: 12,
    recentActivity: [
      {
        id: "1",
        type: "lesson",
        title: "Completed Lesson",
        description: "History: Ancient Civilizations - Lesson 8: Rome",
        timestamp: "2 hours ago",
        icon: "✅",
      },
      {
        id: "2",
        type: "quiz",
        title: "Quiz Completed",
        description: "Literature & Poetry - Score: 95%",
        timestamp: "4 hours ago",
        icon: "🎯",
      },
      {
        id: "3",
        type: "lesson",
        title: "Completed Lesson",
        description: "Grammar Basics - Lesson 10: Complex Sentences",
        timestamp: "1 day ago",
        icon: "✅",
      },
    ],
    enrolledCourses: [
      {
        id: "1",
        title: "Literature & Poetry",
        subject: "English",
        progress: 85,
        icon: "📖",
        lessons: 12,
        xpReward: 140,
        completedLessons: 10,
      },
      {
        id: "2",
        title: "History: Ancient Civilizations",
        subject: "SST",
        progress: 70,
        icon: "🏛️",
        lessons: 20,
        xpReward: 250,
        completedLessons: 14,
      },
      {
        id: "3",
        title: "Grammar Basics",
        subject: "English",
        progress: 55,
        icon: "📚",
        lessons: 10,
        xpReward: 120,
        completedLessons: 6,
      },
    ],
    recommendedCourses: [
      {
        id: "1",
        title: "Photosynthesis & Life Cycles",
        subject: "Science",
        progress: 60,
        icon: "🌱",
        lessons: 11,
      },
      {
        id: "2",
        title: "Algebra Foundations",
        subject: "Math",
        progress: 25,
        icon: "🔢",
        lessons: 16,
      },
      {
        id: "3",
        title: "World Capitals Challenge",
        subject: "GK",
        progress: 55,
        icon: "🌍",
        lessons: 9,
      },
    ],
    leaderboardRank: 2,
    totalBadges: 12,
    unlockedBadges: 9,
  },
  "user-003": {
    userId: "user-003",
    level: 3,
    xp: 280,
    nextLevelXp: 500,
    streak: 4,
    recentActivity: [
      {
        id: "1",
        type: "lesson",
        title: "Completed Lesson",
        description: "Fractions Mastery - Lesson 2: Equivalent Fractions",
        timestamp: "30 mins ago",
        icon: "✅",
      },
      {
        id: "2",
        type: "quiz",
        title: "Quiz Completed",
        description: "Grammar Basics - Score: 78%",
        timestamp: "2 hours ago",
        icon: "🎯",
      },
      {
        id: "3",
        type: "badge",
        title: "Badge Earned",
        description: "Math Beginner - Completed first 3 math lessons",
        timestamp: "2 days ago",
        icon: "⭐",
      },
    ],
    enrolledCourses: [
      {
        id: "1",
        title: "Fractions Mastery",
        subject: "Math",
        progress: 25,
        icon: "🔢",
        lessons: 12,
        xpReward: 150,
        completedLessons: 3,
      },
      {
        id: "2",
        title: "Grammar Basics",
        subject: "English",
        progress: 40,
        icon: "📚",
        lessons: 10,
        xpReward: 120,
        completedLessons: 4,
      },
      {
        id: "3",
        title: "Photosynthesis & Life Cycles",
        subject: "Science",
        progress: 15,
        icon: "🌱",
        lessons: 11,
        xpReward: 130,
        completedLessons: 2,
      },
    ],
    recommendedCourses: [
      {
        id: "1",
        title: "Grammar Basics",
        subject: "English",
        progress: 35,
        icon: "📚",
        lessons: 10,
      },
      {
        id: "2",
        title: "Photosynthesis & Life Cycles",
        subject: "Science",
        progress: 20,
        icon: "🌱",
        lessons: 11,
      },
      {
        id: "3",
        title: "World Capitals Challenge",
        subject: "GK",
        progress: 0,
        icon: "🌍",
        lessons: 9,
      },
    ],
    leaderboardRank: 15,
    totalBadges: 12,
    unlockedBadges: 3,
  },
  "user-004": {
    userId: "user-004",
    level: 8,
    xp: 1250,
    nextLevelXp: 1500,
    streak: 25,
    recentActivity: [
      {
        id: "1",
        type: "lesson",
        title: "Completed Lesson",
        description: "Intro to Algorithms - Lesson 15: Sorting",
        timestamp: "1 hour ago",
        icon: "✅",
      },
      {
        id: "2",
        type: "badge",
        title: "Badge Earned",
        description: "Quiz Master - Scored 90%+ in 5 quizzes",
        timestamp: "3 hours ago",
        icon: "⭐",
      },
      {
        id: "3",
        type: "lesson",
        title: "Completed Lesson",
        description: "Data Structures - Lesson 10: Trees",
        timestamp: "5 hours ago",
        icon: "✅",
      },
    ],
    enrolledCourses: [
      {
        id: "1",
        title: "Intro to Algorithms",
        subject: "Computer",
        progress: 90,
        icon: "💻",
        lessons: 18,
        xpReward: 300,
        completedLessons: 16,
      },
      {
        id: "2",
        title: "Data Structures",
        subject: "Computer",
        progress: 80,
        icon: "📊",
        lessons: 20,
        xpReward: 350,
        completedLessons: 16,
      },
      {
        id: "3",
        title: "Algebra Foundations",
        subject: "Math",
        progress: 95,
        icon: "🔢",
        lessons: 16,
        xpReward: 220,
        completedLessons: 15,
      },
    ],
    recommendedCourses: [
      {
        id: "1",
        title: "Data Structures",
        subject: "Computer",
        progress: 75,
        icon: "📊",
        lessons: 20,
      },
      {
        id: "2",
        title: "Algebra Foundations",
        subject: "Math",
        progress: 80,
        icon: "🔢",
        lessons: 16,
      },
      {
        id: "3",
        title: "Electricity & Circuits",
        subject: "Science",
        progress: 50,
        icon: "⚡",
        lessons: 14,
      },
    ],
    leaderboardRank: 1,
    totalBadges: 12,
    unlockedBadges: 11,
  },
  "user-005": {
    userId: "user-005",
    level: 4,
    xp: 420,
    nextLevelXp: 650,
    streak: 6,
    recentActivity: [
      {
        id: "1",
        type: "quiz",
        title: "Quiz Completed",
        description: "Fractions Mastery - Score: 82%",
        timestamp: "1 hour ago",
        icon: "🎯",
      },
      {
        id: "2",
        type: "lesson",
        title: "Completed Lesson",
        description: "Grammar Basics - Lesson 5: Verbs",
        timestamp: "3 hours ago",
        icon: "✅",
      },
      {
        id: "3",
        type: "badge",
        title: "Badge Earned",
        description: "Consistency Star - Logged in 7 days in a row",
        timestamp: "1 day ago",
        icon: "⭐",
      },
    ],
    enrolledCourses: [
      {
        id: "1",
        title: "Fractions Mastery",
        subject: "Math",
        progress: 50,
        icon: "🔢",
        lessons: 12,
        xpReward: 150,
        completedLessons: 6,
      },
      {
        id: "2",
        title: "Grammar Basics",
        subject: "English",
        progress: 45,
        icon: "📚",
        lessons: 10,
        xpReward: 120,
        completedLessons: 5,
      },
      {
        id: "3",
        title: "Human Body Systems",
        subject: "Science",
        progress: 35,
        icon: "🫀",
        lessons: 15,
        xpReward: 200,
        completedLessons: 5,
      },
    ],
    recommendedCourses: [
      {
        id: "1",
        title: "Fractions Mastery",
        subject: "Math",
        progress: 55,
        icon: "🔢",
        lessons: 12,
      },
      {
        id: "2",
        title: "Human Body Systems",
        subject: "Science",
        progress: 30,
        icon: "🫀",
        lessons: 15,
      },
      {
        id: "3",
        title: "Literature & Poetry",
        subject: "English",
        progress: 40,
        icon: "📖",
        lessons: 12,
      },
    ],
    leaderboardRank: 8,
    totalBadges: 12,
    unlockedBadges: 5,
  },
};
