

export default function AudioWave() {
  return (
    <>
    <div className="flex items-center justify-center gap-1 h-12">
{
    [
        ...Array(6)
    ].map((_ , i) => (
        <div style={{animationDelay: `${i * 0.1}s`, height:"100%"}} key={i} className="w-1 bg-primary animate-wave">

        </div>
    ))
}
    </div>
    </>
  )
}

 