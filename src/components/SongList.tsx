import Image from "next/image"
import { VinylRecord } from "./vinyl-record"
import { Equalizer } from "./equalizer"
import { Button } from "./ui/button"
import Link from "next/link"

interface Song{
  id:string
  title: string
  artist: string
  album: string
  albumCover: string
  duration: string
  songUrl: string

}

interface SongListProps{
  songs: Song[]
}


export default function SongList({songs}: SongListProps ) {

  if(!songs || songs.length === 0){
    return(

      <div className="text-center py-10">
            <p className="text-gray-400">No songs found for this mood. Try another!</p>
        </div>
    )
  }
 
  

  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
         <div key={song.id} className="flex items-center gap-6 p-6 bg-card border border-border hover:border-primary/50 transition-colors group rounded-xl">
              <div className="text-2xl font-bold text-muted-foreground w-8 text-right group-hover:text-primary transition-colors">
                {index + 1}
              </div>
               <div className="w-16 h-16 flex-shrink-0 relative rounded-lg overflow-hidden">
                {
                  song.albumCover ? (
                    <Image
                  src={song.albumCover}
                  alt={`Album cover for ${song.album}`}
                  fill
                 className="rounded-md object-cover"
                />
                  ): (
                   <VinylRecord/>
                  )
                }
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                  <Equalizer />
                </div>
               </div>
                 <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-white mb-1 truncate">{song.title}</h3>
                <p className="text-muted-foreground truncate">{song.artist}</p>
              </div>
              <div className="hidden md:block text-muted-foreground">
                {song.album}
              </div>
              <div className="text-muted-foreground font-mono">
                {song.duration}
              </div>
              <Link href={song.songUrl} target="_blank" rel="noopener noreferrer" >
              
                    <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-5 py-2 rounded-lg"
              >
                Play
              </Button>
              </Link>

            </div>

      ))}
    </div>
  );
}
