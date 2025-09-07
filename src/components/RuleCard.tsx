"use client";
import Image from "next/image";
import React from "react";

type RuleCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function RuleCard({ title, description, image }: RuleCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden group h-56 w-40">
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-0 flex flex-col items-center justify-center p-4 text-white transition-all duration-300 group-hover:h-full group-hover:bg-gradient-to-t group-hover:from-emerald-700/70 group-hover:via-emerald-700/40 group-hover:to-transparent">
          <div className="flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm mt-2">{description}</p>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-white text-center font-bold text-lg p-4 transition-opacity duration-300 group-hover:opacity-0">
          <div className="px-3 py-1 bg-emerald-700/40 rounded-md backdrop-blur-sm">
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
