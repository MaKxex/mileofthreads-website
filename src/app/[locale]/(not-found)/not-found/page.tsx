"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
export default function NotFoundPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations('404');

  useEffect(() => {

    // Анимация при загрузке
    const timer = setTimeout(() => setIsAnimating(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (  
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">


      {/* Основной контент */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Большая 404 */}
          <div className={`relative mb-8 ${isAnimating ? 'animate-in slide-in-from-top-10 duration-700' : 'opacity-0'}`}>
            <div className="relative inline-block">
              <h1 className="text-[12rem] md:text-[16rem] font-black leading-none text-primary px-8 py-4 hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-500 hover:scale-110">
                404
              </h1>
              
              </div>
          </div>

          {/* Заголовок */}
          <div className={`mb-6 ${isAnimating ? 'animate-in slide-in-from-bottom-5 duration-700 delay-300' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-6xl font-black mb-4 bg-card border-4 border-foreground px-6 py-3 inline-block shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300 hover:scale-105">
              {t("title")}
            </h2>
          </div>

          {/* Интерактивные кнопки */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isAnimating ? 'animate-in slide-in-from-bottom-5 duration-700 delay-700' : 'opacity-0'}`}>
            <Button
              onClick={handleGoHome}
              size="lg"
              className="cursor-pointer bg-primary text-primary-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] hover:scale-110 transition-all duration-300 px-8 py-4 group"
            >
              <Home className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              {t("toMainPage")}
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="cursor-pointer bg-card text-card-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] hover:scale-110 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 px-8 py-4 group"
            >
              <ArrowLeft className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform duration-300" />
              {t("goBack")}
            </Button>
          </div>

        </div>
      </div>

      {/* Дополнительные декоративные линии */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-foreground opacity-10"></div>
      <div className="absolute top-0 right-1/4 w-1 h-full bg-foreground opacity-10"></div>
      <div className="absolute top-1/4 left-0 w-full h-1 bg-foreground opacity-10"></div>
      <div className="absolute bottom-1/4 left-0 w-full h-1 bg-foreground opacity-10"></div>
    </div>
  );
}