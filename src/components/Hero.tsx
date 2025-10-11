'use client'

import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Scissors, Sparkles, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/utils';


export default function Hero(data : any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center py-20 bg-background relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] rotate-12 opacity-20 hover:opacity-40 hover:scale-110 hover:rotate-45 transition-all duration-500  "></div>
      <div className="absolute bottom-40 right-20 w-20 h-20 bg-secondary border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] -rotate-12 opacity-20 hover:opacity-40 hover:scale-110 hover:-rotate-45 transition-all duration-500  "></div>
      <Scissors className="absolute top-60 right-40 w-12 h-12 text-muted-foreground opacity-10 rotate-45 hover:opacity-30 hover:scale-125 hover:rotate-90 transition-all duration-500  " />
      
      {/* Floating interactive stars */}
      <Star className="absolute top-32 left-1/4 w-6 h-6 text-primary opacity-30 animate-pulse hover:opacity-60 hover:scale-150 transition-all duration-300  " />
      <Star className="absolute bottom-32 right-1/4 w-8 h-8 text-secondary opacity-20 animate-pulse hover:opacity-50 hover:scale-150 transition-all duration-300  " style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute top-1/3 right-1/3 w-5 h-5 text-accent opacity-25 animate-pulse hover:opacity-60 hover:scale-150 transition-all duration-300  " style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 opacity-100 translate-x-0`}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight">
                {data.Title}
                <br />
              </h1>
              {data.SubTitle && (
                <h2 className="text-primary bg-card px-2 border-4 border-foreground inline-block -rotate-1 shadow-[6px_6px_0px_0px_#000000] mt-4 hover:rotate-0 hover:scale-105 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300  ">
                  {data.SubTitle}
                </h2>
              )}
              <p className="text-2xl font-bold max-w-lg hover:scale-105 transition-transform duration-300">
                {data.Text}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {data.Buttons.map((button: { Label: string, href: string }, index: number) => (
                <Button 
                  key={index} 
                  onClick={() => scrollToSection(button.href)}
                  className="bg-amber-50 cursor-pointer w-fit px-8 py-4 text-primary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                >
                  {button.Label}
                </Button>
              ))}
            </div>

          </div>

          <div className={`relative transition-all duration-1000 delay-300 opacity-100 translate-x-0`}>
            {/* Interactive decorative elements */}
            <div className="absolute -top-6 -left-6 w-8 h-8 bg-primary border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-125 hover:rotate-45 transition-all duration-300  "></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-secondary border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-125 hover:-rotate-45 transition-all duration-300  "></div>
            
            <div className="relative z-10 border-4 border-foreground shadow-[12px_12px_0px_0px_#000000] hover:shadow-[20px_20px_0px_0px_#000000] hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-300 group">
              <ImageWithFallback
                src={process.env.NEXT_PUBLIC_STRAPI_URL + data.Image?.url}
                alt="Мастер вышивки за работой"
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}