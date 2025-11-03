import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/reptiles-hero.webp";
import { Bug, Droplets, Microscope, Globe, ChevronDown, Calendar, PlayCircle, MapPin, Star, Award, Users, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface LandingScreenProps {
  onContinue: () => void;
}

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
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

      {/* Trustpilot Rating */}
      <div className="flex items-center justify-center px-6 md:px-10 pb-6">
        <div className="bg-white rounded-lg border border-border px-4 md:px-5 py-2.5 md:py-3 flex items-center justify-center gap-2 md:gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mx-4">
          <span className="font-poppins font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-foreground whitespace-nowrap">
            Excellent
          </span>
          <div className="flex items-center gap-0.5 md:gap-1">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
            ))}
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} style={{ clipPath: 'inset(0 30% 0 0)' }} />
          </div>
          <span className="font-poppins font-medium text-[13px] md:text-[14px] lg:text-[16px] text-secondary whitespace-nowrap">
            4.7/5
          </span>
          <div className="h-4 md:h-5 w-px bg-border" />
          <span className="font-poppins font-semibold text-[13px] md:text-[14px] lg:text-[16px] text-foreground whitespace-nowrap">
            Trustpilot
          </span>
        </div>
      </div>

      <main className="pb-12">
        <div className="animate-fade-in">
          <div className="w-full max-w-[900px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Title Section */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="font-poppins font-semibold text-[28px] md:text-[32px] lg:text-[36px] text-foreground mb-3 tracking-tight leading-tight">
                Into the Wild: Exploring Reptiles & Amphibians
              </h1>
              <p className="font-poppins text-[16px] md:text-[18px] text-secondary font-medium tracking-wide mb-3">
                Live, weekly, science classes with real reptiles & amphibians
              </p>
              {/* Ages Tag */}
              <div className="inline-block bg-[#FFF1EC] border border-primary rounded-full px-[14px] py-[6px]">
                <span className="font-poppins font-medium text-[14px] text-primary">
                  Ages 8–13
                </span>
              </div>
            </div>

            {/* Hero Image with Video */}
            <div className="mb-10 md:mb-12">
              <div className="max-w-[75%] md:max-w-[60%] mx-auto relative">
                <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
                  <img 
                    src={heroImage} 
                    alt="Into the Wild - Reptiles and Amphibians Collage" 
                    className="w-full h-auto rounded-2xl border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 rounded-full p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-200">
                      <PlayCircle className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Dialog */}
            <Dialog open={showVideo} onOpenChange={setShowVideo}>
              <DialogContent className="p-0 bg-black border-none" style={{ width: '60vh', maxWidth: '90vw', aspectRatio: '9/16' }}>
                <video 
                  controls 
                  autoPlay
                  className="w-full h-full"
                >
                  <source src="/videos/ITW_V4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </DialogContent>
            </Dialog>

            {/* Feature Highlights Carousel */}
            <div className="mb-8 md:mb-10 overflow-hidden">
              {/* Mobile Version - Keep Exactly As Is */}
              <div className="md:hidden">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 3000,
                    }),
                  ]}
                  className="w-full max-w-[700px] mx-auto"
                >
                  <CarouselContent className="-ml-2">
                    <CarouselItem className="pl-2 basis-full">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2 px-6">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[14px] text-foreground whitespace-nowrap">
                          100+ Years of Teacher Experience
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="pl-2 basis-full">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2 px-6">
                        <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[14px] text-foreground whitespace-nowrap">
                          Founded by a Stanford Alum & Mom
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="pl-2 basis-full">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2 px-6">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[14px] text-foreground whitespace-nowrap">
                          Loved by 1000+ Families
                        </span>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Tablet/Desktop Version - Optimized */}
              <div className="hidden md:block relative">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                    dragFree: false,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4500,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                  className="w-full max-w-[1000px] mx-auto px-8"
                >
                  <CarouselContent className="-ml-6">
                    <CarouselItem className="pl-6 basis-1/3">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2.5 px-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[15px] text-foreground whitespace-nowrap">
                          100+ Years of Teacher Experience
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="pl-6 basis-1/3">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2.5 px-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                        <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[15px] text-foreground whitespace-nowrap">
                          Founded by a Stanford Alum & Mom
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="pl-6 basis-1/3">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2.5 px-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[15px] text-foreground whitespace-nowrap">
                          Loved by 1000+ Families
                        </span>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
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
                 Enroll for Free
              </button>
            </div>

            {/* Schedule Line */}
            <div className="text-center mb-6">
              <p className="font-inter text-[14px] md:text-[15px] text-accent italic font-medium">
                Classes every Thursday at 5:00 PM PST.
              </p>
            </div>

            {/* What Kids Learn Title */}
            <div className="text-center mb-6">
              <h2 className="font-poppins font-semibold text-[22px] md:text-[24px] text-foreground">
                What Kids Learn
              </h2>
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

            {/* Upcoming Schedule Expandable Section */}
            <div className="mb-10 md:mb-12 max-w-[700px] mx-auto">
              <div 
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Header - Always Visible */}
                <button
                  onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
                  className="w-full p-5 md:p-6 flex items-center justify-between hover:bg-background/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" strokeWidth={2} />
                    <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-foreground text-left">
                      Upcoming Schedule
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-secondary transition-transform duration-200 ${isScheduleExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expandable Content */}
                {isScheduleExpanded && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 space-y-6 animate-fade-in">
                    {/* Week 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 1
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          The Philippines
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Flying lizards & rare island species
                        </p>
                      </div>
                    </div>

                    {/* Week 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 2
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          Tasmania
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Native amphibians from a unique ecosystem
                        </p>
                      </div>
                    </div>

                    {/* Week 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 3
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          New Zealand
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Ancient reptiles like the tuatara & their island adaptations
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
                  boxShadow: '0 0 40px rgba(60, 125, 87, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
                  animation: 'pulse-glow 3s ease-in-out infinite'
                }}
              >
                {/* Parent Info at Top */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B4D6B3] flex items-center justify-center">
                    <span className="font-poppins font-semibold text-[20px] text-[#3C7D57]">
                      J
                    </span>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-[16px] md:text-[17px] text-foreground">
                      Jennifer
                    </h3>
                    <p className="font-poppins text-[13px] md:text-[14px] text-secondary flex items-center gap-1">
                      <span>📍</span>
                      California
                    </p>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="relative">
                  <div className={`${!isExpanded ? 'max-h-[140px] md:max-h-[120px]' : ''} overflow-hidden relative`}>
                    <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed mb-4">
                      My daughter absolutely loves this class and the teacher.
                    </p>
                    <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed mb-4">
                      We signed her up because we wanted her to try a few science classes, though it's not really her thing. So I honestly wasn't expecting her to stick with it. She usually drops out of science classes after 3 or 4 weeks. But I was genuinely happy and surprised when she wanted to keep taking this one.
                    </p>
                    {isExpanded && (
                      <>
                        <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed mb-4">
                          She loves the animal the teacher brings that they all call Lizzie and now she's always pointing out reptiles and species on walks or even on our balcony. She's started sharing facts at dinner, asking to look for frogs in the backyard and drawing pictures of the animals she learns about.
                        </p>
                        <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed">
                          I love that the class feels so lively, and we couldn't be happier seeing her pick up on the topic so well.
                        </p>
                      </>
                    )}
                  </div>
                    
                  {/* Gradient Fade Overlay (only when collapsed) */}
                  {!isExpanded && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, white)'
                      }}
                    />
                  )}

                  {/* Show More/Less Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 flex items-center gap-1 font-poppins font-medium text-[14px] text-[#3C7D57] hover:text-[#3C7D57]/90 transition-colors"
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
                 Enroll for Free
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
