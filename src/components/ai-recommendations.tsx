"use client"
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


export default function AiRecommendations() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleGenerate = async () => {
        if(!input.trim()) return;
        setIsLoading(true)
        const encodedPrompt = encodeURIComponent(input.trim())
        router.push(`/moods/${encodedPrompt}?source=ai`);

    }    
  return (
   <>
   <Button
        onClick={()=> setIsOpen(true)}
        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all duration-300 hover:bg-primary/90 active:scale-95"
      >
        <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span>Generate with AI</span>
        <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 transition-colors duration-300" />
      </Button>

      {
        isOpen && (
             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-primary/30 rounded-xl w-full max-w-md p-8 space-y-6 animate-in scale-in-95 duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

             <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Describe your vibe</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
             <div className="space-y-3">
              <textarea
              value={input}
               onChange={(e)=> setInput(e.target.value)}
                placeholder="What are you feeling right now?"
                className="w-full bg-background border border-primary/20 rounded-lg p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none h-24"
              />
            </div>
             <Button
             disabled={!input.trim() || isLoading }
             onClick={handleGenerate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground font-medium py-5 h-auto rounded-lg transition-all duration-300"
            >
            {
                isLoading ? (

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Generating...
                </div>
                ) : (

                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Recommendations
                </div>
                )
            }
             
            
            </Button>



            </div>
            </div>
        )
      }
   </>
  )
}

 