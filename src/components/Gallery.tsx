"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Scissors, Sparkles, Minus, Circle, Target } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

export default function Gallery(data: any) {
  const [selectedWork, setSelectedWork] = useState<any>(null);
  // const [filter, setFilter] = useState<string>('Все');

  // const categories = ['Все', ...new Set(embroideryWorks.map(work => work.category))];
  
  // const filteredWorks = filter === 'Все' 
  //   ? embroideryWorks 
  //   : embroideryWorks.filter(work => work.category === filter);  

  return (
    <section id="gallery" className="py-20 bg-background relative overflow-hidden">
      {/* Enhanced Thematic Background Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-primary border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] rotate-45 opacity-5 hover:opacity-20 hover:scale-125 hover:rotate-90 transition-all duration-500 cursor-pointer"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-secondary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] -rotate-12 opacity-5 hover:opacity-20 hover:scale-125 hover:rotate-45 transition-all duration-500 cursor-pointer"></div>
      
      {/* Sewing themed floating elements */}
      <Scissors className="absolute top-32 right-1/4 w-10 h-10 text-accent opacity-20 rotate-45 hover:opacity-60 hover:scale-150 hover:rotate-180 transition-all duration-700 cursor-pointer animate-pulse" />
      <Minus className="absolute top-1/4 left-1/5 w-8 h-8 text-primary opacity-15 hover:opacity-50 hover:scale-150 hover:rotate-45 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '0.5s' }} />
      <Circle className="absolute bottom-1/4 left-1/4 w-6 h-6 text-secondary opacity-20 hover:opacity-60 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '1s' }} />
      <Target className="absolute top-1/2 right-10 w-5 h-5 text-accent opacity-15 hover:opacity-50 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '1.5s' }} />
      <Sparkles className="absolute bottom-1/3 right-1/3 w-7 h-7 text-primary opacity-25 hover:opacity-60 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Embroidery hoops */}
      {/* <div className="absolute top-20 right-20 w-20 h-20 border-4 border-muted-foreground rounded-full opacity-10 hover:opacity-30 hover:scale-125 hover:rotate-45 transition-all duration-500 cursor-pointer">
        <div className="w-full h-full border-2 border-accent rounded-full scale-75 opacity-50"></div>
      </div>
      <div className="absolute bottom-32 left-20 w-14 h-14 border-3 border-primary rounded-full opacity-15 hover:opacity-40 hover:scale-125 hover:-rotate-45 transition-all duration-500 cursor-pointer">
        <div className="w-full h-full border-2 border-secondary rounded-full scale-80 opacity-60"></div>
      </div> */}
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
        header={data.Header}/>

        {/* Category Filter */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category}
              className={`px-6 py-3 border-4 border-foreground font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 hover:scale-105 ${
                filter === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div> */}

        {/* Gallery Carousel */}
        {/* Gallery Carousel */}
        <div className="relative">
          <Carousel className="w-full"  opts={{ align: 'start' }} >
            {/* Добавили внутренние отступы у контента, чтобы было место для анимации и не было клипа у viewport */}
            <CarouselContent className="-ml-4 px-6 py-6">
              {data.WorkExamples.map((work: any, index: number) => {
                return (
                  <CarouselItem key={work.id ?? index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div
                      className={`group relative will-change-transform cursor-pointer transition-all duration-300 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] hover:scale-105 hover:z-30 ${
                        index % 4 === 0
                          ? "rotate-1"
                          : index % 4 === 1
                          ? "-rotate-1"
                          : index % 4 === 2
                          ? "rotate-2"
                          : "-rotate-2"
                      } hover:rotate-0`}
                      onClick={() =>
                        setSelectedWork(work)
                      }
                    >
                      <div className="relative aspect-square overflow-visible group-hover:scale-105 transition-transform duration-300 will-change-transform">
                        
                        {/* Сама картинка */}
                        <ImageWithFallback
                          src={process.env.NEXT_PUBLIC_STRAPI_URL + work.Image[0].url}
                          alt={work.Image.alternativeText}
                          className="w-full h-full object-cover"
                        />

                        {/* Градиент поверх картинки */}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Текст снизу */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-card transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-black uppercase tracking-wide text-lg">{work.Title}</h3>
                        </div>

                        {/* Badge */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                          <div className="bg-primary text-primary-foreground px-3 py-1 border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] font-black uppercase text-xs rotate-12">
                            Click me!
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-primary text-primary-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[-4px]  transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground" />
            <CarouselNext className="bg-primary text-primary-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground" />
          </Carousel>
        </div>

        {/* Work Detail Modal */}
        <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
          <DialogContent className="border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] max-h-[90vh] overflow-y-auto">
          {selectedWork && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black uppercase tracking-tight bg-primary text-primary-foreground px-4 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 transition-transform duration-300">
                      {selectedWork.Title}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="aspect-square border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300">
                      <ImageWithFallback
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + selectedWork.Image[0].url}
                        alt={selectedWork.Image.alternativeText}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-6">
                      <p className="text-lg font-medium leading-relaxed bg-muted p-4 border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-300">
                        {selectedWork.Description}
                      </p>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-primary text-primary-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-300">
                          <span className="font-black uppercase">Год создания:</span>
                          <span className="font-bold">{selectedWork.CreatedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}