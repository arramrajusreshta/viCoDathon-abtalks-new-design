export const curriculumData = Array.from({ length: 60 }, (_, index) => {
  const day = index + 1;

  return {
    day,

    title:
      day === 1
        ? "Build Your First React Component"
        : day === 2
        ? "Create a Responsive Navigation Bar"
        : day === 3
        ? "Build a Reusable Card Component"
        : `Challenge ${day}: Full-Stack Development Task`,

    category:
      day <= 20
        ? "React"
        : day <= 40
        ? "Frontend"
        : "Full-Stack",

    description:
      day === 1
        ? "Create your first reusable React component and understand how props work."
        : `Complete the Day ${day} challenge and submit your proof of work.`,

    problem:
      day === 1
        ? "Build a reusable component that accepts data through props and displays it correctly."
        : `Solve the assigned Day ${day} problem using the concepts covered in this stage.`,

    resources: [
      "Official documentation",
      "Reference guide",
      "Example implementation",
    ],

    starterTemplate: "starter-template.zip",

    completed: false,
locked: false,
  };
});