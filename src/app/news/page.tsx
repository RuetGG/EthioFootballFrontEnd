import NewsGrid from "@/src/components/ui/NewsGrid";
import NewsSources from "@/src/components/ui/NewsSources";

export default function Home() {
	return (
		<main className="p-6 space-y-10">
			<NewsGrid />
			<NewsSources />
		</main>
	);
}
