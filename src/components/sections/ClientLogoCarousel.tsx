
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

// High-quality client logos with more professional imagery
const clientLogos = [
  { id: 1, name: "Bab El7ara", image: "/logos/png/bab-el7ara.png" },
  { id: 2, name: "Bingo", image: "/logos/png/bingo.png" },
  { id: 3, name: "Concord", image: "/logos/png/concord.png" },
  { id: 4, name: "Downtown", image: "/logos/png/downtown.png" },
  { id: 5, name: "Ego", image: "/logos/png/ego.png" },
  { id: 6, name: "Elmohandes", image: "/logos/png/Elmohandes.png" },
  { id: 7, name: "Elsalam", image: "/logos/png/elsalam.png" },
  { id: 8, name: "Etiole", image: "/logos/png/Etiole.png" },
  { id: 9, name: "Hope", image: "/logos/png/hope.png" },
  { id: 10, name: "Imtenan", image: "/logos/png/Imtenan.png" },
  { id: 11, name: "Innovo", image: "/logos/png/innovo.png" },
  { id: 12, name: "Mersal", image: "/logos/png/mersal.png" },
  { id: 13, name: "MG", image: "/logos/png/mg.png" },
  { id: 14, name: "NIGSD", image: "/logos/png/nigsd.png" },
  { id: 15, name: "Organo", image: "/logos/png/organo.png" },
  { id: 16, name: "RSM", image: "/logos/png/rsm.png" },
  { id: 17, name: "Sofico", image: "/logos/png/sofico.png" },
  { id: 18, name: "TUV", image: "/logos/png/tuv.jpg" },
  { id: 19, name: "United", image: "/logos/png/united.png" }
]


const ClientLogoCarousel = () => {
  const { language } = useLanguage();
  const [api, setApi] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Enhanced autoplay with smoother transitions
  useEffect(() => {
    if (!api) return;

    // Smoother, slightly faster autoplay
    const interval = setInterval(() => {
      api.scrollNext({ immediate: false });
    }, 2500);

    // Update current slide index for indicators
    const onScrollEnd = () => {
      const currentSlide = api.selectedScrollSnap();
      setCurrentIndex(currentSlide);
    };

    api.on("select", onScrollEnd);

    return () => {
      clearInterval(interval);
      api.off("select", onScrollEnd);
    };
  }, [api]);

  return (
    <div className="py-20 bg-gradient-to-b from-white to-loginhr-50/50">
      <div className="container-custom mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-loginhr-900 mb-4">
            {language === "en" ? "Trusted by Industry Leaders" : "موثوق به من قِبَل رواد الصناعة"}
          </h2>
          <p className="text-loginhr-600 text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Join over 60+ forward-thinking organizations transforming their HR operations with LoginHR"
              : "انضم إلى أكثر من 60 مؤسسة ذات تفكير مستقبلي تعمل على تحويل عمليات الموارد البشرية مع LoginHR"}
          </p>
        </div>

        <div className="mx-auto max-w-6xl relative before:absolute before:inset-y-0 before:left-0 before:w-24 before:z-10  after:absolute after:inset-y-0 after:right-0 after:w-24 after:z-10">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="overflow-visible"
          >
            <CarouselContent className="-ml-4">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <CarouselItem
                  key={`${client.id}-${index}`}
                  className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-2">
                    <div
                      className={cn(
                        "overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300",
                        "hover:shadow-md hover:scale-105 hover:-translate-y-1",
                        "border border-loginhr-100/50 group"
                      )}
                    >
                      <AspectRatio ratio={16 / 9} className="bg-white p-4">
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={client.image}
                            alt={client.name}
                            className="object-contain max-h-full max-w-full transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                          />
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Carousel indicators - elegant dots */}
          <div className="flex justify-center mt-8 gap-2">
            {clientLogos.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  currentIndex % clientLogos.length === index
                    ? "bg-loginhr-600 w-6"
                    : "bg-loginhr-300 hover:bg-loginhr-400"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center mt-12">
          <div className="bg-loginhr-900/5 backdrop-blur-sm rounded-full px-6 py-3 flex items-center rtl:flex-row-reverse">
            <span className="w-2 h-2 rounded-full bg-loginhr-500 animate-pulse mr-2"></span>
            <span className="text-sm font-medium text-loginhr-700">
              {language === "en" ? "60+ companies trust LoginHR" : "أكثر من 60 شركة تثق بـ LoginHR"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;
