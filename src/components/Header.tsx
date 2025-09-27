"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { scrollToSection } from '@/lib/utils';
import LocaleSwitcher from './LocaleSwitcher';
import { Link } from '@/i18n/navigation';

export function Header({ data, globalData} : { data: any, globalData: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'gallery', 'about', 'etsy', 'custom', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSec = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };




  return (
    <header className="fixed top-5 left-5 right-5 bg-card border-4 border-foreground z-50 shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-[4px] transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          {/* Interactive Logo */}
          <div 
            className="flex items-center space-x-4   group mr-5"
            onClick={() => scrollToSec('home')}
          >
            <Link href="/">
              <Image src={process.env.NEXT_PUBLIC_STRAPI_URL + data.Logo?.url || "/logo.png"} width={data.Logo.width} height={data.Logo.height} alt={data} className=''/>
            </Link>
          </div>

          {/* Desktop Navigation - Interactive */}
          <div className="hidden md:flex space-x-2">
            {data.Navigation.map((item: any) => (
              <Button 
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 border-2 border-foreground font-bold uppercase transition-all duration-200 shadow-[3px_3px_0px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 ${
                  activeSection === item.href 
                    ? 'bg-primary text-primary-foreground scale-105 shadow-none translate-x-[3px] translate-y-[3px]' 
                    : 'bg-card hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                {item.Label}
                {activeSection === item.href && (
                  <div className="w-full h-0.5 bg-secondary mt-1 animate-pulse"></div>
                )}
              </Button>
            ))}
          </div>

          {/* Interactive Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden border-2 border-foreground bg-card hover:bg-primary hover:text-primary-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-110 hover:rotate-12 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={24} className="rotate-0 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="group-hover:rotate-12 transition-transform duration-300" />
              )}
            </div>
          </Button>

          <LocaleSwitcher />
        </nav>

        {/* Interactive Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 border-t-4 border-foreground">
            <div className="space-y-3 pt-6">
              {data.Navigation.map((item: any, index: number) => (
                <button 
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 border-2 border-foreground font-bold uppercase shadow-[3px_3px_0px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 hover:scale-105 ${
                    activeSection === item.href 
                      ? 'bg-primary text-primary-foreground' 
                      : index % 2 === 0 
                        ? 'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground' 
                        : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.Label}
                  {activeSection === item.href && (
                    <div className="w-full h-0.5 bg-secondary mt-1 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}