import getNowPlaying from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET(){
    const nowPlaying = await getNowPlaying()

    if(!nowPlaying || !nowPlaying.item){
        return NextResponse.json({isPlaying: false})
    }
    const isPlaying = nowPlaying.is_playing
    const songName = (nowPlaying.item as any).name
    const artistName = (nowPlaying.item as any).artists.map((artist: any)=> artist.name).join(", ")
    const albumArt = (nowPlaying.item as any).album.images[0]?.url
    const progress = nowPlaying.progress_ms
    const duration = (nowPlaying.item as any).duration_ms

    return NextResponse.json({
        isPlaying,
        songName,
        artistName,
        albumArt,
        progress,
        duration
    })
    
}