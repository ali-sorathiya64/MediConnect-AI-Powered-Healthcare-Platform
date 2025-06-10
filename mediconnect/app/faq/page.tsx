"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const faqs = [
  {
    question: "What is MediConnect and how does it work?",
    answer:
      "MediConnect is a healthcare assistant platform designed to help users find doctors, book appointments, access health records, and connect with support. It's your all-in-one portal for smarter, more connected healthcare.",
  },
  {
    question: "How can I create an account on MediConnect?",
    answer:
      "To create an account, click the 'Login / Sign Up' button on the homepage and follow the instructions. You can register using your email or mobile number.",
  },
  {
    question: "How do I book an appointment with a doctor?",
    answer:
      "Log into your MediConnect account, go to 'Find Doctors' or 'Book Appointment', choose a specialty or doctor, and select your preferred date and time.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Yes. Simply go to the 'My Appointments' section, select your appointment, and choose 'Cancel' or 'Reschedule'. Changes must be made at least 24 hours in advance.",
  },
  {
    question: "Is MediConnect free to use?",
    answer:
      "Yes, using MediConnect to search for doctors and book appointments is free. However, consultation fees may apply as per the doctor or clinic you choose.",
  },
  {
    question: "How do I access my medical history or past appointments?",
    answer:
      "Once you're logged in, navigate to the 'Health Records' or 'My Appointments' tab to view your previous visits and uploaded medical history.",
  },
  {
    question: "Is my health and personal information secure?",
    answer:
      "Absolutely. MediConnect ensures data security using industry-standard encryption and complies with data privacy regulations to protect your health records.",
  },
  {
    question: "Can I use MediConnect on my smartphone?",
    answer:
      "Yes, MediConnect is fully mobile-responsive and works seamlessly on both Android and iOS devices through your web browser. Native apps are coming soon!",
  },
  {
    question: "How can I get support if I face an issue?",
    answer:
      "You can reach our support team through the in-app support form, via email at support@mediconnect.in, or by calling our helpline at +91 80000 00000.",
  },
  {
    question: "How do I give feedback or report a problem?",
    answer:
      "We welcome feedback! Please use the 'Feedback' section in the app or email us directly at feedback@mediconnect.in. Your input helps us improve!",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <Accordion type="single" collapsible>
        {filteredFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-medium text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
