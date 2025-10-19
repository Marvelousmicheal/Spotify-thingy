import { getSpotifyApi } from "./spotify";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: string;
  songUrl: string;
}

export async function getAiRecommendations(prompt: string): Promise<Song[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`AI API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const aiSongs: { title: string; artist: string }[] = data.recommendations;

    if (!aiSongs || aiSongs.length === 0) {
      return [];
    }

    const spotifyApi = await getSpotifyApi();
    const detailedSongs = await Promise.all(
      aiSongs.map(async (song) => {
        const result = await spotifyApi.searchTracks(
          `track:${song.title} artist:${song.artist}`,
          { limit: 1 }
        );
        const track = result.body.tracks?.items[0];

        if (!track) return null;

        const durationMs = track.duration_ms;
        const minutes = Math.floor(durationMs / 60000);
        const seconds = ((durationMs % 60000) / 1000).toFixed(0);

        return {
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          albumCover: track.album.images[0]?.url || "",
          duration: `${minutes}:${seconds.padStart(2, "0")}`,
          songUrl: track.external_urls.spotify,
        };
      })
    );

    return detailedSongs.filter((song): song is Song => song !== null);

  } catch (error) {
    console.error("Error in getAiRecommendations:", error);
    return [];
  }
}
