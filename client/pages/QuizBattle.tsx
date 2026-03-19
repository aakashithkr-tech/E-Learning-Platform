import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { QUIZ_QUESTIONS } from "@/data/quizQuestions";
import { ArrowLeft, Zap, Flame, Clock } from "lucide-react";

interface GameState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
  gameActive: boolean;
  questionsAnswered: number;
  totalGameTime: number;
}

export default function QuizBattle() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: 15,
    gameActive: true,
    questionsAnswered: 0,
    totalGameTime: 0,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [matchEndTime] = useState(Date.now() + 10 * 60 * 1000); // 10 minutes game duration

  // Timer effect for questions
  useEffect(() => {
    if (!gameActive || gameState.isAnswered || !gameStarted) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;

        if (newTimeLeft <= 0) {
          // Time's up, auto-move to next question
          return {
            ...prev,
            isAnswered: true,
            selectedAnswer: -1,
            streak: 0,
          };
        }

        return {
          ...prev,
          timeLeft: newTimeLeft,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isAnswered, gameStarted]);

  // Game duration timer
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        totalGameTime: prev.totalGameTime + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  // Check if game time is up
  useEffect(() => {
    if (!gameStarted) return;

    const remainingTime = matchEndTime - Date.now();
    if (remainingTime <= 0) {
      setGameState((prev) => ({
        ...prev,
        gameActive: false,
      }));
    }
  }, [gameStarted, matchEndTime]);

  const gameActive = gameState.gameActive;
  const currentQuestion = QUIZ_QUESTIONS[gameState.currentQuestionIndex];
  const remainingGameTime = Math.max(0, Math.floor((matchEndTime - Date.now()) / 1000));

  const handleAnswerSelect = (optionIndex: number) => {
    if (gameState.isAnswered) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: optionIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 10 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
  };

  const handleNextQuestion = () => {
    setGameState((prev) => ({
      ...prev,
      currentQuestionIndex:
        (prev.currentQuestionIndex + 1) % QUIZ_QUESTIONS.length,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: 15,
      questionsAnswered: prev.questionsAnswered,
    }));
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
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-7xl mb-6 animate-pulse">⚡</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Quiz Battle
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Fastest Finger First - Race against the clock to answer questions correctly!
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    ⏱️ 10 minutes total gameplay
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-orange-700 font-medium">
                    ⚡ 15 seconds per question
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 font-medium">
                    🎯 10 points per correct answer
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!gameActive) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Game Over!
              </h1>
              <p className="text-muted-foreground mb-8">
                Great effort! Check your final score below.
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Final Score</p>
                  <p className="text-5xl font-bold">{gameState.score}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Best Streak</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {gameState.streak}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      Questions Answered
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {gameState.questionsAnswered}
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-foreground">Quiz Battle</h1>
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
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Score</p>
              <p className="text-3xl font-bold text-primary">{gameState.score}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Flame size={14} className="text-orange-500" /> Streak
              </p>
              <p className="text-3xl font-bold text-orange-500">
                {gameState.streak}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Answered</p>
              <p className="text-3xl font-bold text-secondary">
                {gameState.questionsAnswered}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Clock size={14} /> Time Left
              </p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.floor(remainingGameTime / 60)}:{String(remainingGameTime % 60).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Question {(gameState.currentQuestionIndex % QUIZ_QUESTIONS.length) + 1} of{" "}
                  {QUIZ_QUESTIONS.length}
                </p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                    {currentQuestion.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      currentQuestion.difficulty === "Easy"
                        ? "bg-green-50 text-green-700"
                        : currentQuestion.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                </div>
              </div>

              {/* Question Timer */}
              <div
                className={`text-center ${
                  gameState.timeLeft <= 5 ? "animate-pulse" : ""
                }`}
              >
                <p className="text-sm text-muted-foreground mb-1">Time for this Q</p>
                <div
                  className={`text-4xl font-bold ${
                    gameState.timeLeft <= 5
                      ? "text-red-600"
                      : "text-orange-500"
                  }`}
                >
                  {gameState.timeLeft}s
                </div>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = gameState.selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isWrong = isSelected && !isCorrect;

                let buttonClass =
                  "p-4 border-2 rounded-lg font-semibold transition text-left cursor-pointer ";

                if (!gameState.isAnswered) {
                  buttonClass +=
                    "border-border hover:border-primary hover:bg-blue-50 bg-white";
                } else if (isCorrect) {
                  buttonClass +=
                    "border-green-500 bg-green-50 text-green-700 border-2";
                } else if (isWrong) {
                  buttonClass +=
                    "border-red-500 bg-red-50 text-red-700 border-2";
                } else {
                  buttonClass +=
                    "border-border bg-gray-50 text-gray-500 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={gameState.isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isCorrect && gameState.isAnswered
                            ? "bg-green-500 text-white"
                            : isWrong
                              ? "bg-red-500 text-white"
                              : "bg-gray-300"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {isCorrect && gameState.isAnswered && (
                        <span className="ml-auto text-lg">✓</span>
                      )}
                      {isWrong && (
                        <span className="ml-auto text-lg">✗</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback */}
            {gameState.isAnswered && (
              <div
                className={`p-4 rounded-lg mb-6 ${
                  gameState.selectedAnswer === currentQuestion.correctAnswer
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={`font-semibold ${
                    gameState.selectedAnswer === currentQuestion.correctAnswer
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {gameState.selectedAnswer === currentQuestion.correctAnswer
                    ? "🎉 Correct! +10 points"
                    : "❌ Wrong! No points this round"}
                </p>
              </div>
            )}

            {/* Next Button */}
            {gameState.isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition"
              >
                Next Question →
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
