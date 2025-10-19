import SongList from "@/components/SongList";
import { getSpotifyApi } from "@/lib/spotify";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAiRecommendations, Song } from "@/lib/ai";

async function getSpotifyGenreSongs(genre: string): Promise<Song[]> {
  try {
    const spotifyApi = await getSpotifyApi();
    const result = await spotifyApi.searchTracks(`genre:${genre}`, { limit: 10 });
    
    if (!result.body.tracks) return [];

    return result.body.tracks.items.map((item) => {
      const durationMs = item.duration_ms;
      const minutes = Math.floor(durationMs / 60000);
      const seconds = ((durationMs % 60000) / 1000).toFixed(0);
      
      return {
        id: item.id,
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        albumCover: item.album.images[0]?.url || "",
        duration: `${minutes}:${seconds.padStart(2, '0')}`,
        songUrl: item.external_urls.spotify,
      };
    });
  } catch (error) {
    console.error("Error fetching Spotify genre songs:", error);
    return [];
  }
}

export default async function MoodPage(props: {
  params: Promise<{ mood: string }>;
  searchParams: Promise<{ source?: string }>;
}) {
  // ✅ Await params & searchParams
  const { mood } = await props.params;
  const { source } = await props.searchParams;

  const decodedMood = decodeURIComponent(mood);
  const isAiSource = source === "ai";

  let songs: Song[];

  if (isAiSource) {
    songs = await getAiRecommendations(decodedMood);
  } else {
    songs = await getSpotifyGenreSongs(decodedMood);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 space-y-4">
          <Link href="/moods">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-transparent -ml-4"
            >
              ← Back to Moods
            </Button>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight capitalize">
            {decodedMood}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isAiSource ? "AI-generated playlist" : `${songs.length} songs curated for your mood`}
          </p>
        </div>

        {songs.length > 0 ? (
          <SongList songs={songs} />
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-white">No songs found for your vibe.</p>
            <p className="text-muted-foreground mt-2">
              Try describing it a different way.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
