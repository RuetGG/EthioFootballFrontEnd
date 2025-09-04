"use client";
import { useState } from "react";
import NewsCard from "./NewsCard";
import NewsTabs from "./NewsTabs";

const dummyNews = [
	{
		image: "/news1.jpg",
		status: "Live",
		category: "Premier League",
		title: "Arsenal Extends Lead at Top of Premier League",
		time: "2 hours ago",
		source: "BBC Sport",
		description:
			"Bukayo Saka’s brilliant double helped Arsenal secure a crucial 3-1 victory over Chelsea at Emirates Stadium. The Gunners now sit 5 points clear at the top.",
	},
	{
		image: "/news2.jpg",
		status: "Updated",
		category: "Ethiopian Football",
		title: "Ethiopia Secures Win in CAF Qualifiers",
		time: "4 hours ago",
		source: "Capital Ethiopia",
		description:
			"The Ethiopian national team secured a thrilling 2-1 win in the CAF qualifiers, keeping their hopes alive for the tournament.",
	},
	{
		image: "/news3.jpg",
		status: "Curated",
		category: "International",
		title: "UEFA Champions League Heats Up",
		time: "1 day ago",
		source: "Sky Sports",
		description:
			"The knockout stages of the Champions League continue to deliver surprises as underdogs rise against Europe’s football giants.",
	},
];

export default function NewsGrid() {
	const [activeTab, setActiveTab] = useState("All News");

	const filteredNews =
		activeTab === "All News"
			? dummyNews
			: dummyNews.filter((news) => news.category === activeTab);

	return (
		<div className="space-y-6">
			<NewsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredNews.length > 0 ? (
					filteredNews.map((news, i) => <NewsCard key={i} {...news} />)
				) : (
					<p className="col-span-full text-center text-gray-500">
						No news available for this category.
					</p>
				)}
			</div>
		</div>
	);
}
