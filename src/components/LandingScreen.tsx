import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/reptiles-hero.webp";
import { Bug, Droplets, Microscope, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

interface LandingScreenProps {
  onContinue: () => void;
}

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Logo at top center */}
      <div className="flex items-center justify-center px-6 md:px-10 py-8">
        <img 
          src={coralLogo} 
          alt="Coral Academy" 
          className="h-10 md:h-12"
        />
      </div>

      <main className="pb-12">
        <div className="animate-fade-in">
          <div className="w-full max-w-[900px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Title Section */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="font-poppins font-semibold text-[28px] md:text-[32px] lg:text-[36px] text-foreground mb-3 tracking-tight leading-tight">
                Into the Wild: Exploring Reptiles & Amphibians
              </h1>
              <p className="font-poppins text-[16px] md:text-[18px] text-secondary font-normal tracking-wide mb-3">
                Live, interactive science classes where kids meet real reptiles and amphibians — from snakes and salamanders to frogs and geckos!
              </p>
              {/* Ages Tag */}
              <div className="inline-block bg-[#FFF1EC] border border-primary rounded-full px-[14px] py-[6px]">
                <span className="font-poppins font-medium text-[14px] text-primary">
                  Ages 8–13
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-10 md:mb-12">
              <div className="max-w-[90%] md:max-w-[85%] mx-auto">
                <img 
                  src={heroImage} 
                  alt="Into the Wild - Reptiles and Amphibians Collage" 
                  className="w-full h-auto rounded-2xl border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-10 md:mb-12">
              <button
                onClick={onContinue}
                className="h-[50px] md:h-[52px] px-10 md:px-12 font-poppins font-semibold text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                Try for Free Now
              </button>
            </div>

            {/* Learning Outcomes Section */}
            <div className="mb-10 md:mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[700px] mx-auto">
                {/* Learn About Real Reptiles */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Bug className="w-6 h-6 text-accent mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Learn About Real Reptiles
                  </p>
                </div>
                
                {/* Explore Amphibians Up Close */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Droplets className="w-6 h-6 text-secondary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Explore Amphibians Up Close
                  </p>
                </div>
                
                {/* Discover Unique Animal Facts */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Microscope className="w-6 h-6 text-primary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Discover Unique Animal Facts
                  </p>
                </div>
                
                {/* Travel Virtually to Wild Places */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Globe className="w-6 h-6 text-accent mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Travel Virtually to Wild Places
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule Line */}
            <div className="text-center mb-10 md:mb-12">
              <p className="font-inter text-[14px] md:text-[15px] text-accent italic">
                Classes every Thursday at 5:00 PM PST.
              </p>
            </div>

            {/* Parent Testimonial Section */}
            <div className="mb-10 md:mb-12 max-w-[700px] mx-auto">
              {/* Section Title */}
              <h2 className="font-poppins font-semibold text-[22px] md:text-[24px] text-foreground text-center mb-6">
                Parent Testimonial
              </h2>

              <div 
                className="bg-white rounded-2xl p-5 md:p-6 relative overflow-hidden"
                style={{
                  boxShadow: '0 0 40px rgba(240, 90, 38, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
                  animation: 'pulse-glow 3s ease-in-out infinite'
                }}
              >
                {/* Parent Info at Top */}
                <div className="mb-4">
                  <h3 className="font-poppins font-semibold text-[16px] md:text-[17px] text-foreground">
                    Sarah
                  </h3>
                  <p className="font-poppins text-[13px] md:text-[14px] text-secondary">
                    California
                  </p>
                </div>

                {/* Testimonial Text */}
                <div className="relative">
                  <div className={`${!isExpanded ? 'max-h-[140px] md:max-h-[120px]' : ''} overflow-hidden relative`}>
                    <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed">
                      As a parent and animal lover, I'm always looking for learning that feels alive — and Coral Academy's Into the Wild class is exactly that. My 10-year-old daughter loves animals but had never seen a live class with real reptiles and amphibians before.
                      {isExpanded && (
                        <span>
                          {" "}Now, she can name frogs, salamanders, and snakes from around the world! Each session feels like a field trip — they've met Scaly the Corn Snake and Slimy the Tiger Salamander, and she loves sharing her own drawings during class. It's interactive, fun, and taught by teachers who truly care. I often find myself watching along — it's that fascinating!
                        </span>
                      )}
                    </p>
                    
                    {/* Gradient Fade Overlay (only when collapsed) */}
                    {!isExpanded && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to bottom, transparent, white)'
                        }}
                      />
                    )}
                  </div>

                  {/* Show More/Less Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 flex items-center gap-1 font-poppins font-medium text-[14px] text-primary hover:text-primary/90 transition-colors"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={onContinue}
                className="h-[50px] md:h-[52px] px-10 md:px-12 font-poppins font-semibold text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                Try for Free Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
