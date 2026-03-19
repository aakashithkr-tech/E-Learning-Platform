import { useState } from "react";
import Layout from "@/components/Layout";
import { Award, Lock } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp: number;
  unlocked: boolean;
  category: string;
  progress?: number;
  progressMax?: number;
}

const BADGES: Badge[] = [
  {
    id: "1",
    name: "Math Beginner",
    description: "Completed first 3 math lessons",
    icon: "🔢",
    xp: 20,
    unlocked: true,
    category: "Learning",
  },
  {
    id: "2",
    name: "Science Explorer",
    description: "Completed first science quiz",
    icon: "🔬",
    xp: 30,
    unlocked: true,
    category: "Learning",
  },
  {
    id: "3",
    name: "Reading Champion",
    description: "Read 10 English comprehension passages",
    icon: "📚",
    xp: 25,
    unlocked: true,
    category: "Learning",
  },
  {
    id: "4",
    name: "Consistency Star",
    description: "Logged in 7 days in a row",
    icon: "⭐",
    xp: 40,
    unlocked: true,
    category: "Dedication",
  },
  {
    id: "5",
    name: "Quiz Master",
    description: "Scored 90%+ in 5 quizzes",
    icon: "🏆",
    xp: 50,
    unlocked: true,
    category: "Achievement",
  },
  {
    id: "6",
    name: "Coding Rookie",
    description: "Completed a logical thinking challenge",
    icon: "💻",
    xp: 35,
    unlocked: true,
    category: "Learning",
  },
  {
    id: "7",
    name: "Speed Reader",
    description: "Complete 5 reading exercises in one session",
    icon: "📖",
    xp: 22,
    unlocked: false,
    category: "Learning",
    progress: 3,
    progressMax: 5,
  },
  {
    id: "8",
    name: "Math Genius",
    description: "Score 100% in 10 math quizzes",
    icon: "🧮",
    xp: 100,
    unlocked: false,
    category: "Achievement",
    progress: 4,
    progressMax: 10,
  },
  {
    id: "9",
    name: "History Expert",
    description: "Complete all SST history courses",
    icon: "🏛️",
    xp: 75,
    unlocked: false,
    category: "Learning",
    progress: 2,
    progressMax: 5,
  },
  {
    id: "10",
    name: "Streak Hero",
    description: "Maintain a 30-day learning streak",
    icon: "🔥",
    xp: 80,
    unlocked: false,
    category: "Dedication",
    progress: 12,
    progressMax: 30,
  },
  {
    id: "11",
    name: "Leaderboard Champion",
    description: "Reach top 10 on global leaderboard",
    icon: "👑",
    xp: 150,
    unlocked: false,
    category: "Achievement",
    progress: 0,
    progressMax: 1,
  },
  {
    id: "12",
    name: "All-Rounder",
    description: "Complete courses in all 6 subjects",
    icon: "🎯",
    xp: 200,
    unlocked: false,
    category: "Learning",
    progress: 3,
    progressMax: 6,
  },
];

export default function Badges() {
  const [activeFilter, setActiveFilter] = useState<"all" | "unlocked" | "locked">(
    "all"
  );

  const filteredBadges = BADGES.filter((badge) => {
    if (activeFilter === "unlocked") return badge.unlocked;
    if (activeFilter === "locked") return !badge.unlocked;
    return true;
  });

  const totalXP = BADGES.filter((b) => b.unlocked).reduce((sum, b) => sum + b.xp, 0);
  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Achievements
          </h1>
          <p className="text-muted-foreground">
            You've unlocked {unlockedCount} badges and earned {totalXP} XP so far!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Badges Unlocked
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {unlockedCount}/{BADGES.length}
                  </p>
                </div>
                <Award size={40} className="text-accent opacity-80" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total XP</p>
                  <p className="text-3xl font-bold text-secondary">{totalXP}</p>
                </div>
                <span className="text-4xl">✨</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Available
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {BADGES.filter((b) => !b.unlocked).length}
                  </p>
                </div>
                <Lock size={40} className="text-muted-foreground opacity-60" />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto pb-4">
            {(["all", "unlocked", "locked"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 font-semibold text-sm whitespace-nowrap rounded-lg transition ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {filter === "all"
                  ? `All Badges (${BADGES.length})`
                  : filter === "unlocked"
                    ? `Unlocked (${unlockedCount})`
                    : `Locked (${BADGES.filter((b) => !b.unlocked).length})`}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          {filteredBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-6 transition transform hover:-translate-y-1 ${
                    badge.unlocked
                      ? "bg-white shadow-md hover:shadow-lg"
                      : "bg-gray-50 shadow-sm border border-border"
                  } ${badge.unlocked ? "" : "opacity-75"}`}
                >
                  {/* Badge Icon */}
                  <div
                    className={`text-6xl mb-4 text-center transform transition ${
                      badge.unlocked ? "scale-100" : "scale-75 opacity-60"
                    }`}
                  >
                    {badge.icon}
                  </div>

                  {/* Badge Content */}
                  <h3 className="font-bold text-lg text-foreground text-center mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    {badge.description}
                  </p>

                  {/* Progress Bar (for locked badges) */}
                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          {badge.progress}/{badge.progressMax}
                        </span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition"
                          style={{
                            width: `${(badge.progress / (badge.progressMax || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* XP Reward */}
                  <div
                    className={`text-center py-3 rounded-lg font-bold text-sm ${
                      badge.unlocked
                        ? "bg-yellow-100 text-yellow-900"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {badge.unlocked ? "✓ Earned" : "Locked"}
                    <span className="block mt-1">+{badge.xp} XP</span>
                  </div>

                  {/* Category Tag */}
                  <div className="mt-3 text-center">
                    <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary text-xs font-semibold rounded-full">
                      {badge.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Award size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                No badges yet
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeFilter === "unlocked"
                  ? "Complete courses and quizzes to unlock badges!"
                  : activeFilter === "locked"
                    ? "You've unlocked all available badges!"
                    : "Complete courses and quizzes to earn badges"}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
