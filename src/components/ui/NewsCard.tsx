import { Calendar } from "lucide-react";

interface NewsCardProps {
	image: string;
	status: "Live" | "Updated" | "Curated";
	category: string;
	title: string;
	time: string;
	source: string;
	description: string;
}

export default function NewsCard({
	image,
	status,
	category,
	title,
	time,
	source,
	description,
}: NewsCardProps) {
	return (
		<div className="rounded-2xl overflow-hidden shadow-md border bg-white flex flex-col">
			{/* Image + Tags */}
			<div className="relative">
				<img src={image} alt={title} className="w-full h-48 object-cover" />
				<span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
					{status}
				</span>
				<span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
					{category}
				</span>
			</div>

			{/* Content */}
			<div className="p-4 flex flex-col flex-grow">
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-sm text-gray-500 flex items-center mt-1">
					<Calendar className="w-4 h-4 mr-1" />
					{time} · {source}
				</p>
				<p className="text-sm text-gray-600 mt-2 flex-grow">{description}</p>

				{/* Buttons */}
				<div className="mt-4 flex gap-2">
					<button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
						Read Source
					</button>
					<button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
						RSS Feed
					</button>
				</div>
			</div>
		</div>
	);
}
