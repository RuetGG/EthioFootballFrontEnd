import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function EthiopianFootballPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/image1.png')`,
          }}
        ></div>

        <div className="absolute inset-0"></div>
        <div className="absolute bottom-0 left-0 z-10 text-white p-8 md:p-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 leading-tight">
            Experience the Thrill <br /> of Ethiopian Football
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100">
            Join us in celebrating the passion and excitement of Ethiopian
            football. Stay updated with the latest news, match results, and
            player stories.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-gray-900 px-6 py-3 font-semibold">
              Join
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-6 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/image2.png"
                alt="Ethiopian football player in action"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6 bg-gray-100 p-8 rounded-lg ">
              <h2 className="text-4xl font-bold text-balance text-gray-900">
                Discover the Heart of Ethiopian Football
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Stay informed with the latest updates in Ethiopian football. Our
                platform brings you real-time news, match scores, and in-depth
                player profiles. Join a community that celebrates the passion
                and culture of the sport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Hub Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden border border-gray-200 bg-gray-50 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-0">
              <CardContent className="p-12 space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-balance text-gray-900">
                    Discover the Ultimate Hub for Ethiopian Football Fans and
                    Enthusiasts
                  </h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  EthioFootball keeps you informed with the latest news and
                  match updates. Join a vibrant community that shares your
                  passion for the beautiful game.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-3"></div>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-3"></div>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-3"></div>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </CardContent>

              <div className="relative">
                <img
                  src="/image6.png"
                  alt="Ethiopian football fans celebrating with THIOPIA scarf"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white">
              <div className="h-48 overflow-hidden">
                <img
                  src="/image3.png"
                  alt="Football in goal net"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-gray-900">
                  Stay Updated with Latest News
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-gray-600 mb-4">
                  Get the freshest news on local leagues and national teams.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white">
              <div className="h-48 overflow-hidden">
                <img
                  src="/image4.png"
                  alt="Ethiopian team celebrating"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-gray-900">
                  Real-Time Match Scores at Your Fingertips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-gray-600 mb-4">
                  Follow live scores and updates for every match.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white relative">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="/image5.png"
                  alt="Ethiopian national team squad"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-gray-900">
                  Explore In-Depth Team Profiles
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-gray-600 mb-4">
                  Learn about your favorite players and their journeys.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3">
              Learn More →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
