import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { FORMULA_CARDS } from "@/data/formulas";
import { ArrowLeft, Map, Zap, Trophy } from "lucide-react";

interface DiscoveredCard {
  id: string;
  discovered: boolean;
}

interface GameState {
  discoveredCards: DiscoveredCard[];
  score: number;
  totalPoints: number;
  gameActive: boolean;
  timeLeft: number;
  totalGameTime: number;
}

export default function FormulaHunt() {
  const navigate = useNavigate();
  const totalPoints = FORMULA_CARDS.reduce((sum, card) => sum + card.points, 0);

  const [gameState, setGameState] = useState<GameState>({
    discoveredCards: FORMULA_CARDS.map((card) => ({
      id: card.id,
      discovered: false,
    })),
    score: 0,
    totalPoints: totalPoints,
    gameActive: true,
    timeLeft: 900, // 15 minutes
    totalGameTime: 0,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [matchEndTime] = useState(Date.now() + 15 * 60 * 1000);

  // Game timer
  useEffect(() => {
    if (!gameStarted || !gameState.gameActive) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;

        if (newTimeLeft <= 0) {
          return {
            ...prev,
            gameActive: false,
            timeLeft: 0,
          };
        }

        return {
          ...prev,
          timeLeft: newTimeLeft,
          totalGameTime: prev.totalGameTime + 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  const discoveredCount = gameState.discoveredCards.filter((c) => c.discovered).length;
  const progressPercentage = (discoveredCount / FORMULA_CARDS.length) * 100;

  const handleDiscoverCard = (cardId: string) => {
    const card = FORMULA_CARDS.find((c) => c.id === cardId);
    if (!card) return;

    const alreadyDiscovered = gameState.discoveredCards.find(
      (c) => c.id === cardId
    )?.discovered;

    if (!alreadyDiscovered) {
      setGameState((prev) => ({
        ...prev,
        discoveredCards: prev.discoveredCards.map((c) =>
          c.id === cardId ? { ...c, discovered: true } : c
        ),
        score: prev.score + card.points,
      }));

      setSelectedCard(cardId);
      setTimeout(() => setSelectedCard(null), 2000);
    }
  };

  const handleReturnToGames = () => {
    navigate("/games");
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-green-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-7xl mb-6 animate-bounce">🧭</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Formula Hunt
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Explore the interactive map and collect all formula cards!
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    📍 {FORMULA_CARDS.length} formula cards to discover
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    ⏱️ 15 minutes to collect all cards
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 font-medium">
                    🎯 {totalPoints} total points available
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-700 font-medium">
                    💎 Collect rare cards for bonus rewards
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
              >
                Start Exploration
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!gameState.gameActive) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-green-50 flex items-center justify-center px-4 py-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-6 animate-bounce">{discoveredCount === FORMULA_CARDS.length ? "🏆" : "🎯"}</div>
              <h1 className={`text-3xl font-bold mb-2 ${discoveredCount === FORMULA_CARDS.length ? "text-green-600" : "text-orange-600"}`}>
                {discoveredCount === FORMULA_CARDS.length ? "Perfect Hunt!" : "Hunt Complete!"}
              </h1>
              <p className="text-muted-foreground mb-8">
                {discoveredCount === FORMULA_CARDS.length
                  ? "You collected all formula cards!"
                  : `You discovered ${discoveredCount} out of ${FORMULA_CARDS.length} cards.`}
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Total Score</p>
                  <p className="text-5xl font-bold">{gameState.score}</p>
                  <p className="text-xs opacity-75 mt-2">out of {gameState.totalPoints} possible points</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <Trophy className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Cards Found</p>
                    <p className="text-2xl font-bold text-green-600">
                      {discoveredCount}/{FORMULA_CARDS.length}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((discoveredCount / FORMULA_CARDS.length) * 100)}%
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReturnToGames}
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Return to Games
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-green-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Map className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-foreground">Formula Hunt</h1>
            </div>

            <button
              onClick={handleReturnToGames}
              className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition font-medium text-foreground flex items-center gap-2 border border-border"
            >
              <ArrowLeft size={18} />
              Exit Hunt
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Score</p>
              <p className="text-3xl font-bold text-primary">{gameState.score}</p>
              <p className="text-xs text-muted-foreground mt-1">/ {gameState.totalPoints}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Cards Found</p>
              <p className="text-3xl font-bold text-green-600">
                {discoveredCount}/{FORMULA_CARDS.length}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Progress</p>
              <p className="text-3xl font-bold text-secondary">
                {Math.round(progressPercentage)}%
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Time Left</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.floor(gameState.timeLeft / 60)}:{String(gameState.timeLeft % 60).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-foreground">Collection Progress</p>
              <p className="text-sm text-muted-foreground">{discoveredCount} / {FORMULA_CARDS.length}</p>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Interactive Map Grid */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              Click on the map to discover formulas
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {FORMULA_CARDS.map((card) => {
                const isDiscovered = gameState.discoveredCards.find(
                  (c) => c.id === card.id
                )?.discovered;
                const isSelected = selectedCard === card.id;

                return (
                  <button
                    key={card.id}
                    onClick={() => handleDiscoverCard(card.id)}
                    disabled={isDiscovered}
                    className={`p-6 rounded-lg border-2 transition transform ${
                      isDiscovered
                        ? `bg-gradient-to-br ${
                            card.rarity === "Legendary"
                              ? "from-purple-50 to-purple-100 border-purple-400"
                              : card.rarity === "Rare"
                                ? "from-yellow-50 to-yellow-100 border-yellow-400"
                                : card.rarity === "Uncommon"
                                  ? "from-blue-50 to-blue-100 border-blue-400"
                                  : "from-green-50 to-green-100 border-green-400"
                          } cursor-default`
                        : isSelected
                          ? "bg-orange-100 border-orange-500 scale-105"
                          : "bg-white border-border hover:border-green-500 hover:bg-green-50 cursor-pointer hover:scale-105"
                    } shadow-md ${isSelected ? "animate-pulse" : ""}`}
                  >
                    <div className="text-3xl mb-2 text-center">{card.emoji}</div>
                    <p className="text-sm font-bold text-center text-foreground">
                      {isDiscovered ? card.title : "❓"}
                    </p>
                    {isDiscovered && (
                      <>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          {card.category}
                        </p>
                        <p className="text-xs font-bold text-center text-primary mt-1">
                          +{card.points} pts
                        </p>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discovered Cards Details */}
          {discoveredCount > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Discovered Formulas
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FORMULA_CARDS.map((card) => {
                  const isDiscovered = gameState.discoveredCards.find(
                    (c) => c.id === card.id
                  )?.discovered;

                  return isDiscovered ? (
                    <div
                      key={card.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        card.rarity === "Legendary"
                          ? "bg-purple-50 border-purple-500"
                          : card.rarity === "Rare"
                            ? "bg-yellow-50 border-yellow-500"
                            : card.rarity === "Uncommon"
                              ? "bg-blue-50 border-blue-500"
                              : "bg-green-50 border-green-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-foreground">{card.title}</p>
                          <p className="text-sm font-mono text-primary my-2">
                            {card.formula}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {card.description}
                          </p>
                        </div>
                        <span className="text-2xl ml-3">{card.emoji}</span>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
