"use client";

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Star, ShoppingBag, Heart, Scissors, Zap, Circle, Minus } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  isPopular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Кастомная вышивка аниме персонажа",
    price: "€25-45",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    rating: 5,
    reviews: 127,
    isPopular: true
  },
  {
    id: 2,
    name: "Вышитая толстовка с логотипом",
    price: "€35-55",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    rating: 5,
    reviews: 89,
    isPopular: true
  },
  {
    id: 3,
    name: "Портрет питомца вышивкой",
    price: "€30-50",
    image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300&h=300&fit=crop",
    rating: 5,
    reviews: 203
  },
  {
    id: 4,
    name: "Именная нашивка",
    price: "€15-25",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    rating: 5,
    reviews: 156
  }
];

export function EtsyShop() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [clickedStar, setClickedStar] = useState<number | null>(null);

  return (
    <section id="etsy" className="py-20 bg-background relative overflow-hidden">
      {/* Thematic Background Elements */}
      <div className="absolute top-10 left-20 w-12 h-12 bg-primary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] rotate-45 opacity-10 hover:opacity-40 hover:scale-125 hover:rotate-90 transition-all duration-500  "></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-secondary border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] -rotate-12 opacity-10 hover:opacity-40 hover:scale-125 hover:rotate-45 transition-all duration-500  "></div>
      
      {/* Sewing themed floating elements */}
      <Scissors className="absolute top-32 right-1/4 w-8 h-8 text-accent opacity-20 rotate-45 hover:opacity-60 hover:scale-150 hover:rotate-180 transition-all duration-700   animate-pulse" />
      <Circle className="absolute top-1/4 left-1/4 w-6 h-6 text-primary opacity-15 hover:opacity-50 hover:scale-150 transition-all duration-300   animate-pulse" style={{ animationDelay: '1s' }} />
      <Minus className="absolute bottom-1/3 left-1/3 w-5 h-5 text-secondary opacity-20 hover:opacity-60 hover:scale-150 transition-all duration-300   animate-pulse" style={{ animationDelay: '2s' }} />
      <Zap className="absolute top-1/2 right-10 w-4 h-4 text-accent opacity-15 hover:opacity-50 hover:scale-150 transition-all duration-300   animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Embroidery hoop simulation */}
      <div className="absolute top-20 right-10 w-20 h-20 border-4 border-muted-foreground rounded-full opacity-10 hover:opacity-30 hover:scale-125 hover:rotate-45 transition-all duration-500  ">
        <div className="w-full h-full border-2 border-accent rounded-full scale-75 opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-5xl font-black uppercase tracking-tight">
            <span className="bg-primary text-primary-foreground px-4 py-2 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 hover:scale-110 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300  ">
              Наш магазин на
            </span>
            <br />
            <span className="bg-secondary text-secondary-foreground px-4 py-2 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] inline-block rotate-1 mt-4 hover:rotate-0 hover:scale-110 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300  ">
              ETSY!
            </span>
          </h2>
          <p className="text-xl font-medium max-w-2xl mx-auto bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300">
            Покупай готовые работы или заказывай кастомную вышивку прямо в нашем официальном магазине на Etsy!
            Доставка по всему миру, безопасные платежи.
          </p>
        </div>

        {/* Popular Products */}
        <div className="mb-12">
          <h3 className="mb-8 text-3xl font-black uppercase tracking-tight text-center">
            <span className="bg-accent text-accent-foreground px-3 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300  ">
              Популярные товары
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id}
                className={`bg-card text-card-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] transition-all duration-300   hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] hover:scale-105 group ${
                  index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                } ${hoveredProduct === product.id ? 'scale-110 shadow-[16px_16px_0px_0px_#000000] -translate-x-[10px] -translate-y-[10px]' : ''}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.isPopular && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] font-black uppercase text-xs rotate-12 hover:rotate-0 transition-transform duration-300">
                      ХИТ!
                    </Badge>
                  )}
                  
                  {/* Interactive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="sm" className="bg-secondary text-secondary-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] font-black uppercase text-xs hover:scale-110">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Купить
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-black uppercase tracking-wide text-sm mb-2 hover:text-primary transition-colors duration-300">{product.name}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-black text-primary">{product.price}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4   transition-all duration-200 hover:scale-125 ${
                            i < product.rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'
                          } ${clickedStar === i ? 'scale-125 animate-pulse' : ''}`}
                          onClick={() => setClickedStar(clickedStar === i ? null : i)}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {product.reviews} отзывов
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-8">
          <div className="bg-muted border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_#000000] hover:shadow-[16px_16px_0px_0px_#000000] hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-300 rotate-1 hover:rotate-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 hover:text-primary transition-colors duration-300  ">
                  Готов к покупкам?
                </h3>
                <p className="font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Переходи в наш магазин на Etsy и выбирай из 50+ готовых работ или заказывай кастомную вышивку!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="px-8 py-4 bg-primary text-primary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground group"
                >
                  <ExternalLink className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Открыть магазин
                </Button>
                <Button 
                  size="lg" 
                  className="px-8 py-4 bg-secondary text-secondary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground group"
                >
                  <Heart className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform duration-300" />
                  В избранное
                </Button>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Star className="w-6 h-6" />, text: "4.9/5 звезд", subtext: "200+ отзывов" },
              { icon: <ShoppingBag className="w-6 h-6" />, text: "500+ продаж", subtext: "Довольных клиентов" },
              { icon: <ExternalLink className="w-6 h-6" />, text: "Быстрая доставка", subtext: "По всему миру" },
              { icon: <Heart className="w-6 h-6" />, text: "100% качество", subtext: "Гарантия возврата" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-card border-2 border-foreground p-4 text-center shadow-[4px_4px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300   hover:scale-105 ${
                  index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                }`}
              >
                <div className="flex justify-center mb-2 text-primary hover:text-secondary transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="font-black uppercase tracking-wide text-sm mb-1">{item.text}</div>
                <div className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors duration-300">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}