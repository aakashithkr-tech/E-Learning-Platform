import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { QUIZ_QUESTIONS } from "@/data/quizQuestions";
import { getBossByChapter, BOSSES } from "@/data/bosses";
import { ArrowLeft, Zap, Heart, Clock, Trophy, Flame } from "lucide-react";

interface GameState {
  currentQuestionIndex: number;
  score: number;
  bossHP: number;
  bossMaxHP: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
  gameActive: boolean;
  questionsAnswered: number;
  totalGameTime: number;
  damageDealt: number;
  bossDefeated: boolean;
}

export default function BossFight() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chapterParam = searchParams.get("chapter") || "1";
  const chapter = parseInt(chapterParam, 10);

  const boss = getBossByChapter(chapter) || BOSSES[0];

  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    bossHP: boss.maxHP,
    bossMaxHP: boss.maxHP,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: 15,
    gameActive: true,
    questionsAnswered: 0,
    totalGameTime: 0,
    damageDealt: 0,
    bossDefeated: false,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [matchEndTime] = useState(Date.now() + 15 * 60 * 1000); // 15 minutes
  const [showDamageAnimation, setShowDamageAnimation] = useState(false);
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);

  // Timer effect for questions
  useEffect(() => {
    if (!gameState.gameActive || gameState.isAnswered || !gameStarted) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;

        if (newTimeLeft <= 0) {
          // Time's up, auto-move to next question
          return {
            ...prev,
            isAnswered: true,
            selectedAnswer: -1,
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
    if (remainingTime <= 0 && gameState.gameActive) {
      setGameState((prev) => ({
        ...prev,
        gameActive: false,
      }));
    }
  }, [gameStarted, matchEndTime]);

  const gameActive = gameState.gameActive;
  const currentQuestion = QUIZ_QUESTIONS[gameState.currentQuestionIndex];
  const remainingGameTime = Math.max(0, Math.floor((matchEndTime - Date.now()) / 1000));
  const hpPercentage = (gameState.bossHP / gameState.bossMaxHP) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    if (gameState.isAnswered) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const damageAmount = isCorrect ? boss.damagePerCorrectAnswer : 0;

    if (isCorrect) {
      setShowDamageAnimation(true);
      setTimeout(() => setShowDamageAnimation(false), 600);
    }

    const newBossHP = Math.max(0, gameState.bossHP - damageAmount);
    const isBossDefeated = newBossHP <= 0 && gameState.questionsAnswered + 1 >= 10;

    if (isBossDefeated) {
      setShowVictoryAnimation(true);
    }

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: optionIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 10 : prev.score,
      bossHP: newBossHP,
      damageDealt: damageAmount,
      questionsAnswered: prev.questionsAnswered + 1,
      gameActive: !isBossDefeated,
      bossDefeated: isBossDefeated,
    }));
  };

  const handleNextQuestion = () => {
    if (gameState.bossDefeated) {
      setGameState((prev) => ({
        ...prev,
        gameActive: false,
      }));
      return;
    }

    setGameState((prev) => ({
      ...prev,
      currentQuestionIndex: (prev.currentQuestionIndex + 1) % QUIZ_QUESTIONS.length,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: 15,
      damageDealt: 0,
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
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-red-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-7xl mb-6 animate-bounce">{boss.emoji}</div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Boss Fight
              </h1>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Chapter {boss.chapter}: {boss.name}
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {boss.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-red-700 font-medium">
                    ❤️ Boss HP: {boss.maxHP}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    ⏱️ 15 minutes total gameplay
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-orange-700 font-medium">
                    💥 {boss.damagePerCorrectAnswer} damage per correct answer
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 font-medium">
                    🎯 Answer 10 questions to defeat the boss
                  </p>
                </div>
              </div>

              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800 mb-2">
                  💎 Rewards for Victory:
                </p>
                <div className="space-y-1 text-xs text-yellow-700">
                  <p>🏆 {boss.rewards.badge}</p>
                  <p>⭐ +{boss.rewards.xp} XP</p>
                  <p>💰 {boss.rewards.treasureChest}</p>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
              >
                Enter Battle
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!gameActive) {
    const victory = gameState.bossDefeated;

    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-red-50 flex items-center justify-center px-4 py-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className={`text-6xl mb-6 ${victory ? "animate-bounce" : ""}`}>
                {victory ? "🏆" : "😢"}
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${victory ? "text-green-600" : "text-red-600"}`}>
                {victory ? "Victory!" : "Defeat..."}
              </h1>
              <p className="text-muted-foreground mb-8">
                {victory
                  ? `You have defeated ${boss.name}! Great job!`
                  : `You were defeated by ${boss.name}. Try again!`}
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Final Score</p>
                  <p className="text-5xl font-bold">{gameState.score}</p>
                </div>

                {victory && (
                  <div className="space-y-3">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <Trophy className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-green-700">
                        {boss.rewards.badge}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                        <p className="text-xs text-muted-foreground mb-1">XP Earned</p>
                        <p className="text-lg font-bold text-yellow-600">
                          +{boss.rewards.xp}
                        </p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <p className="text-xs text-muted-foreground mb-1">Reward</p>
                        <p className="text-lg font-bold text-purple-600">
                          {boss.rewards.treasureChest}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">
                    Questions Answered
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {gameState.questionsAnswered}
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-red-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Boss Fight</h1>
                <p className="text-sm text-muted-foreground">
                  Chapter {boss.chapter}: {boss.name}
                </p>
              </div>
            </div>

            <button
              onClick={handleReturnToGames}
              className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition font-medium text-foreground flex items-center gap-2 border border-border"
            >
              <ArrowLeft size={18} />
              Exit Battle
            </button>
          </div>

          {/* Boss Battle Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Boss Display */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center sticky top-20">
                <div
                  className={`text-8xl mb-6 transition-transform ${
                    showDamageAnimation ? "scale-110" : "scale-100"
                  }`}
                >
                  {boss.emoji}
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {boss.name}
                </h2>

                {/* Boss HP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-muted-foreground">
                      Boss Health
                    </p>
                    <p className="text-lg font-bold text-red-600">
                      {Math.max(0, gameState.bossHP)}/{gameState.bossMaxHP}
                    </p>
                  </div>

                  {/* HP Bar Container */}
                  <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden border-2 border-red-600">
                    <div
                      className={`h-full transition-all duration-500 ${
                        hpPercentage > 50
                          ? "bg-gradient-to-r from-green-500 to-yellow-500"
                          : hpPercentage > 25
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-orange-500 to-red-500"
                      }`}
                      style={{ width: `${Math.max(0, hpPercentage)}%` }}
                    />
                  </div>
                </div>

                {/* Damage Feedback */}
                {showDamageAnimation && (
                  <div className="mt-4 animate-bounce">
                    <p className="text-2xl font-bold text-red-600">
                      -{gameState.damageDealt} 💥
                    </p>
                  </div>
                )}

                {/* Difficulty Badge */}
                <div className="mt-6 inline-block">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      boss.difficulty === "Easy"
                        ? "bg-green-50 text-green-700"
                        : boss.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {boss.difficulty} Difficulty
                  </span>
                </div>
              </div>
            </div>

            {/* Game Content */}
            <div className="lg:col-span-2">
              {/* Game Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-xs text-muted-foreground mb-1">Score</p>
                  <p className="text-3xl font-bold text-primary">{gameState.score}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Damage
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {gameState.bossMaxHP - gameState.bossHP}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-xs text-muted-foreground mb-1">Answered</p>
                  <p className="text-3xl font-bold text-secondary">
                    {gameState.questionsAnswered}/10
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Clock size={14} /> Time Left
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.floor(remainingGameTime / 60)}:
                    {String(remainingGameTime % 60).padStart(2, "0")}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Heart size={14} className="inline mr-1 text-red-500" />
                    Boss HP
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {Math.max(0, gameState.bossHP)}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Progress
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {Math.round((gameState.questionsAnswered / 10) * 100)}%
                  </p>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Question Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Question {gameState.questionsAnswered + 1} of 10
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
                    <p className="text-sm text-muted-foreground mb-1">
                      Time for this Q
                    </p>
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
                        ? `🎉 Correct! +${boss.damagePerCorrectAnswer} Damage!`
                        : "❌ Wrong! No damage dealt"}
                    </p>
                  </div>
                )}

                {/* Next Button */}
                {gameState.isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className={`w-full py-3 font-bold rounded-lg hover:shadow-lg transition text-white ${
                      gameState.questionsAnswered >= 10
                        ? "bg-gradient-to-r from-green-600 to-green-700"
                        : "bg-gradient-to-r from-primary to-secondary"
                    }`}
                  >
                    {gameState.questionsAnswered >= 10
                      ? gameState.bossHP <= 0
                        ? "Victory! 🏆"
                        : "Final Question Answered! Check Results..."
                      : "Next Question →"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
