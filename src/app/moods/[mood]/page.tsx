import SongList from "@/components/SongList"
import SongSubmissionForm from "@/components/SongSubmissionForm"
import GenerateAISongsButton from "@/components/GenerateAISongsButton"
import { getSpotifyApi } from "@/lib/spotify";
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface Song {
   id: string;
   title: string;
   artist: string
   album: string
   albumCover: string
   duration: string
   songUrl: string

}


export default async function page({params}:{params:{mood: string}}) {
    const mood = decodeURIComponent(params.mood)

    let songs: Song[] = []

    try {
      const spotifyApi = await getSpotifyApi()
      const result = await spotifyApi.searchTracks(`genre:${mood}`, {limit:10})
      if(result.body.tracks){
         songs = result.body.tracks.items.map((item)=>{
            const durationMs = item.duration_ms
            const minutes = Math.floor(durationMs / 60000)
            const seconds = ((durationMs % 60000) / 1000).toFixed(0)
            const formattedDuration = `${minutes}:${seconds.padStart(2, '0')}`

            return{

               id: item.id,
               title: item.name,
               artist: item.artists[0].name,
               album: item.album.name,
               albumCover: item.album.images[0]?.url || "",
               duration: formattedDuration,
               songUrl: item.external_urls.spotify
            }

         })
      }

    } catch (error) {
      console.error("Error fetching songs from Spotify:", error);
    }
    console.log(songs)

  return (
   <>
   
    {/* <div>
        <div className="min-h-screen bg-black text-gray-300">
   13       <main className="container mx-auto px-4 py-8">
   14         <header className="text-center mb-12">
   15         <h1 className="text-5xl font-bold text-white">
   17             Songs for a <span className="text-green-500"
      >{mood}</span> Mood
   18           </h1>
   19         </header>
   20 
   21         <section>
   22           <div className="flex justify-between items-center 
      mb-6">
   23             <h2 className="text-3xl font-semibold 
      text-white">Recommended Songs</h2>
   24             <GenerateAISongsButton />
   25           </div>
   26           <SongList songs={songs}  />
   27         </section>
   28 
   29         <section className="mt-16">
   30           <h2 className="text-3xl font-semibold mb-6 
      text-white">Add Your Own Song</h2>
   31           <SongSubmissionForm />
   32         </section>
   33       </main>
   34     </div>

    </div> */}

    <main className="min-h-screen bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
         <div className="mb-12 space-y-4">
              <Link href="/moods">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-transparent mb-4 -ml-4 rounded-lg"
            >
              ← Change Mood
            </Button>
          </Link>
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight capitalize">{mood} Vibes</h1>
      <p className="text-xl text-muted-foreground">
         {songs.length} songs curated for your mood
      </p>


         </div>
         <SongList songs={songs}  />
            <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary text-base px-8 py-5 h-auto font-medium transition-colors bg-transparent rounded-lg"
          >
            Load More
          </Button>
        </div>
      </div>

    </main>
   </>
  )
}
