"use client";

import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowDown, Scissors, Sparkles, Star } from 'lucide-react';
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
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] rotate-12 opacity-20 hover:opacity-40 hover:scale-110 hover:rotate-45 transition-all duration-500 cursor-pointer"></div>
      <div className="absolute bottom-40 right-20 w-20 h-20 bg-secondary border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] -rotate-12 opacity-20 hover:opacity-40 hover:scale-110 hover:-rotate-45 transition-all duration-500 cursor-pointer"></div>
      <Scissors className="absolute top-60 right-40 w-12 h-12 text-muted-foreground opacity-10 rotate-45 hover:opacity-30 hover:scale-125 hover:rotate-90 transition-all duration-500 cursor-pointer" />
      
      {/* Floating interactive stars */}
      <Star className="absolute top-32 left-1/4 w-6 h-6 text-primary opacity-30 animate-pulse hover:opacity-60 hover:scale-150 transition-all duration-300 cursor-pointer" />
      <Star className="absolute bottom-32 right-1/4 w-8 h-8 text-secondary opacity-20 animate-pulse hover:opacity-50 hover:scale-150 transition-all duration-300 cursor-pointer" style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute top-1/3 right-1/3 w-5 h-5 text-accent opacity-25 animate-pulse hover:opacity-60 hover:scale-150 transition-all duration-300 cursor-pointer" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight">
                <span className="bg-card text-card-foreground px-2 border-4 border-foreground inline-block rotate-1 shadow-[6px_6px_0px_0px_#000000] mb-2 hover:rotate-0 hover:scale-105 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300 cursor-pointer">
                  {data.Title}
                </span><br />
                <span className="text-primary bg-card px-2 border-4 border-foreground inline-block -rotate-1 shadow-[6px_6px_0px_0px_#000000] mt-4 hover:rotate-0 hover:scale-105 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300 cursor-pointer">
                  {data.SubTitle}
                </span>
              </h1>
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
              {/* <Button 
                onClick={scrollToGallery} 
                size="lg" 
                className="w-fit px-8 py-4 bg-primary text-primary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
              >
                Смотреть работы
                <ArrowDown className="ml-3 w-5 h-5 animate-bounce" />
              </Button>
              <Button 
                size="lg" 
                className="w-fit px-8 py-4 bg-secondary text-secondary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Заказать
              </Button> */}
            </div>

            {/* Animated Statistics */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="bg-card border-4 border-foreground p-4 text-center shadow-[4px_4px_0px_0px_#000000] -rotate-1 hover:rotate-0 hover:scale-110 hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group">
                <div className="text-3xl font-black text-primary group-hover:text-secondary transition-colors duration-300">
                  {isVisible && <AnimatedCounter target={5} />}+
                </div>
                <div className="font-bold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300">лет</div>
              </div>
              <div className="bg-card border-4 border-foreground p-4 text-center shadow-[4px_4px_0px_0px_#000000] rotate-1 hover:rotate-0 hover:scale-110 hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group">
                <div className="text-3xl font-black text-primary group-hover:text-secondary transition-colors duration-300">
                  {isVisible && <AnimatedCounter target={100} />}+
                </div>
                <div className="font-bold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300">работ</div>
              </div>
              <div className="bg-card border-4 border-foreground p-4 text-center shadow-[4px_4px_0px_0px_#000000] -rotate-1 hover:rotate-0 hover:scale-110 hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group">
                <div className="text-3xl font-black text-primary group-hover:text-secondary transition-colors duration-300">
                  {isVisible && <AnimatedCounter target={50} />}+
                </div>
                <div className="font-bold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300">клиентов</div>
              </div>
            </div> */}
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Interactive decorative elements */}
            <div className="absolute -top-6 -left-6 w-8 h-8 bg-primary border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-125 hover:rotate-45 transition-all duration-300 cursor-pointer"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-secondary border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-125 hover:-rotate-45 transition-all duration-300 cursor-pointer"></div>
            
            <div className="relative z-10 border-4 border-foreground shadow-[12px_12px_0px_0px_#000000] hover:shadow-[20px_20px_0px_0px_#000000] hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-300 group">
              <ImageWithFallback
                src={process.env.NEXT_PUBLIC_STRAPI_URL + data.Image?.url}
                alt="Мастер вышивки за работой"
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating interaction badge */}
              {/* <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
                <div className="bg-secondary text-secondary-foreground px-3 py-1 border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] font-black uppercase text-xs -rotate-12 hover:rotate-0 transition-transform duration-300">
                  Hover me!
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}