"use client";
import React from "react";
import Image from "next/image";
import RuleCard from "@/src/components/RuleCard";

interface ClubBio {
  name: string;
  description: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Rule {
  title: string;
  description: string;
  image: string;
}

const clubs: ClubBio[] = [
  {
    name: "Arsenal",
    description:
      "Bukayo Saka’s brilliant double helped Arsenal secure a crucial 3-1 victory over Chelsea at Emirates Stadium. The Gunners now sit 5 points clear at the",
    image: "/arsenal.jpg",
  },
  {
    name: "Manchester United",
    description:
      "Bukayo Saka’s brilliant double helped Arsenal secure a crucial 3-1 victory over Chelsea at Emirates Stadium. The Gunners now sit 5 points clear at the",
    image: "/arsenal.jpg",
  },
  {
    name: "Tottenham",
    description:
      "Bukayo Saka’s brilliant double helped Arsenal secure a crucial 3-1 victory over Chelsea at Emirates Stadium. The Gunners now sit 5 points clear at the",
    image: "/arsenal.jpg",
  },
  {
    name: "Tottenham",
    description:
      "Bukayo Saka’s brilliant double helped Arsenal secure a crucial 3-1 victory over Chelsea at Emirates Stadium. The Gunners now sit 5 points clear at the",
    image: "/arsenal.jpg",
  },
];

const faqs: FAQ[] = [
  {
    question: 'What does the term "hat trick" mean in soccer?',
    answer:
      "A hat trick is a term used for the same player having scored three goals in a single game.",
  },
  {
    question: 'What is the term "hat trick" mean in soccer?',
    answer:
      "A hat trick is a term used for the same player having scored three goals in a single game.",
  },
  {
    question: "What is “offside” in soccer?",
    answer:
      "A player shall be called for an offside penalty in soccer if, at the moment the ball is passed to him by a teammate, he is in an offside position (does not have at least one defender between and at least one defender level with him and the goal-line.",
  },
  {
    question: "What is “offside” in soccer?",
    answer:
      "A player shall be called for an offside penalty in soccer if, at the moment the ball is passed to him by a teammate, he is in an offside position (does not have at least one defender between and at least one defender level with him and the goal-line.",
  },
];

const rules: Rule[] = [
  {
    title: "No Hands",
    description:
      "Only the goalkeeper may use their hands inside the penalty area.",
    image: "/No Hands.png",
  },
  {
    title: "Kickoff",
    description:
      "The match starts with a kickoff from the center spot and restarts after each goal.",
    image: "/Kickoff.png",
  },
  {
    title: "Scoring",
    description:
      "A goal is scored when the ball fully crosses the goal line between the posts and under the crossbar.",
    image: "/Scoring.png",
  },
  {
    title: "Offside",
    description:
      "A player is offside if they are nearer to the opponent’s goal than the second-last defender when receiving the ball.",
    image: "/Offside.png",
  },
  {
    title: "Fouls",
    description:
      "Tripping, pushing, holding, or deliberate handball are fouls and may result in free kicks or penalties.",
    image: "/Fouls.png",
  },
];

export default function FootballPage() {
  return (
    <div className="min-h-screen bg-white py-6">
      <div className="mx-auto max-w-7xl sm:px-10 lg:px-20">
        <div className="grid md:grid-cols-3 m">
          <section className="md:col-span-2 rounded-2xl shadow-xl p-5 border border-gray-200 max-w-2xl">
            <h2 className="text-2xl font-semibold  text-slate-800 mb-6">
              Club Bios
            </h2>
            <div className="space-y-6  overflow-y-auto hide-scrollbar">
              {clubs.map((club, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl"
                >
                  <div className="relative w-40 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={club.image}
                      alt={club.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-900">
                      {club.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {club.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl shadow-xl p-4 border border-gray-200 max-w-[500px]">
            <h2 className="text-2xl font-semibold  text-slate-800 mb-6">
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-3 border border-gray-200"
                >
                  <h3 className="font-semibold ">{faq.question}</h3>
                  <p className="text-sm text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 md:mt-12">
          <h2 className="text-2xl font-semibold text-center text-slate-800 mb-6">
            Football Rules
          </h2>
          <div className="flex justify-between items-center space-x-4">
            {rules.map((rule, idx) => (
              <RuleCard
                key={idx}
                title={rule.title}
                description={rule.description}
                image={rule.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
