"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Upload, Palette, Shirt, Scissors, Sparkles, Target, Zap, Circle, Minus, PlusCircle, Image as ImageIcon, Send } from 'lucide-react';
import { toast } from 'sonner';

interface DesignOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const designOptions: DesignOption[] = [
  { id: 'simple', name: 'Простой дизайн', price: 25, description: 'Базовая вышивка до 5000 стежков' },
  { id: 'detailed', name: 'Детальный дизайн', price: 45, description: 'Сложная вышивка до 15000 стежков' },
  { id: 'premium', name: 'Премиум дизайн', price: 75, description: 'Эксклюзивная вышивка с 3D эффектами' }
];

const garmentTypes = [
  { id: 'tshirt', name: 'Футболка', icon: '👕' },
  { id: 'hoodie', name: 'Толстовка', icon: '🧥' },
  { id: 'cap', name: 'Кепка', icon: '🧢' },
  { id: 'bag', name: 'Сумка', icon: '👜' },
  { id: 'patch', name: 'Нашивка', icon: '🏷️' },
  { id: 'other', name: 'Другое', icon: '❓' }
];

export function CustomDesign() {
  const [selectedDesign, setSelectedDesign] = useState<string>('');
  const [selectedGarment, setSelectedGarment] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    size: '',
    color: '',
    quantity: '1',
    rush: false,
    newsletter: false
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you'd upload these files to a server
      // For now, we'll just simulate adding image URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&${index}`
      );
      setUploadedImages(prev => [...prev, ...newImages.slice(0, 3 - prev.length)]);
      toast.success('Изображения загружены!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign || !selectedGarment || !formData.name || !formData.email) {
      toast.error('Заполните все обязательные поля!');
      return;
    }
    toast.success('Заказ отправлен! Мы свяжемся с вами в течение 24 часов.');
  };

  const calculatePrice = () => {
    const basePrice = designOptions.find(opt => opt.id === selectedDesign)?.price || 0;
    const quantity = parseInt(formData.quantity) || 1;
    const rushFee = formData.rush ? basePrice * 0.5 : 0;
    return (basePrice + rushFee) * quantity;
  };

  return (
    <section id="custom" className="py-20 bg-muted relative overflow-hidden">
      {/* Enhanced Thematic Background Elements */}
      <div className="absolute top-15 left-10 w-14 h-14 bg-primary border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] rotate-12 opacity-10 hover:opacity-40 hover:scale-125 hover:rotate-90 transition-all duration-500 cursor-pointer"></div>
      <div className="absolute bottom-10 right-15 w-18 h-18 bg-secondary border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] -rotate-45 opacity-10 hover:opacity-40 hover:scale-125 hover:rotate-12 transition-all duration-500 cursor-pointer"></div>
      
      {/* Sewing themed floating elements */}
      <Scissors className="absolute top-20 right-1/4 w-10 h-10 text-accent opacity-20 rotate-45 hover:opacity-60 hover:scale-150 hover:rotate-180 transition-all duration-700 cursor-pointer animate-pulse" />
      <Palette className="absolute top-1/3 left-1/5 w-8 h-8 text-primary opacity-15 hover:opacity-50 hover:scale-150 hover:rotate-45 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '0.5s' }} />
      <Minus className="absolute bottom-1/4 left-1/4 w-6 h-6 text-secondary opacity-20 hover:opacity-60 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '1s' }} />
      <Target className="absolute top-1/2 right-10 w-5 h-5 text-accent opacity-15 hover:opacity-50 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '1.5s' }} />
      <Sparkles className="absolute bottom-1/3 right-1/3 w-7 h-7 text-primary opacity-25 hover:opacity-60 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Embroidery hoops */}
      <div className="absolute top-10 right-20 w-16 h-16 border-4 border-muted-foreground rounded-full opacity-10 hover:opacity-30 hover:scale-125 hover:rotate-45 transition-all duration-500 cursor-pointer">
        <div className="w-full h-full border-2 border-accent rounded-full scale-75 opacity-50"></div>
      </div>
      <div className="absolute bottom-20 left-20 w-12 h-12 border-3 border-primary rounded-full opacity-15 hover:opacity-40 hover:scale-125 hover:-rotate-45 transition-all duration-500 cursor-pointer">
        <div className="w-full h-full border-2 border-secondary rounded-full scale-80 opacity-60"></div>
      </div>
      
      {/* Thread spools */}
      <Circle className="absolute bottom-1/4 right-1/4 w-4 h-8 bg-primary border-2 border-foreground opacity-20 hover:opacity-50 hover:scale-150 transition-all duration-300 cursor-pointer animate-pulse" style={{ animationDelay: '1.2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-5xl font-black uppercase tracking-tight">
            <span className="bg-accent text-accent-foreground px-4 py-2 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 hover:scale-110 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300 cursor-pointer">
              Создай свой
            </span>
            <br />
            <span className="bg-primary text-primary-foreground px-4 py-2 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] inline-block rotate-1 mt-4 hover:rotate-0 hover:scale-110 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300 cursor-pointer">
              ДИЗАЙН!
            </span>
          </h2>
          <p className="text-xl font-medium max-w-2xl mx-auto bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300">
            Загружай свои изображения, выбирай тип вышивки и получай уникальную работу, созданную специально для тебя!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Design Options */}
          <div>
            <h3 className="mb-8 text-3xl font-black uppercase tracking-tight">
              <span className="bg-secondary text-secondary-foreground px-3 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer">
                Выбери тип дизайна
              </span>
            </h3>
            
            <div className="space-y-4 mb-8">
              {designOptions.map((option, index) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 border-4 border-foreground shadow-[6px_6px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[6px] hover:-translate-y-[6px] hover:scale-105 ${
                    selectedDesign === option.id 
                      ? 'bg-primary text-primary-foreground scale-105 shadow-[12px_12px_0px_0px_#000000] -translate-x-[6px] -translate-y-[6px]' 
                      : 'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground'
                  } ${index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'}`}
                  onClick={() => setSelectedDesign(option.id)}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black uppercase tracking-wide text-lg mb-2">{option.name}</h4>
                        <p className="font-medium text-sm opacity-80 mb-3">{option.description}</p>
                        <Badge className={`font-black uppercase ${
                          selectedDesign === option.id ? 'bg-secondary text-secondary-foreground' : 'bg-accent text-accent-foreground'
                        } border-2 border-foreground shadow-[2px_2px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300`}>
                          от €{option.price}
                        </Badge>
                      </div>
                      {hoveredOption === option.id && (
                        <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Garment Type Selection */}
            <h3 className="mb-6 text-2xl font-black uppercase tracking-tight">
              <span className="bg-accent text-accent-foreground px-3 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer">
                На что вышиваем?
              </span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {garmentTypes.map((garment, index) => (
                <Button
                  key={garment.id}
                  variant={selectedGarment === garment.id ? "default" : "outline"}
                  className={`h-20 flex flex-col items-center justify-center gap-2 border-4 border-foreground font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 hover:scale-105 ${
                    selectedGarment === garment.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground'
                  } ${index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'}`}
                  onClick={() => setSelectedGarment(garment.id)}
                >
                  <span className="text-2xl">{garment.icon}</span>
                  <span className="text-xs">{garment.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div>
            <Card className="bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-300 rotate-1 hover:rotate-0">
              <CardHeader>
                <CardTitle className="text-2xl font-black uppercase tracking-tight text-center bg-primary text-primary-foreground px-3 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 transition-transform duration-300">
                  Детали заказа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <Label className="font-black uppercase tracking-wide mb-3 block">Загрузи изображения *</Label>
                    <div className="border-4 border-dashed border-foreground p-6 text-center bg-muted hover:bg-card transition-colors duration-300 cursor-pointer group">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                        <p className="font-bold text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          Кликни или перетащи изображения сюда
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">До 3 изображений, макс. 10MB каждое</p>
                      </label>
                    </div>
                    
                    {uploadedImages.length > 0 && (
                      <div className="flex gap-3 mt-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImageWithFallback
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="w-20 h-20 object-cover border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] group-hover:shadow-[6px_6px_0px_0px_#000000] group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] transition-all duration-300"
                            />
                            <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_#000000] font-black text-xs">
                              {index + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-black uppercase tracking-wide">Имя *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="border-4 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] focus:shadow-[6px_6px_0px_0px_#000000] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-300"
                        placeholder="Твое имя"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-black uppercase tracking-wide">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="border-4 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] focus:shadow-[6px_6px_0px_0px_#000000] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-300"
                        placeholder="твой@email.com"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="font-black uppercase tracking-wide">Описание дизайна</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="border-4 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] focus:shadow-[6px_6px_0px_0px_#000000] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-300 min-h-[120px]"
                      placeholder="Опиши свой дизайн: размер, цвета, особые пожелания..."
                    />
                  </div>

                  {/* Additional Options */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="size" className="font-black uppercase tracking-wide">Размер</Label>
                      <Select value={formData.size} onValueChange={(value) => setFormData(prev => ({ ...prev, size: value }))}>
                        <SelectTrigger className="border-4 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-300">
                          <SelectValue placeholder="Выбери размер" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="xs">XS</SelectItem>
                          <SelectItem value="s">S</SelectItem>
                          <SelectItem value="m">M</SelectItem>
                          <SelectItem value="l">L</SelectItem>
                          <SelectItem value="xl">XL</SelectItem>
                          <SelectItem value="xxl">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity" className="font-black uppercase tracking-wide">Количество</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        className="border-4 border-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] focus:shadow-[6px_6px_0px_0px_#000000] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="rush"
                        checked={formData.rush}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rush: !!checked }))}
                        className="border-2 border-foreground"
                      />
                      <Label htmlFor="rush" className="font-bold cursor-pointer hover:text-primary transition-colors duration-300">
                        Срочный заказ (+50% к цене, готов за 3-5 дней)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: !!checked }))}
                        className="border-2 border-foreground"
                      />
                      <Label htmlFor="newsletter" className="font-bold cursor-pointer hover:text-primary transition-colors duration-300">
                        Подписаться на новости и скидки
                      </Label>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {selectedDesign && (
                    <div className="bg-muted border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_#000000] -rotate-1 hover:rotate-0 transition-transform duration-300">
                      <div className="flex justify-between items-center">
                        <span className="font-black uppercase tracking-wide">Примерная стоимость:</span>
                        <span className="text-2xl font-black text-primary">€{calculatePrice()}</span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground mt-1">
                        Финальная цена может отличаться в зависимости от сложности дизайна
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full px-8 py-4 bg-primary text-primary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground group"
                  >
                    <Send className="w-5 h-5 mr-3 group-hover:translate-x-2 transition-transform duration-300" />
                    Отправить заказ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}