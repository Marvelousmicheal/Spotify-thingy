"use client"

import { Music2, Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"



export default function NowPlayingWidget() {
    const [isOnline, setIsOnline] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<any>(null)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await fetch('/api/now-playing')
                const data = await res.json()
                console.log(data)
                setNowPlaying(data)
            } catch (error) {
                console.error("Error fetching now playing data", error)
                setIsOnline(false)
            }finally{
                setLoading(false)
            }
        }
        fetchData()

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval)
    },[]) 
    return (
        <div className="fixed bottom-8 right-8 w-80 bg-card border border-primary/30 rounded-xl p-6 backdrop-blur-sm z-50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {isOnline && nowPlaying?.isPlaying ? (
                        <>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary text-xs font-medium uppercase tracking-wider">Now Playing</span>
                        </>
                    ) : (
                        <>
                            <WifiOff className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Offline</span>
                        </>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <Music2 className="w-8 h-8 text-primary" />
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="bg-primary/20 h-4 w-3/4 rounded-md animate-pulse mb-2"></div>
                        <div className="bg-primary/10 h-3 w-1/2 rounded-md animate-pulse"></div>
                    </div>
                </div>
            ) : isOnline && nowPlaying?.isPlaying ? (
                <>
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img src={nowPlaying.albumArt} alt={nowPlaying.songName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-sm mb-1 truncate">{nowPlaying.songName}</div>
                            <div className="text-muted-foreground text-xs truncate">{nowPlaying.artistName}</div>
                            <div className="mt-3">
                                <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-300"
                                        style={{ width: `${(nowPlaying.progress / nowPlaying.duration) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                    <span>{new Date(nowPlaying.progress).toISOString().substr(14, 5)}</span>
                                    <span>{new Date(nowPlaying.duration).toISOString().substr(14, 5)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end justify-center gap-1 mt-4 h-8">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 bg-primary rounded-full animate-equalizer"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                        <Music2 className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <div className="text-muted-foreground text-sm text-center">No song playing</div>
                    <div className="text-muted-foreground/60 text-xs text-center mt-1">Start listening to see what's playing</div>
                </div>
            )}
        </div>
    );
}

