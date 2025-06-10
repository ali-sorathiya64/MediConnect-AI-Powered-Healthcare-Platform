import { TestimonialsSection } from "@/components/ui/testinomail-marique";

const testimonials = [
  {
    author: {
      name: "Suzan Aibani",
      handle: "@suzan",
      avatar: "/as.png",
    },
    text: "MediConnect has revolutionized how we manage patient care. The AI-powered insights are incredibly accurate and have improved our decision-making process.",
    href: "https://instagram.com/suzan",
  },
  {
    author: {
      name: "Saad Alvi",
      handle: "@saad",
      avatar: "/saad.jpg",
    },
    text: "The platform's user-friendly interface makes it easy for both patients and healthcare providers to navigate. It's a game-changer for our clinic.",
    href: "https://instagram.com/saad",
  },
  {
    author: {
      name: "Ebrahim",
      handle: "@ebrahim",
      avatar: "/ebu.jpg",
    },
    text: "MediConnect's AI health assistant is a lifesaver! It provides personalized recommendations that have greatly improved patient outcomes.",
    href: "https://instagram.com/ebrahim",
  },
  {
    author: {
      name: "Alfaiz Kureshi",
      handle: "@alfaiz",
      avatar: "/alfez.heic",
    },
    text: "Thanks to MediConnect, managing my family's health records and appointments is super simple. Highly recommend for modern healthcare needs!",
    href: "https://instagram.com/alfaiz",
  },
];

export function Testimonials() {
  return (
    <TestimonialsSection
      title="Trusted by healthcare professionals and patients"
      description="Join thousands of users who are already experiencing better healthcare with MediConnect"
      testimonials={testimonials}
    />
  );
}
