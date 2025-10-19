"use client";

import Link from "next/link"; // Step 1: Import the Link component
import { useState } from "react";
import { ChillAnimation, EnergeticAnimation, FocusedAnimation, HappyAnimation, PartyAnimation, PeacefulAnimation, RomanticAnimation, SadAnimation } from "./mood-animations";
import { Button } from "./ui/button";


const moods = [
  { id: "happy", label: "Happy", description: "Upbeat and energetic vibes", animation: HappyAnimation },
  { id: "chill", label: "Chill", description: "Relaxed and mellow tunes", animation: ChillAnimation },
  { id: "energetic", label: "Energetic", description: "High-energy workout music", animation: EnergeticAnimation },
  { id: "sad", label: "Sad", description: "Emotional and reflective songs", animation: SadAnimation },
  { id: "focused", label: "Focused", description: "Concentration and productivity", animation: FocusedAnimation },
  { id: "romantic", label: "Romantic", description: "Love songs and ballads", animation: RomanticAnimation },
  { id: "party", label: "Party", description: "Dance and celebration hits", animation: PartyAnimation },
  { id: "peaceful", label: "Peaceful", description: "Calm and serene melodies", animation: PeacefulAnimation },
]

export default function MoodSelectionGrid() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);



  return (
    <>

     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {moods.map((mood) => {
            const AnimationComponent = mood.animation
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-8 bg-card border-2 transition-all text-left rounded-xl ${
                  selectedMood === mood.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <AnimationComponent />
                </div>
                {selectedMood === mood.id && <AnimationComponent />}
                <h3 className="text-2xl font-semibold text-white mb-2">{mood.label}</h3>
                <p className="text-muted-foreground leading-relaxed">{mood.description}</p>
              </button>
            )
          })}
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-transparent text-base px-6 py-5 h-auto font-medium transition-colors bg-transparent rounded-lg"
            >
              Back
            </Button>
          </Link>
          <Link href={selectedMood ? `/moods/${encodeURIComponent(selectedMood)}` : "#"}>
            <Button
              size="lg"
              disabled={!selectedMood}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-base px-6 py-5 h-auto font-medium transition-colors rounded-lg"
            >
              Get Recommendations
            </Button>
          </Link>
        </div>
    </>
  );
}
