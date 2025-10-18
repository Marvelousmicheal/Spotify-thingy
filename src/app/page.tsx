
import AudioWave from "@/components/audio-wave";
import NowPlayingWidget from "@/components/now-playing-widget";
import { Button } from "@/components/ui/button";
import { Music2, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center space-y-10">
          <div className="flex justify-center mb-8">
            <AudioWave />
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight text-balance">
              Discover Your
              <span className="block text-primary mt-2">Perfect Sound</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered music recommendations tailored to your mood and taste
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/moods">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-5 h-auto font-medium transition-colors rounded-lg"
              >
                Get Started
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary text-base px-8 py-5 h-auto font-medium transition-colors bg-transparent rounded-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-px bg-primary/20 rounded-xl overflow-hidden mb-16">
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Songs</div>
            </div>
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Moods</div>
            </div>
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Personalized</div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large Feature Card */}
            <div className="lg:row-span-2 bg-card border border-border rounded-xl p-10 flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Music2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Mood-Based Discovery</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our intelligent system analyzes your emotional state and curates a perfect soundtrack. From energetic
                  workouts to peaceful meditation, every mood has its perfect playlist.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-3 text-primary font-medium">
                  <span>Explore Moods</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Small Feature Cards */}
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms that understand your unique taste and preferences.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Always Fresh</h3>
              <p className="text-muted-foreground leading-relaxed">
                Constantly updated recommendations that evolve with your listening habits and mood patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <NowPlayingWidget/>
    </main>
    </>
  );
}
