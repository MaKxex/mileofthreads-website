"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SectionHeader from './ui/SectionHeader';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Gallery(data: any) {
  const locale = useLocale();

  return (
    <section id="gallery" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
        header={data.Header}/>

        <div className="relative">
          <Carousel className="w-full"  opts={{ align: 'start' }} >
            <CarouselContent className="-ml-4 px-6 py-6">
              {data.WorkExamples.map((work: any, index: number) => {
                return (
                  <CarouselItem key={work.id ?? index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link href={`/${locale}/project/${work.slug}`}>
                      <div
                        className={`group relative will-change-transform cursor-pointer transition-all duration-300 border-1 border-foreground shadow-[6px_6px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] hover:scale-105 hover:z-30 ${
                          index % 4 === 0
                            ? "rotate-1"
                            : index % 4 === 1
                            ? "-rotate-1"
                            : index % 4 === 2
                            ? "rotate-2"
                            : "-rotate-2"
                        } hover:rotate-0`}
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
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-card">
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
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-primary text-primary-foreground border-1 border-foreground shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[-4px]  transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground" />
            <CarouselNext className="bg-primary text-primary-foreground border-1 border-foreground shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}