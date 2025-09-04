"use client";

interface NewsTabsProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const tabs = [
	"All News",
	"Premier League",
	"Ethiopian Football",
	"International",
];

export default function NewsTabs({ activeTab, setActiveTab }: NewsTabsProps) {
	return (
		<div className="flex justify-center gap-4 bg-gray-100 rounded-full p-2">
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => setActiveTab(tab)}
					className={`px-4 py-2 rounded-full text-sm font-medium transition ${
						activeTab === tab
							? "bg-green-600 text-white"
							: "hover:bg-green-100 text-gray-700"
					}`}
				>
					{tab}
				</button>
			))}
		</div>
	);
}
