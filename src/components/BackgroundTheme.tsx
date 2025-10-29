import { Bug, Droplets, Leaf, Flower2, Footprints, Trees } from "lucide-react";

export const BackgroundTheme = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.08]">
      <Bug 
        className="absolute top-[15%] left-[10%] w-12 h-12 md:w-16 md:h-16 text-accent rotate-12" 
        strokeWidth={1.5}
      />
      <Leaf 
        className="absolute top-[25%] right-[15%] w-14 h-14 md:w-20 md:h-20 text-secondary -rotate-12" 
        strokeWidth={1.5}
      />
      <Droplets 
        className="absolute top-[55%] left-[8%] w-16 h-16 md:w-24 md:h-24 text-accent rotate-6" 
        strokeWidth={1.5}
      />
      <Flower2 
        className="absolute bottom-[20%] right-[12%] w-12 h-12 md:w-18 md:h-18 text-secondary -rotate-12" 
        strokeWidth={1.5}
      />
      <Footprints 
        className="absolute top-[70%] right-[25%] w-10 h-10 md:w-14 md:h-14 text-accent rotate-45" 
        strokeWidth={1.5}
      />
      <Trees 
        className="absolute bottom-[35%] left-[18%] w-14 h-14 md:w-20 md:h-20 text-secondary -rotate-6" 
        strokeWidth={1.5}
      />
    </div>
  );
};
