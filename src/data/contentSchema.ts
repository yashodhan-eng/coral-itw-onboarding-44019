export const contentSchema = {
  redirectUrl: "https://www.coralacademy.com/class/scalesandslime-d8a4adf3-941f-4944-b278-378544601ecc",
  logoSrc: "/src/assets/coral-academy-logo.png",
  q1: {
    title: "How soon are you looking to try our free classes?",
    subtext: "Let your child explore the world of reptiles and amphibians",
    options: [
      "Right away",
      "In 1–2 weeks",
      "Next month",
      "Just exploring"
    ]
  },
  q2: {
    title: "What's your child's current schooling style?",
    options: [
      "Public/Private schooling",
      "Homeschooling"
    ]
  },
  name: {
    title: "What's your name?",
    label: "Enter your name",
    button: "Next"
  },
  email: {
    title: "Kindly share your email address",
    label: "Enter your email",
    button: "Submit"
  },
  thankyou: {
    title: "Thanks! You're all set.",
    subtext: "Taking you to the class page…",
    delayMs: 1800
  }
};

export type OnboardingAnswers = {
  q1?: string;
  q2?: string;
  name?: string;
  email?: string;
  timestamp?: number;
};
