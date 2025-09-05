export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col items-center px-6 mt-12 w-full">
        <section className="max-w-5xl w-full">
          <div className="shadow-md border rounded-2xl p-8 text-center bg-white">
            <h2 className="text-2xl font-semibold mb-3">
              Ask anything about{" "}
              <span className="text-green-700">Ethiopian football</span>
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Get live scores, team stats, player info, and match analysis
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
                EPL Table
              </button>
              <button className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
                Wallias Next Match
              </button>
              <button className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
                Local Clubs
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 flex items-center border rounded-xl p-3 shadow-sm bg-white">
            <input
              type="text"
              placeholder="Ask about teams, players, matches..."
              className="flex-1 px-3 py-2 focus:outline-none text-gray-700"
            />
            <button className="ml-3 p-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4l16 8-16 8V4z"
                />
              </svg>
            </button>
          </div>

          {/* Quick Filter */}
          <div className="flex flex-wrap gap-3 mt-6 text-sm justify-center">
            <span className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full px-4 py-2 transition">
              EPL Table
            </span>
            <span className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full px-4 py-2 transition">
              Walia Squad
            </span>
            <span className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full px-4 py-2 transition">
              Upcoming Fixtures
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
