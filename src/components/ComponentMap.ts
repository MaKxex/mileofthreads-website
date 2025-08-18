import dynamic from "next/dynamic";


export const ComponentMap: Record<string, any> = {
  "page-components.hero": dynamic(() => import("./Hero")),
  "page-components.gallery": dynamic(() => import("./Gallery")),
  "page-components.about": dynamic(() => import("./About")),
  "page-components.contact": dynamic(() => import("./Contact")),
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