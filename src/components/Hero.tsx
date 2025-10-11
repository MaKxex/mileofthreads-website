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
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="z-10 w-full">
            <ImageWithFallback
              src={process.env.NEXT_PUBLIC_STRAPI_URL + data.Image?.url}
              alt={data.Image?.alternativeText!}
              className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className={`space-y-8 transition-all duration-1000 opacity-100 translate-x-0`}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight">
                {data.Title}
                <br />
              </h1>
              {data.SubTitle && (
                <h2 className="text-primary bg-card px-2 border-1 border-foreground inline-block -rotate-1 shadow-[6px_6px_0px_0px_#000000] mt-4 hover:rotate-0 hover:scale-105 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300  ">
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
                  className="bg-amber-50 cursor-pointer w-fit px-8 py-4 text-primary-foreground border-1 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                >
                  {button.Label}
                </Button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}