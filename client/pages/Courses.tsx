import { useState } from "react";
import Layout from "@/components/Layout";
import { Search, BookOpen, ArrowRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  subject: string;
  class: number;
  description: string;
  progress: number;
  icon: string;
  lessons: number;
  xpReward: number;
}

const COURSES: Course[] = [
  {
    id: "1",
    title: "Fractions Mastery",
    subject: "Math",
    class: 5,
    description: "Learn to master fractions with interactive examples",
    progress: 45,
    icon: "🔢",
    lessons: 12,
    xpReward: 150,
  },
  {
    id: "2",
    title: "Human Body Systems",
    subject: "Science",
    class: 6,
    description: "Explore the amazing human body and its systems",
    progress: 0,
    icon: "🫀",
    lessons: 15,
    xpReward: 200,
  },
  {
    id: "3",
    title: "Grammar Basics",
    subject: "English",
    class: 5,
    description: "Master English grammar from the basics",
    progress: 30,
    icon: "📚",
    lessons: 10,
    xpReward: 120,
  },
  {
    id: "4",
    title: "History: Ancient Civilizations",
    subject: "SST",
    class: 7,
    description: "Journey through ancient Egypt, Greece, and Rome",
    progress: 60,
    icon: "🏛️",
    lessons: 20,
    xpReward: 250,
  },
  {
    id: "5",
    title: "Intro to Algorithms",
    subject: "Computer",
    class: 8,
    description: "Begin your coding journey with algorithm basics",
    progress: 15,
    icon: "💻",
    lessons: 18,
    xpReward: 300,
  },
  {
    id: "6",
    title: "Algebra Foundations",
    subject: "Math",
    class: 8,
    description: "Build strong foundation in algebra concepts",
    progress: 0,
    icon: "🔢",
    lessons: 16,
    xpReward: 220,
  },
  {
    id: "7",
    title: "Electricity & Circuits",
    subject: "Science",
    class: 7,
    description: "Understand electricity and how circuits work",
    progress: 70,
    icon: "⚡",
    lessons: 14,
    xpReward: 180,
  },
  {
    id: "8",
    title: "World Capitals Challenge",
    subject: "GK",
    class: 5,
    description: "Learn world capitals with fun challenges",
    progress: 25,
    icon: "🌍",
    lessons: 9,
    xpReward: 100,
  },
  {
    id: "9",
    title: "Literature & Poetry",
    subject: "English",
    class: 6,
    description: "Explore famous literature and poetry",
    progress: 50,
    icon: "📖",
    lessons: 12,
    xpReward: 140,
  },
  {
    id: "10",
    title: "Photosynthesis & Life Cycles",
    subject: "Science",
    class: 5,
    description: "Learn how plants and animals live",
    progress: 35,
    icon: "🌱",
    lessons: 11,
    xpReward: 130,
  },
  {
    id: "11",
    title: "Indian Geography",
    subject: "SST",
    class: 6,
    description: "Discover the geography of India",
    progress: 20,
    icon: "🗺️",
    lessons: 13,
    xpReward: 160,
  },
  {
    id: "12",
    title: "Data Structures",
    subject: "Computer",
    class: 8,
    description: "Master arrays, lists, and trees",
    progress: 0,
    icon: "📊",
    lessons: 20,
    xpReward: 350,
  },
];

export default function Courses() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = ["Math", "Science", "English", "SST", "Computer", "GK"];
  const classes = [5, 6, 7, 8];

  const filteredCourses = COURSES.filter((course) => {
    const matchesClass = selectedClass === null || course.class === selectedClass;
    const matchesSubject = selectedSubject === null || course.subject === selectedSubject;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Courses for Classes 5–8
          </h1>
          <p className="text-muted-foreground">
            Choose from {COURSES.length} interactive courses across all subjects
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 space-y-6">
                {/* Class Filter */}
                <div>
                  <h3 className="font-bold text-foreground mb-3">Class</h3>
                  <div className="space-y-2">
                    {classes.map((cls) => (
                      <label
                        key={cls}
                        className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition"
                      >
                        <input
                          type="radio"
                          name="class"
                          value={cls}
                          checked={selectedClass === cls}
                          onChange={() =>
                            setSelectedClass(selectedClass === cls ? null : cls)
                          }
                          className="w-4 h-4 text-primary cursor-pointer"
                        />
                        <span className="text-foreground text-sm">
                          Class {cls}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subject Filter */}
                <div>
                  <h3 className="font-bold text-foreground mb-3">Subject</h3>
                  <div className="space-y-2">
                    {subjects.map((subject) => (
                      <label
                        key={subject}
                        className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubject === subject}
                          onChange={() =>
                            setSelectedSubject(
                              selectedSubject === subject ? null : subject
                            )
                          }
                          className="w-4 h-4 text-primary cursor-pointer rounded"
                        />
                        <span className="text-foreground text-sm">
                          {subject}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedClass !== null || selectedSubject !== null) && (
                  <button
                    onClick={() => {
                      setSelectedClass(null);
                      setSelectedSubject(null);
                    }}
                    className="w-full py-2 text-primary font-medium hover:bg-primary hover:text-white rounded-lg transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 group"
                    >
                      {/* Course Header */}
                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-5xl">{course.icon}</span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                            Class {course.class}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          {course.title}
                        </h3>
                        <p className="text-sm text-primary font-semibold mt-1">
                          {course.subject}
                        </p>
                      </div>

                      {/* Course Body */}
                      <div className="p-6 space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>

                        {/* Progress Bar */}
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
                                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Course Info */}
                        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                          <span>{course.lessons} lessons</span>
                          <span className="font-bold text-accent">
                            +{course.xpReward} XP
                          </span>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full mt-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 group-hover:gap-3">
                          {course.progress > 0 ? "Continue Learning" : "Start Course"}
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    No courses found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
