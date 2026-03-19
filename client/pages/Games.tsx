import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Trophy, ArrowRight, Zap, Users, Clock } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  emoji: string;
  features: string[];
  rewards: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  players: "Solo" | "Multiplayer";
  timePerGame: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const GAMES: Game[] = [
  {
    id: "1",
    title: "Quiz Battle",
    emoji: "⚡",
    description: "Fastest Finger First - Race against the clock to answer questions correctly!",
    icon: "🎯",
    features: [
      "Singleplayer challenge mode",
      "10 diverse questions",
      "15 seconds per question",
      "Track your winning streaks",
    ],
    rewards: ["Fast Thinker Badge", "XP points", "Streak bonus"],
    difficulty: "Medium",
    players: "Solo",
    timePerGame: "5-10 mins",
    color: "from-red-500 to-orange-500",
    gradientFrom: "from-red-50",
    gradientTo: "to-orange-50",
  },
  {
    id: "3",
    title: "Boss Fight",
    emoji: "🐉",
    description: "Defeat chapter bosses by answering questions correctly - Each correct answer deals damage!",
    icon: "⚔️",
    features: [
      "Epic boss characters",
      "Answer 10 questions to defeat boss",
      "Each correct hit reduces boss HP",
      "Visual feedback on damage",
      "Chapter-end rewards",
    ],
    rewards: ["Chapter Champion Badge", "Big XP rewards", "Special chest unlocks"],
    difficulty: "Hard",
    players: "Solo",
    timePerGame: "8-15 mins",
    color: "from-red-600 to-purple-600",
    gradientFrom: "from-red-50",
    gradientTo: "to-purple-50",
  },
  {
    id: "4",
    title: "Formula Hunt",
    emoji: "🧭",
    description: "Explore an interactive map and collect formula cards for points and knowledge!",
    icon: "🗺️",
    features: [
      "Interactive map exploration",
      "Collect formula & theorem cards",
      "Hidden challenges unlock cards",
      "Points for each discovery",
      "Subject-specific content",
    ],
    rewards: ["Formula Collector Badge", "Discovery XP", "Rare card drops"],
    difficulty: "Easy",
    players: "Solo",
    timePerGame: "10-15 mins",
    color: "from-green-500 to-teal-500",
    gradientFrom: "from-green-50",
    gradientTo: "to-teal-50",
  },
  {
    id: "5",
    title: "Word Tower",
    emoji: "📚",
    description: "Build words from random letters against the clock - Harder words = Higher score!",
    icon: "🔤",
    features: [
      "Random letter generation",
      "Timed word creation (per round)",
      "Difficulty multiplier scoring",
      "Vocabulary expansion",
      "Leaderboard rankings",
    ],
    rewards: ["Vocabulary Master Badge", "Tier-based XP", "Word collection"],
    difficulty: "Medium",
    players: "Solo",
    timePerGame: "5 mins/round",
    color: "from-blue-500 to-cyan-500",
    gradientFrom: "from-blue-50",
    gradientTo: "to-cyan-50",
  },
  {
    id: "2",
    title: "Word Scramble & Anagrams",
    emoji: "🔤",
    description: "Rearrange scrambled letters to form correct words - Real-time feedback and streaks!",
    icon: "🔤",
    features: [
      "Rearrange scrambled letters",
      "Real-time feedback with animations",
      "Streak bonuses and milestones",
      "Adaptive difficulty levels",
      "Hint system with letter reveals",
      "Save & resume progress anytime",
    ],
    rewards: ["Wordsmith Badge", "Vocabulary XP", "Anagram Master Streak"],
    difficulty: "Easy",
    players: "Solo",
    timePerGame: "5-10 mins",
    color: "from-purple-500 to-pink-500",
    gradientFrom: "from-purple-50",
    gradientTo: "to-pink-50",
  },
];

export default function Games() {
  const navigate = useNavigate();

  const handlePlayGame = (gameId: string) => {
    switch (gameId) {
      case "1":
        navigate("/games/quiz-battle");
        break;
      case "3":
        navigate("/games/boss-fight");
        break;
      case "4":
        navigate("/games/formula-hunt");
        break;
      case "5":
        navigate("/games/word-tower");
        break;
      case "2":
        navigate("/games/word-scramble");
        break;
      default:
        alert("This game is coming soon!");
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Gamepad2 className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Game Zone
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn while you play! Master 5 different games designed to make education fun,
            engaging, and rewarding. Earn badges, XP, and unlock treasures!
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary">
              <Trophy className="w-8 h-8 text-primary mb-3" />
              <p className="text-muted-foreground text-sm mb-1">Total Games</p>
              <p className="text-3xl font-bold text-foreground">{GAMES.length}</p>
              <p className="text-xs text-muted-foreground mt-2">Different gameplay modes</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-secondary">
              <Zap className="w-8 h-8 text-secondary mb-3" />
              <p className="text-muted-foreground text-sm mb-1">Total Badges</p>
              <p className="text-3xl font-bold text-foreground">12+</p>
              <p className="text-xs text-muted-foreground mt-2">Unlock game achievements</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-accent">
              <Users className="w-8 h-8 text-accent mb-3" />
              <p className="text-muted-foreground text-sm mb-1">Game Types</p>
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground mt-2">Solo gameplay modes</p>
            </div>
          </div>

          {/* Games Showcase */}
          <div className="space-y-8">
            {GAMES.map((game, index) => (
              <div
                key={game.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition ${
                  index % 2 === 0 ? "md:flex md:flex-row-reverse" : "md:flex"
                }`}
              >
                {/* Game Content */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">{game.emoji}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {game.title}
                    </h2>
                  </div>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {game.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Game Info Pills */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div
                      className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                        game.difficulty === "Easy"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : game.difficulty === "Medium"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {game.difficulty} Difficulty
                    </div>

                    <div className="px-4 py-2 rounded-full text-xs font-semibold border bg-blue-50 text-blue-700 border-blue-200">
                      {game.players}
                    </div>

                    <div className="px-4 py-2 rounded-full text-xs font-semibold border bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
                      <Clock size={14} />
                      {game.timePerGame}
                    </div>
                  </div>

                  {/* Rewards Section */}
                  <div className="mb-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Trophy size={18} className="text-accent" />
                      Rewards:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {game.rewards.map((reward, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-accent bg-opacity-20 text-accent rounded-full text-sm font-medium"
                        >
                          {reward}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlayGame(game.id)}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    Play Now
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Game Illustration */}
                <div
                  className={`bg-gradient-to-br ${game.gradientFrom} ${game.gradientTo} min-h-80 md:min-h-96 flex items-center justify-center p-8`}
                >
                  <div className="text-center">
                    <div className="text-9xl mb-4 animate-bounce-smooth">
                      {game.icon}
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {game.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Level Up Your Learning?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Start playing games and earning badges today. Each game is designed to reinforce
              what you learn in courses while having fun with friends!
            </p>
            <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-2">
              Start Playing
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
