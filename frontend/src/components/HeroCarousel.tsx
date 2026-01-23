import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSlide {
  image: string;
  title: string;
  description: string;
  badge?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  accentColor?: string;
  autoPlayInterval?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  slides, 
  accentColor = 'var(--color-primary)',
  autoPlayInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${index === currentSlide ? 'animate-ken-burns' : ''}`}
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start">
            <div className="container-custom px-6 md:px-12">
              <div className="max-w-4xl text-white">
                {slide.badge && (
                  <div 
                    className="inline-block px-5 py-2 text-sm md:text-base font-medium rounded-full mb-6 animate-fade-in backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
                  >
                    {slide.badge}
                  </div>
                )}
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight drop-shadow-lg tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-white/90 mb-10 animate-slide-up max-w-2xl leading-relaxed drop-shadow-md font-light" style={{ animationDelay: '0.2s' }}>
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all text-white z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all text-white z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3'
                : 'w-3 h-3'
            } rounded-full ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
