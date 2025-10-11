import { Scissors } from 'lucide-react';
import Image from 'next/image';
import { IconMap } from "@/components/SectionMap";

export function Footer( data: any) {
  
  const footerData = data.data;
  
  return (
    <footer className="bg-muted py-16 relative overflow-hidden border-t-4 border-foreground">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              {footerData.Logo?.url && <Image src={process.env.NEXT_PUBLIC_STRAPI_URL + footerData.Logo?.url || "/logo.png"} width={footerData.Logo?.width } height={footerData.Logo?.height} alt={footerData.Logo?.alternativeText} className=''/>}
              {/* <div className="flex flex-col">
                <Image src={process.env.NEXT_PUBLIC_STRAPI_URL + footerData.Logo?.url || "/logo.png"} width={footerData.Logo?.width } height={footerData.Logo?.height} alt={footerData.Logo?.alternativeText} className=''/>
              </div> */}
            </div>
            <p className="text-base font-medium mb-6 bg-card text-card-foreground border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_#000000] -rotate-1">
              {footerData?.Text?.body}
            </p>
            <div className="flex space-x-4">
              {footerData?.Socials && footerData.Socials.map((social: any, index: number) => {
                if (!social.icon?.IconList) return null;
                const Icon = IconMap[social.icon.IconList];
                return(
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-12 h-12 bg-card text-card-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground"
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                  </a>
                  
                )})
              }
              </div>
          </div>


          {footerData?.FooterLists.map((list: any, index: number) => (
            <div key={index}>
              <h4 className="font-black uppercase tracking-tight text-lg mb-6 bg-card text-card-foreground px-3 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block rotate-1">
                {list?.Title}
              </h4>
              <ul className="space-y-3">
                {list.Links.map((link: any, idx: number) => (
                  <li key={idx} className={`px-3 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_#000000] font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors bg-card text-card-foreground ${
                    idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
                  }`}>
                    <a href={link.href} className="block" rel='noopener noreferrer'>
                      {link.Label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        <div className="mt-12 pt-8 text-center border-t-4 border-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* <p className="text-lg font-black uppercase tracking-wide bg-primary text-primary-foreground px-6 py-3 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-flex items-center gap-3">
              Сделано с <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </p> */}
            <p className="text-sm font-bold uppercase tracking-wide bg-card text-card-foreground px-4 py-2 border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] inline-block rotate-1">
              © MILE OF THREADS 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}