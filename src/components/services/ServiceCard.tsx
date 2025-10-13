import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
}

export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  imageSrc, 
  imageAlt, 
  features 
}: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-gray-200 p-1 gap-0">
      <CardContent className="px-0 pb-0 pt-0">
        {/* Image with Icon Overlay */}
        <div className="relative h-56 overflow-hidden rounded-lg mb-2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="px-2 pb-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Features Grid */}
          <div className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-amber-600 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-gray-600 leading-tight">{feature}</span>
              </div>
            ))}
            {features.length > 3 && (
              <div className="text-xs text-amber-700 font-medium pt-1">
                +{features.length - 3} more benefits
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
