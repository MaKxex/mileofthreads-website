import { Card, CardContent } from './ui/card';
import {  MessageCircle } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { IconMap } from './SectionMap';
import ContactForm from './ContactForm';

export default function Contact(data:any) {
  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute top-20 left-20 w-12 h-12 bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_#000000] rotate-45 opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-secondary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] -rotate-12 opacity-20"></div>
      <MessageCircle className="absolute top-40 left-40 w-10 h-10 text-accent opacity-10 rotate-12" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader header={data?.Header}/>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-8 text-3xl font-black uppercase tracking-tight bg-accent text-accent-foreground px-3 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1">
                {data?.ContactInfos?.title}
              </h3>
              <div className="grid gap-6">
                {data?.ContactInfos?.InfoCards.map((info: any, index: number) => {

                  const IconComponent = IconMap[info?.icon?.IconList];
                  return (
                  <Card key={index} className={`border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] ${
                    index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  } hover:rotate-0 transition-transform duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          {IconComponent && <IconComponent />}
                        </div>
                        <div>
                          <h4 className="mb-2 font-black uppercase tracking-wide text-lg">{info.title}</h4>
                          <p className="font-bold mb-1 text-base">{info.value}</p>
                          <p className="font-medium text-sm opacity-80">
                            {info?.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )})}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
              sandbox={process.env.NODE_ENV === "development"}
          />
        </div>
      </div>
    </section>
  );
}