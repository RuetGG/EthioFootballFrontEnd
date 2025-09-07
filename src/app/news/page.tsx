"use client";

import React, { useEffect, useState } from "react";
import { fetchNews } from "@/src/lib/news"; 
import { Trophy, Calendar, History, Zap, Radio, TrendingUp } from "lucide-react";

interface NewsData {
  [key: string]: string[];
}

interface NewsSection {
  title: string;
  icon: JSX.Element;
  gradient: string;
  iconBg: string;
  accentColor: string;
  description: string;
}

// Sections config
const NEWS_SECTIONS: Record<string, NewsSection> = {
  standings: {
    title: "League Standings",
    description: "Latest position updates",
    icon: <Trophy className="w-6 h-6 text-amber-600" />,
    gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
    iconBg: "bg-amber-50 border border-amber-200",
    accentColor: "bg-gradient-to-r from-amber-400 to-orange-500",
  },
  futureMatches: {
    title: "Upcoming Fixtures",
    description: "Matches to watch",
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
    gradient: "bg-gradient-to-br from-blue-400 to-indigo-500",
    iconBg: "bg-blue-50 border border-blue-200",
    accentColor: "bg-gradient-to-r from-blue-400 to-indigo-500",
  },
  pastMatches: {
    title: "Recent Results",
    description: "Match highlights",
    icon: <History className="w-6 h-6 text-purple-600" />,
    gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    iconBg: "bg-purple-50 border border-purple-200",
    accentColor: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  liveScores: {
    title: "Live Scores",
    description: "Real-time updates",
    icon: <Zap className="w-6 h-6 text-red-600" />,
    gradient: "bg-gradient-to-br from-red-400 to-rose-500",
    iconBg: "bg-red-50 border border-red-200",
    accentColor: "bg-gradient-to-r from-red-400 to-rose-500",
  },
};

// NewsCard Component
const NewsCard: React.FC<{
  sectionKey: string;
  section: NewsSection;
  items: string[];
}> = ({ sectionKey, section, items }) => (
  <article
    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
    aria-labelledby={`${sectionKey}-heading`}
  >
    {/* Gradient Background */}
    <div
      className={`absolute inset-0 ${section.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
    />

    {/* Header */}
    <header className="relative p-6 pb-4">
      <div className="flex items-center gap-4 mb-2">
        <div
          className={`p-3 ${section.iconBg} rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
        >
          {section.icon}
        </div>
        <div className="flex-1">
          <h2
            id={`${sectionKey}-heading`}
            className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-gray-800 transition-colors duration-300"
          >
            {section.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{section.description}</p>
        </div>
        {sectionKey === "liveScores" && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              Live
            </span>
          </div>
        )}
      </div>
    </header>

    {/* Content */}
    <div className="relative px-6 pb-6">
      {items.length > 0 ? (
        <ul className="space-y-3" role="list">
          {items.map((news, idx) => (
            <li
              key={idx}
              className="group/item relative p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm"
              role="listitem"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-3 h-3 mt-2 rounded-full ${section.accentColor} shadow-sm group-hover/item:scale-125 transition-transform duration-300`}
                />
                <p className="text-gray-800 leading-relaxed text-sm group-hover/item:text-gray-900 transition-colors duration-300">
                  {news}
                </p>
              </div>
              {/* Hover indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${section.accentColor} rounded-r-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No news available at this time
        </div>
      )}
    </div>
  </article>
);

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchNews();
      setNewsData(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-4xl">⚽</div>
            </div>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Football News
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stay updated with the latest football news, live scores, and match
            results
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading news...</p>
        ) : newsData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(newsData).map(([key, items]) => {
              const section =
                NEWS_SECTIONS[key] ??
                ({
                  title: key,
                  description: "Latest updates",
                  icon: <Radio className="w-6 h-6 text-gray-600" />,
                  gradient: "bg-gradient-to-br from-gray-400 to-gray-500",
                  iconBg: "bg-gray-50 border border-gray-200",
                  accentColor: "bg-gradient-to-r from-gray-400 to-gray-500",
                } as NewsSection);

              return (
                <NewsCard
                  key={key}
                  sectionKey={key}
                  section={section}
                  items={items}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No news found</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Football News Center</span>
          </div>
          <p className="text-gray-400 text-sm">
            Your premier destination for football news and live updates
          </p>
        </div>
      </footer>
    </main>
  );
}
