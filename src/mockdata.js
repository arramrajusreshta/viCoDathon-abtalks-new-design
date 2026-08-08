export const mockStudentData = {
  name: "Aarav Sharma",
  college: "IIT Bombay",
  track: "Full-Stack Web Dev",
  streak: 11,
  totalDays: 60,
  completedDays: 11,
  rank: 42,
  totalStudents: 1280,
  missedDays: [5], // Edge case: Missed Day 5
  todayTask: {
    dayNumber: 12,
    title: "Build a Custom Hook for API Caching",
    category: "React / State Management",
    description: "Create a reusable `useFetch` hook in React that caches API responses in `localStorage` to avoid duplicate network calls.",
    requirements: [
      "Accept URL and cache expiration time as parameters",
      "Store fetched data in localStorage",
      "Return { data, loading, error, refetch }"
    ],
    githubSubmitted: false,
    linkedinSubmitted: false
  }
};