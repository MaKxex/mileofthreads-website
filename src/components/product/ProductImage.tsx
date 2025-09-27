import Image from 'next/image';
import { ProductImage as ProductImageType } from '@/types/product';

interface ProductImageProps {
    image: ProductImageType;
    className?: string;
}

export function ProductImage({ image, className = '' }: ProductImageProps) {
    return (
        <div className={`relative aspect-square ${className}`}>
            <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
        </div>
    );
}
