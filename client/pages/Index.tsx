import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Zap,
  BookOpen,
  Award,
  Flame,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Zap,
      title: "Gamified Learning",
      description: "Earn badges & XP points while learning your favorite subjects",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "All subjects for classes 5–8 with engaging content",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Award,
      title: "Student Dashboard",
      description: "Track your progress visually with detailed analytics",
      color: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      icon: Users,
      title: "Leaderboard",
      description: "Motivate through healthy competition with peers",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const testimonials = [
    {
      name: "Arjun",
      class: "Class 6",
      quote: "I love earning badges! Learning feels like a game now!",
      avatar: "🧑‍🎓",
      color: "bg-blue-100",
    },
    {
      name: "Priya",
      class: "Class 7",
      quote: "IntelliQuest made me fall in love with studying. The streak counter keeps me motivated!",
      avatar: "👧",
      color: "bg-pink-100",
    },
    {
      name: "Rohan",
      class: "Class 5",
      quote: "The interactive quizzes and instant badges make learning super fun!",
      avatar: "👦",
      color: "bg-green-100",
    },
    {
      name: "Sneha",
      class: "Class 8",
      quote: "I compete with my friends on the leaderboard. It's motivating!",
      avatar: "👱‍♀️",
      color: "bg-yellow-100",
    },
  ];

  const stats = [
    { number: "50K+", label: "Students Learning" },
    { number: "500+", label: "Courses Available" },
    { number: "10K+", label: "Badges Earned" },
    { number: "4.9/5", label: "User Rating" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-subtle"></div>
          <div className="absolute top-40 left-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-subtle" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Level Up Your Learning.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    One Skill. One Badge. One Step at a Time.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  Interactive courses, challenges, and badges designed for Class
                  5–8 students. Learn like never before!
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  Start Learning
                  <ArrowRight size={20} />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition">
                  Join Now
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl opacity-50"></div>
              <div className="relative space-y-4 w-full px-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🎓</div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">Quick Quiz</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div className="bg-primary h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition" style={{ marginLeft: "40px" }}>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">⭐</div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">New Badge!</p>
                      <p className="text-sm text-muted-foreground">
                        Math Beginner +20 XP
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🔥</div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">7-Day Streak</p>
                      <p className="text-sm text-muted-foreground">
                        Keep it going!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose IntelliQuest?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've combined the best of learning, gaming, and motivation to
              create the ultimate platform for Class 5-8 students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div
                    className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className={`${feature.iconColor} w-7 h-7`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center text-white">
                <p className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-sm md:text-base opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Students Love
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students who are already leveling up their learning.
            </p>
          </div>

          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-2xl mx-auto mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`${testimonials[activeTestimonial].color} w-16 h-16 rounded-full flex items-center justify-center text-4xl flex-shrink-0`}
                >
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeTestimonial].class}
                  </p>
                </div>
              </div>
              <p className="text-lg text-foreground mb-6 italic leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-3 rounded-full transition ${
                    idx === activeTestimonial
                      ? "bg-primary w-8"
                      : "bg-muted w-3 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already earning badges and leveling up
            their skills. Sign up today and get your first badge in minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition"
            >
              Explore Courses
              <ArrowRight size={20} />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-primary transition">
              Join Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
