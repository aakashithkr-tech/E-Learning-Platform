import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Flame, TrendingUp, BookOpen, Award, ArrowRight } from "lucide-react";
import { USER_DASHBOARD_DATA } from "@/data/users";

interface Leaderboard {
  rank: number;
  name: string;
  class: string;
  xp: number;
  avatar: string;
  isYou: boolean;
}

const LEADERBOARD: Leaderboard[] = [
  {
    rank: 1,
    name: "Sneha",
    class: "Class 8",
    xp: 2850,
    avatar: "👧",
    isYou: false,
  },
  {
    rank: 2,
    name: "Priya",
    class: "Class 7",
    xp: 2620,
    avatar: "👩‍🎓",
    isYou: false,
  },
  {
    rank: 3,
    name: "Arjun",
    class: "Class 6",
    xp: 2340,
    avatar: "🧑‍💻",
    isYou: false,
  },
  {
    rank: 4,
    name: "Ravi",
    class: "Class 6",
    xp: 2120,
    avatar: "🧒",
    isYou: false,
  },
  {
    rank: 5,
    name: "Rohan",
    class: "Class 5",
    xp: 1980,
    avatar: "👦",
    isYou: false,
  },
];

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!user || !isLoggedIn) {
    return null;
  }

  // Try to get dashboard data from localStorage first (for new users), then from hardcoded data
  let dashboardData = USER_DASHBOARD_DATA[user.id];
  if (!dashboardData) {
    const savedDashboardData = localStorage.getItem("userDashboardData");
    if (savedDashboardData) {
      const allDashboardData = JSON.parse(savedDashboardData);
      dashboardData = allDashboardData[user.id];
    }
  }

  if (!dashboardData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  const progressPercentage =
    (dashboardData.xp / dashboardData.nextLevelXp) * 100;

  const leaderboardWithUser = LEADERBOARD.map((item) => ({
    ...item,
    isYou: item.rank === dashboardData.leaderboardRank,
  }));

  return (
    <Layout>
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-blue-100">
            Keep up your streak and earn more badges. You're doing great! 🎉
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* XP & Level Widget */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-primary mb-2">
                  {dashboardData.level}
                </div>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </div>

              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 120 120"
                >
                  {/* Background Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(progressPercentage / 100) * 340} 340`}
                    className="text-primary transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">XP Progress</p>
                    <p className="text-lg font-bold text-primary">
                      {dashboardData.xp}/{dashboardData.nextLevelXp}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 text-primary font-medium hover:bg-primary hover:text-white rounded-lg transition">
                View Progress Details
              </button>
            </div>

            {/* Streak Widget */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-md p-8 border border-orange-100">
              <div className="text-center">
                <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <p className="text-5xl font-bold text-orange-600 mb-2">
                  {dashboardData.streak}
                </p>
                <p className="text-sm text-orange-700 font-semibold mb-2">
                  Day Streak
                </p>
                <p className="text-sm text-orange-600 mb-6">
                  🔥 Keep learning daily to maintain your streak!
                </p>
                <button className="w-full py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                  Continue Learning
                </button>
              </div>
            </div>

            {/* Badges Widget */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="font-bold text-foreground">Badges Earned</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground">
                      Unlocked
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {dashboardData.unlockedBadges}/{dashboardData.totalBadges}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-accent to-yellow-400 h-3 rounded-full transition"
                      style={{
                        width: `${(dashboardData.unlockedBadges / dashboardData.totalBadges) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Keep learning to unlock more! 🎁
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Recent Activity
              </h2>

              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0 hover:bg-muted p-3 rounded transition"
                  >
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.timestamp}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 text-primary font-medium hover:bg-primary hover:text-white rounded-lg transition">
                View All Activity
              </button>
            </div>

            {/* Leaderboard Snapshot */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Top Students
              </h2>

              <div className="space-y-3">
                {leaderboardWithUser.map((student) => (
                  <div
                    key={student.rank}
                    className={`flex items-center gap-3 p-4 rounded-lg transition ${
                      student.isYou
                        ? "bg-primary bg-opacity-10 border-2 border-primary"
                        : "bg-muted hover:bg-border"
                    }`}
                  >
                    <span
                      className={`font-bold text-lg ${
                        student.rank <= 3 ? "text-accent" : "text-foreground"
                      }`}
                    >
                      #{student.rank}
                    </span>
                    <span className="text-2xl">{student.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {student.name}
                        {student.isYou && (
                          <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.class}
                      </p>
                    </div>
                    <p className="font-bold text-secondary text-sm whitespace-nowrap">
                      {student.xp} XP
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 text-primary font-medium hover:bg-primary hover:text-white rounded-lg transition">
                View Full Leaderboard
              </button>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-secondary" />
              My Enrolled Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition group border-l-4 border-secondary"
                >
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 text-center">
                    <div className="text-5xl mb-2">{course.icon}</div>
                    <h3 className="font-bold text-foreground">{course.title}</h3>
                    <p className="text-sm text-secondary font-semibold mt-1">
                      {course.subject}
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-secondary">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-secondary to-teal-500 h-3 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="text-center bg-blue-50 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Lessons</p>
                        <p className="text-lg font-bold text-primary">
                          {course.completedLessons}/{course.lessons}
                        </p>
                      </div>
                      <div className="text-center bg-yellow-50 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">XP Earned</p>
                        <p className="text-lg font-bold text-accent">
                          +{Math.floor((course.progress / 100) * course.xpReward)}
                        </p>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-secondary text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2">
                      {course.progress >= 100 ? "Review Course" : "Continue"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Recommended for You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 text-center">
                    <div className="text-5xl mb-2">{course.icon}</div>
                    <h3 className="font-bold text-foreground">{course.title}</h3>
                    <p className="text-sm text-primary font-semibold mt-1">
                      {course.subject}
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    {course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                      {course.lessons} lessons
                    </p>

                    <button className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      {course.progress > 0 ? "Continue Learning" : "Start Course"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
