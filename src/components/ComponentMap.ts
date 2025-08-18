import Hero from "./Hero";
import Gallery from "./Gallery";
import About from "./About";
import Contact from "./Contact";
import dynamic from "next/dynamic";

export const ComponentMap: Record<string, any> = {
  "page-components.hero": Hero,
  "page-components.gallery": Gallery,
  "page-components.about": About,
  "page-components.contact": Contact,
};

export const IconMap: Record<string, any> = {
  "mail": dynamic(() => import("lucide-react").then(mod => mod.Mail)),
  "phone": dynamic(() => import("lucide-react").then(mod => mod.Phone)),
  "map-pin": dynamic(() => import("lucide-react").then(mod => mod.MapPin)),
  "clock": dynamic(() => import("lucide-react").then(mod => mod.Clock)),
  "send": dynamic(() => import("lucide-react").then(mod => mod.Send)),
  "message-circle": dynamic(() => import("lucide-react").then(mod => mod.MessageCircle)),
  "sparkles": dynamic(() => import("lucide-react").then(mod => mod.Sparkles)),
  "star": dynamic(() => import("lucide-react").then(mod => mod.Star)),
  "scissors": dynamic(() => import("lucide-react").then(mod => mod.Scissors)),
  "arrow-down": dynamic(() => import("lucide-react").then(mod => mod.ArrowDown)),
  "x": dynamic(() => import("lucide-react").then(mod => mod.X)),
  "instagram": dynamic(() => import("lucide-react").then(mod => mod.Instagram)),
  "heart": dynamic(() => import("lucide-react").then(mod => mod.Heart)),
  "etsy": dynamic(() => import("react-icons/bi").then(mod => mod.BiLogoEtsy)),
}