import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { SCRAMBLED_WORDS } from "@/data/words";
import { ArrowLeft, Zap, Lightbulb, Shuffle } from "lucide-react";

interface GameState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  selectedAnswer: string;
  isAnswered: boolean;
  gameActive: boolean;
  questionsAnswered: number;
  totalGameTime: number;
  hintsUsed: number;
  revealedLetters: number[];
  difficulty: "Easy" | "Medium" | "Hard";
}

export default function WordScramble() {
  const navigate = useNavigate();

  const difficultyFilters = {
    Easy: SCRAMBLED_WORDS.filter((w) => w.difficulty === "Easy"),
    Medium: SCRAMBLED_WORDS.filter((w) => w.difficulty === "Medium"),
    Hard: SCRAMBLED_WORDS.filter((w) => w.difficulty === "Hard"),
  };

  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    selectedAnswer: "",
    isAnswered: false,
    gameActive: true,
    questionsAnswered: 0,
    totalGameTime: 0,
    hintsUsed: 0,
    revealedLetters: [],
    difficulty: "Easy",
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [currentWordSet, setCurrentWordSet] = useState<typeof SCRAMBLED_WORDS>(
    difficultyFilters.Easy
  );

  // Timer effect
  useEffect(() => {
    if (!gameState.gameActive || !gameStarted) return;

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        totalGameTime: prev.totalGameTime + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  const currentWord = currentWordSet[gameState.currentQuestionIndex];
  const maxQuestions = 10;

  const handleSelectDifficulty = (difficulty: "Easy" | "Medium" | "Hard") => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      selectedAnswer: "",
      isAnswered: false,
      gameActive: true,
      questionsAnswered: 0,
      totalGameTime: 0,
      hintsUsed: 0,
      revealedLetters: [],
      difficulty,
    });
    setCurrentWordSet(difficultyFilters[difficulty]);
    setGameStarted(true);
  };

  const handleSubmitAnswer = () => {
    const isCorrect = gameState.selectedAnswer.toUpperCase() === currentWord.originalWord;

    const pointsPerQuestion =
      gameState.difficulty === "Easy"
        ? 10
        : gameState.difficulty === "Medium"
          ? 20
          : 30;

    setGameState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + pointsPerQuestion : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      isAnswered: true,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (gameState.questionsAnswered >= maxQuestions) {
      setGameState((prev) => ({
        ...prev,
        gameActive: false,
      }));
      return;
    }

    setGameState((prev) => ({
      ...prev,
      currentQuestionIndex: (prev.currentQuestionIndex + 1) % currentWordSet.length,
      selectedAnswer: "",
      isAnswered: false,
      hintsUsed: 0,
      revealedLetters: [],
    }));
  };

  const handleRevealLetter = () => {
    if (gameState.hintsUsed >= 2) return;

    const word = currentWord.originalWord;
    const newRevealedIndices = [...gameState.revealedLetters];

    for (let i = 0; i < word.length; i++) {
      if (!newRevealedIndices.includes(i)) {
        newRevealedIndices.push(i);
        break;
      }
    }

    setGameState((prev) => ({
      ...prev,
      revealedLetters: newRevealedIndices,
      hintsUsed: prev.hintsUsed + 1,
    }));
  };

  const handleShuffle = () => {
    const chars = currentWord.scrambled.split("");
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    // This would update the display scrambled text
  };

  const handleReturnToGames = () => {
    navigate("/games");
  };

  if (!gameStarted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-7xl mb-6 animate-bounce">🔤</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Word Scramble & Anagrams
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Rearrange letters to form correct words!
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 font-medium">
                    🔤 {maxQuestions} scrambled words to solve
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    💡 Use hints strategically (max 2 per word)
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    🔥 Build streaks for bonus rewards
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-foreground mb-6">
                Choose Your Difficulty:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleSelectDifficulty("Easy")}
                  className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                >
                  🟢 Easy (10 pts/word)
                </button>
                <button
                  onClick={() => handleSelectDifficulty("Medium")}
                  className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition"
                >
                  🟡 Medium (20 pts/word)
                </button>
                <button
                  onClick={() => handleSelectDifficulty("Hard")}
                  className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                >
                  🔴 Hard (30 pts/word)
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!gameState.gameActive) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex items-center justify-center px-4 py-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-6 animate-bounce">🏆</div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">
                Challenge Complete!
              </h1>
              <p className="text-muted-foreground mb-8">
                Great job solving all the anagrams!
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Final Score</p>
                  <p className="text-5xl font-bold">{gameState.score}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <Zap className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Best Streak</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {gameState.streak}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      Words Solved
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {gameState.questionsAnswered}/{maxQuestions}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-xs text-muted-foreground mb-1">
                    Difficulty Level
                  </p>
                  <p className="text-lg font-bold text-purple-600">
                    {gameState.difficulty}
                  </p>
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Word Scramble & Anagrams
                </h1>
                <p className="text-sm text-muted-foreground">
                  {gameState.difficulty} Mode
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

          {/* Game Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Score</p>
              <p className="text-3xl font-bold text-primary">{gameState.score}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Zap size={14} className="text-orange-500" /> Streak
              </p>
              <p className="text-3xl font-bold text-orange-500">
                {gameState.streak}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Progress</p>
              <p className="text-3xl font-bold text-secondary">
                {gameState.questionsAnswered}/{maxQuestions}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
              <p className="text-lg font-bold text-purple-600">
                {gameState.difficulty}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-foreground">Challenge Progress</p>
              <p className="text-sm text-muted-foreground">
                {gameState.questionsAnswered} / {maxQuestions}
              </p>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{
                  width: `${(gameState.questionsAnswered / maxQuestions) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {/* Question Header */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">
                Word {gameState.questionsAnswered + 1} of {maxQuestions}
              </p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold">
                  {currentWord.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    currentWord.difficulty === "Easy"
                      ? "bg-green-50 text-green-700"
                      : currentWord.difficulty === "Medium"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                  }`}
                >
                  {currentWord.difficulty}
                </span>
              </div>
            </div>

            {/* Scrambled Word */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                Rearrange these letters:
              </h2>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 text-center py-6 px-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-300 tracking-widest">
                {currentWord.scrambled}
              </div>
            </div>

            {/* Hint Section */}
            {currentWord.hint && (
              <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800 font-semibold">💡 Hint:</p>
                <p className="text-sm text-yellow-700 mt-1">{currentWord.hint}</p>
              </div>
            )}

            {/* Revealed Letters */}
            {gameState.revealedLetters.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Revealed Letters:
                </p>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  {currentWord.originalWord
                    .split("")
                    .map((letter, index) => (
                      <span
                        key={index}
                        className="text-lg font-bold text-green-700 mx-1"
                      >
                        {gameState.revealedLetters.includes(index)
                          ? letter
                          : "_"}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Input Field */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Your Answer:
              </label>
              <input
                type="text"
                value={gameState.selectedAnswer}
                onChange={(e) =>
                  setGameState((prev) => ({
                    ...prev,
                    selectedAnswer: e.target.value,
                  }))
                }
                disabled={gameState.isAnswered}
                placeholder="Type the correct word..."
                className="w-full px-4 py-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg font-semibold uppercase disabled:bg-gray-100"
              />
            </div>

            {/* Feedback */}
            {gameState.isAnswered && (
              <div
                className={`p-4 rounded-lg mb-6 ${
                  gameState.selectedAnswer.toUpperCase() ===
                  currentWord.originalWord
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={`font-semibold ${
                    gameState.selectedAnswer.toUpperCase() ===
                    currentWord.originalWord
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {gameState.selectedAnswer.toUpperCase() ===
                  currentWord.originalWord
                    ? `✓ Correct! The answer is "${currentWord.originalWord}"`
                    : `✗ Wrong! The correct answer is "${currentWord.originalWord}"`}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {!gameState.isAnswered && (
                <>
                  <button
                    onClick={handleRevealLetter}
                    disabled={gameState.hintsUsed >= 2}
                    className="py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Lightbulb size={20} />
                    <span className="hidden sm:inline">
                      Hint ({2 - gameState.hintsUsed})
                    </span>
                  </button>

                  <button
                    onClick={handleShuffle}
                    className="py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <Shuffle size={20} />
                    <span className="hidden sm:inline">Shuffle</span>
                  </button>

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!gameState.selectedAnswer}
                    className="py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed col-span-2 md:col-span-1"
                  >
                    Submit
                  </button>
                </>
              )}

              {gameState.isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className={`py-3 font-bold rounded-lg hover:shadow-lg transition text-white col-span-2 md:col-span-3 ${
                    gameState.questionsAnswered >= maxQuestions
                      ? "bg-gradient-to-r from-green-600 to-green-700"
                      : "bg-gradient-to-r from-primary to-secondary"
                  }`}
                >
                  {gameState.questionsAnswered >= maxQuestions
                    ? "View Results →"
                    : "Next Word →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
