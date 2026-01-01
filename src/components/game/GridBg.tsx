import { FlickeringGrid } from "@/components/ui/flickering-grid"

export const GridBg = () => {
  return (
    <div className="bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-0">
      <FlickeringGrid
        className="relative inset-0 z-0 mask-[radial-gradient(600px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={1200}
        width={1200}
      />
    </div>
  )
}
