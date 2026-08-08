// app/data/challengeData.ts

export const challengeData = {
  user: {
    name: "Alex Rivera",
    track: "Full-Stack Web",
    currentStreak: 12,
    totalCompleted: 12,
    longestStreak: 12,
    status: "active", // "first-day", "active", "missed"
  },
  day12Task: {
    dayNumber: 12,
    title: "Build a Mobile Navbar with Glassmorphism",
    description: "Today you will design and code a responsive floating bottom navigation bar utilizing Tailwind backdrop-blur and smooth transition states.",
    estimatedTime: "45 mins",
    requirements: [
      "Create fixed bottom positioning max-w-[390px]",
      "Implement backdrop-filter blur effects",
      "Add active route indicator states"
    ],
    isSubmitted: false,
    githubUrl: "",
    linkedinUrl: ""
  }
};