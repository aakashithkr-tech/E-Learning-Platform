import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { USERS } from "@/data/users";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

const AVATARS = ["🧑‍💻", "👩‍🎓", "👦", "👧", "🧒", "👨‍🎓", "👩‍💻", "👨‍🏫"];
const COLORS = [
  "bg-blue-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-red-100",
  "bg-indigo-100",
  "bg-cyan-100",
];

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState(6);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const { login, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      if (!username || !password) {
        setError("Please enter both username and password");
        return;
      }

      const success = login(username, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } else {
      // Sign up mode
      if (!username || !password || !confirmPassword || !name) {
        setError("Please fill in all fields");
        return;
      }

      if (username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const result = signUp({
        username,
        password,
        name,
        class: selectedClass,
        avatar: selectedAvatar,
        color: selectedColor,
      });

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Sign up failed");
      }
    }
  };

  const handleDemoLogin = (user: typeof USERS[0]) => {
    setSelectedDemo(user.id);
    setUsername(user.username);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Login/Sign Up Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">⭐</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  IntelliQuest
                </h1>
              </div>
              <p className="text-muted-foreground">
                {mode === "login" ? "Sign in to continue learning" : "Create your account and start learning"}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6 bg-muted p-1 rounded-lg">
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                  setUsername("");
                  setPassword("");
                  setConfirmPassword("");
                  setName("");
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                  mode === "login"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn className="inline mr-2" size={16} />
                Sign In
              </button>
              <button
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setUsername("");
                  setPassword("");
                  setConfirmPassword("");
                  setName("");
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                  mode === "signup"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UserPlus className="inline mr-2" size={16} />
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Sign Up Only Fields */}
              {mode === "signup" && (
                <>
                  {/* Full Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                    />
                  </div>

                  {/* Class Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Class
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                        <option key={cls} value={cls}>
                          Class {cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Avatar Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Choose Avatar
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {AVATARS.map((avatar) => (
                        <button
                          key={avatar}
                          type="button"
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`py-3 rounded-lg text-3xl transition border-2 ${
                            selectedAvatar === avatar
                              ? "border-primary bg-primary bg-opacity-10"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Choose Color Theme
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`py-3 rounded-lg transition border-2 ${color} ${
                            selectedColor === color
                              ? "border-foreground border-4"
                              : "border-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input (Sign Up Only) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-6"
              >
                {mode === "login" ? (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                  </>
                )}
              </button>

              {mode === "login" && (
                <>
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-muted-foreground">
                        Or try a demo account
                      </span>
                    </div>
                  </div>

                  {/* Demo Info */}
                  <p className="text-xs text-muted-foreground text-center mb-4">
                    Click any demo user below to auto-fill and login
                  </p>
                </>
              )}
            </form>
          </div>

          {/* Right Side - Demo Users or Sign Up Info */}
          <div className="space-y-4">
            {mode === "login" ? (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-6">Demo Accounts</h2>

                {USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      handleDemoLogin(user);
                      setTimeout(() => {
                        login(user.username, user.password);
                        navigate("/dashboard");
                      }, 300);
                    }}
                    className={`w-full p-5 rounded-xl transition transform hover:scale-105 cursor-pointer ${
                      selectedDemo === user.id
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white border-2 border-border hover:border-primary text-foreground shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{user.avatar}</div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-lg">{user.name}</p>
                        <p
                          className={`text-sm ${
                            selectedDemo === user.id
                              ? "text-blue-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          Class {user.class} Student
                        </p>
                        <p
                          className={`text-xs mt-1 font-mono ${
                            selectedDemo === user.id
                              ? "text-blue-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          @{user.username}
                        </p>
                      </div>
                      <div
                        className={`text-2xl ${
                          selectedDemo === user.id ? "scale-125" : "scale-100"
                        } transition`}
                      >
                        →
                      </div>
                    </div>
                  </button>
                ))}

                {/* Credentials Hint */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-6">
                  <p className="text-sm text-yellow-800 font-semibold mb-2">
                    💡 All passwords are: username + "123"
                  </p>
                  <p className="text-xs text-yellow-700">
                    E.g., arjun_sharma → arjun123
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started 🚀</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <p className="font-semibold text-foreground">Choose Your Identity</p>
                        <p className="text-sm">Select an avatar and color that represents you</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-2xl">📚</span>
                      <div>
                        <p className="font-semibold text-foreground">Start Learning</p>
                        <p className="text-sm">Access 100+ courses across different subjects</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="font-semibold text-foreground">Earn Badges</p>
                        <p className="text-sm">Complete lessons and quizzes to unlock badges</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="font-semibold text-foreground">Build Streaks</p>
                        <p className="text-sm">Maintain daily learning streaks to climb the leaderboard</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-semibold mb-2">
                    💡 Username Requirements
                  </p>
                  <p className="text-xs text-blue-700">
                    At least 3 characters, and password must be at least 6 characters long
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
