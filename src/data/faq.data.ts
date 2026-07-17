export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    category: "Courses & Enrollment",
    items: [
      {
        question: "How do I enroll in a course?",
        answer:
          "Open any course page and click 'Add to cart' or 'Buy now'. Once your payment is confirmed, the course appears in your student dashboard under 'My Courses'.",
      },
      {
        question: "Do I get lifetime access to a course?",
        answer:
          "Yes. Every individual course purchase includes full lifetime access, including any future updates the instructor adds.",
      },
      {
        question: "Can I switch between devices while learning?",
        answer:
          "Yes, your progress syncs automatically. You can start a lecture on desktop and continue on mobile from the same point.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    items: [
      {
        question: "What payment methods are supported?",
        answer:
          "We support major debit/credit cards, UPI, and net banking at checkout.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "All courses come with a 30-day money-back guarantee. If a course isn't right for you, request a refund from your purchase history within 30 days.",
      },
      {
        question: "Why was my coupon not applied?",
        answer:
          "Coupons are case-sensitive and may be time-limited. Double-check the code and its expiry, or contact support with the code you're trying to use.",
      },
    ],
  },
  {
    category: "Account & Login",
    items: [
      {
        question: "I forgot my password. What do I do?",
        answer:
          "Use the 'Forgot password' link on the login page to receive a reset link by email.",
      },
      {
        question: "Can I change the email linked to my account?",
        answer:
          "Yes, this can be updated from your account settings once you're logged in.",
      },
    ],
  },
  {
    category: "Instructors",
    items: [
      {
        question: "How do I become an instructor?",
        answer:
          "Click 'Become Instructor' in the navbar and complete the instructor registration. You'll get access to a dashboard for creating and publishing courses.",
      },
      {
        question: "How and when do instructors get paid?",
        answer:
          "Instructor payouts are processed monthly based on completed sales, minus applicable platform fees.",
      },
    ],
  },
];