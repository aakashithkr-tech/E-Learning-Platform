import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { WORD_LIST } from "@/data/words";
import { ArrowLeft, Zap, Trash2 } from "lucide-react";

interface GameState {
  score: number;
  wordsFound: string[];
  currentInput: string;
  roundTimeLeft: number;
  roundNumber: number;
  totalGameTime: number;
  gameActive: boolean;
  roundActive: boolean;
  availableLetters: string[];
  roundScore: number;
}

export default function WordTower() {
  const navigate = useNavigate();
  const ROUND_DURATION = 300; // 5 minutes per round
  const MAX_ROUNDS = 3;

  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    wordsFound: [],
    currentInput: "",
    roundTimeLeft: ROUND_DURATION,
    roundNumber: 1,
    totalGameTime: 0,
    gameActive: true,
    roundActive: false,
    availableLetters: [],
    roundScore: 0,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [roundFeedback, setRoundFeedback] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Generate random letters
  const generateLetters = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = [];
    for (let i = 0; i < 7; i++) {
      randomLetters.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    return randomLetters;
  };

  // Start new round
  const startNewRound = () => {
    if (gameState.roundNumber <= MAX_ROUNDS) {
      setGameState((prev) => ({
        ...prev,
        availableLetters: generateLetters(),
        roundActive: true,
        roundTimeLeft: ROUND_DURATION,
        currentInput: "",
        roundScore: 0,
      }));
    }
  };

  // Round timer
  useEffect(() => {
    if (!gameState.roundActive || !gameStarted) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.roundTimeLeft - 1;

        if (newTimeLeft <= 0) {
          setRoundFeedback({
            message: `Time's up! Round ${prev.roundNumber} ended. Words found: ${prev.wordsFound.length}`,
            type: "info",
          });

          if (prev.roundNumber >= MAX_ROUNDS) {
            return {
              ...prev,
              gameActive: false,
              roundActive: false,
              roundTimeLeft: 0,
            };
          }

          setTimeout(() => {
            setGameState((state) => ({
              ...state,
              roundNumber: state.roundNumber + 1,
              roundTimeLeft: ROUND_DURATION,
              roundActive: false,
              wordsFound: [],
              currentInput: "",
            }));
          }, 3000);

          return {
            ...prev,
            roundTimeLeft: 0,
            roundActive: false,
          };
        }

        return {
          ...prev,
          roundTimeLeft: newTimeLeft,
          totalGameTime: prev.totalGameTime + 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.roundActive, gameStarted]);

  const handleLetterClick = (letter: string, index: number) => {
    setGameState((prev) => ({
      ...prev,
      currentInput: prev.currentInput + letter,
      availableLetters: prev.availableLetters.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveLetter = (index: number) => {
    const removedLetter = gameState.currentInput[index];
    setGameState((prev) => ({
      ...prev,
      currentInput: prev.currentInput.slice(0, index) + prev.currentInput.slice(index + 1),
      availableLetters: [...prev.availableLetters, removedLetter],
    }));
  };

  const handleClear = () => {
    setGameState((prev) => ({
      ...prev,
      availableLetters: [...prev.availableLetters, ...prev.currentInput.split("")],
      currentInput: "",
    }));
  };

  const handleSubmitWord = () => {
    const word = gameState.currentInput.toUpperCase();

    if (!word) {
      setRoundFeedback({
        message: "Enter a word first!",
        type: "error",
      });
      return;
    }

    if (gameState.wordsFound.includes(word)) {
      setRoundFeedback({
        message: "Already found this word!",
        type: "error",
      });
      return;
    }

    const matchingWord = WORD_LIST.find(
      (w) => w.word === word && w.difficulty !== "Hard"
    );

    if (matchingWord) {
      const difficultyMultiplier =
        matchingWord.difficulty === "Easy"
          ? 1
          : matchingWord.difficulty === "Medium"
            ? 1.5
            : 2;

      const points = Math.round(matchingWord.points * difficultyMultiplier);

      setRoundFeedback({
        message: `✓ "${word}" - +${points} points!`,
        type: "success",
      });

      setGameState((prev) => ({
        ...prev,
        wordsFound: [...prev.wordsFound, word],
        score: prev.score + points,
        roundScore: prev.roundScore + points,
        currentInput: "",
        availableLetters: generateLetters(),
      }));

      setTimeout(() => setRoundFeedback(null), 2000);
    } else {
      setRoundFeedback({
        message: `"${word}" not found or too difficult!`,
        type: "error",
      });
      setTimeout(() => setRoundFeedback(null), 2000);
    }
  };

  const handleReturnToGames = () => {
    navigate("/games");
  };

  const handleStartGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  if (!gameStarted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-7xl mb-6 animate-bounce">📚</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Word Tower
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Build words from random letters against the clock!
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    📝 {MAX_ROUNDS} rounds of 5 minutes each
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 font-medium">
                    🎯 Harder words = Higher scores
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-orange-700 font-medium">
                    ⭐ Difficulty multiplier: x1.5 (Medium), x2 (Hard)
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    📚 Expand your vocabulary and earn XP
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
              >
                Start Tower
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 py-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-6 animate-bounce">🏆</div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">
                Tower Complete!
              </h1>
              <p className="text-muted-foreground mb-8">
                You completed all {MAX_ROUNDS} rounds!
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Total Score</p>
                  <p className="text-5xl font-bold">{gameState.score}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Words Found
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {gameState.wordsFound.length}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      Avg Per Round
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {Math.round(gameState.wordsFound.length / MAX_ROUNDS)}
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Word Tower</h1>
                <p className="text-sm text-muted-foreground">
                  Round {gameState.roundNumber} of {MAX_ROUNDS}
                </p>
              </div>
            </div>

            <button
              onClick={handleReturnToGames}
              className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition font-medium text-foreground flex items-center gap-2 border border-border"
            >
              <ArrowLeft size={18} />
              Exit Game
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Score</p>
              <p className="text-3xl font-bold text-primary">{gameState.score}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Round Score</p>
              <p className="text-3xl font-bold text-blue-600">
                {gameState.roundScore}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Words Found</p>
              <p className="text-3xl font-bold text-green-600">
                {gameState.wordsFound.length}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Time Left</p>
              <p
                className={`text-3xl font-bold ${
                  gameState.roundTimeLeft <= 30
                    ? "text-red-600 animate-pulse"
                    : "text-orange-600"
                }`}
              >
                {Math.floor(gameState.roundTimeLeft / 60)}:
                {String(gameState.roundTimeLeft % 60).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Game Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Available Letters
            </h2>

            {/* Letter Grid */}
            <div className="flex flex-wrap gap-3 mb-8 min-h-16 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-dashed border-blue-300">
              {gameState.availableLetters.map((letter, index) => (
                <button
                  key={`${letter}-${index}`}
                  onClick={() => handleLetterClick(letter, index)}
                  className="px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition transform hover:scale-110 text-lg"
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Current Input */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Current Word:
              </p>
              <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg min-h-12 border-2 border-gray-300">
                {gameState.currentInput.split("").map((letter, index) => (
                  <button
                    key={`input-${index}`}
                    onClick={() => handleRemoveLetter(index)}
                    className="px-3 py-2 bg-primary text-white font-bold rounded hover:bg-red-600 transition text-sm"
                  >
                    {letter} ✕
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {roundFeedback && (
              <div
                className={`p-4 rounded-lg mb-6 font-semibold ${
                  roundFeedback.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : roundFeedback.type === "error"
                      ? "bg-red-50 border border-red-200 text-red-700"
                      : "bg-blue-50 border border-blue-200 text-blue-700"
                }`}
              >
                {roundFeedback.message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleClear}
                className="py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Clear
              </button>

              <button
                onClick={handleSubmitWord}
                disabled={!gameState.currentInput}
                className="py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Word
              </button>

              <button
                onClick={handleClear}
                className="py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
              >
                Shuffle
              </button>
            </div>
          </div>

          {/* Words Found */}
          {gameState.wordsFound.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Words Found This Round
              </h2>
              <div className="flex flex-wrap gap-2">
                {gameState.wordsFound.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
