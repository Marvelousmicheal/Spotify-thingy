import MoodSelectionGrid from "@/components/MoodSelectionGrid";

export default function MoodsPage() {
  return (
    <>

    <main className="min-h-screen bg-black px-6 py-12">
       <div className="max-w-6xl mx-auto">
         <div className="mb-16 text-center space-y-4">
           <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">How are you feeling?</h1>
          <p className="text-xl text-muted-foreground">Select a mood to get personalized recommendations</p>
         </div>

         <MoodSelectionGrid/>
       </div>
    </main>
    </>
  );
}