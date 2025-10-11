import { ImageWithFallback } from './figma/ImageWithFallback';

export default function About(data:any) {
  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mb-8 text-5xl font-black uppercase tracking-tight">
              <span className="text-primary inline-block">
                {data.Title}
              </span>
            </h2>
            <div className="space-y-6">

              {data.Texts.map((text: { id: number; body: string }, index: number) => (
                <p key={text.id} className="text-lg font-medium">
                  {text.body}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative group">

              <div className="hover:rotate-0 hover:shadow-[20px_20px_0px_0px_#000000] hover:-translate-x-[8px] hover:-translate-y-[8px] hover:scale-105 transition-all duration-500   group">
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