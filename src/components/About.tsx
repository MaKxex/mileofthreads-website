import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Clock, Heart, Users, Scissors, Sparkles, Zap, Target } from 'lucide-react';

export default function About(data:any) {
  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] rotate-12 opacity-5 hover:opacity-30 hover:scale-125 hover:rotate-45 transition-all duration-500  "></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-secondary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] -rotate-45 opacity-5 hover:opacity-30 hover:scale-125 hover:rotate-12 transition-all duration-500  "></div>
      <Scissors className="absolute top-40 right-20 w-12 h-12 text-muted-foreground opacity-20 rotate-45 hover:opacity-50 hover:scale-150 hover:rotate-180 transition-all duration-700  " />
      

      <Sparkles className="absolute top-20 left-1/3 w-6 h-6 text-accent opacity-20 animate-pulse hover:opacity-60 hover:scale-150 transition-all duration-300  " />
      <Zap className="absolute bottom-20 left-1/4 w-5 h-5 text-primary opacity-15 animate-pulse hover:opacity-50 hover:scale-150 transition-all duration-300  " style={{ animationDelay: '1s' }} />
      <Target className="absolute top-1/2 right-10 w-4 h-4 text-secondary opacity-20 animate-pulse hover:opacity-60 hover:scale-150 transition-all duration-300  " style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mb-8 text-5xl font-black uppercase tracking-tight">
              <span className="bg-primary text-primary-foreground px-4 py-2 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] inline-block rotate-1 hover:rotate-0 hover:scale-110 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300  ">
                {data.Title}
              </span>
            </h2>
            <div className="space-y-6">

              {data.Texts.map((text: { id: number; body: string }, index: number) => (
                <p key={text.id} className="text-lg font-medium bg-card border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_#000000] -rotate-1 hover:rotate-0 hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] hover:scale-105 transition-all duration-300  ">
                  {text.body}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative group">

              <div className="absolute -top-4 -left-4 w-6 h-6 bg-primary border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-150 hover:rotate-90 transition-all duration-300  "></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-secondary border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-150 hover:-rotate-90 transition-all duration-300  "></div>
              
              <div className="border-4 border-foreground shadow-[12px_12px_0px_0px_#000000] rotate-2 hover:rotate-0 hover:shadow-[20px_20px_0px_0px_#000000] hover:-translate-x-[8px] hover:-translate-y-[8px] hover:scale-105 transition-all duration-500   group">
                <ImageWithFallback
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + data.Image?.url}
                  alt={data.Image?.alternativeText}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>            
          </div>
        </div>
      </div>
    </section>
  );
}