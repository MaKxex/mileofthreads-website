import { Product as ProductType } from '@/types/product';
import { ProductImage } from './ProductImage';
import { ProductSpecifications } from './ProductSpecifications';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

interface ProductDetailsProps {
    product: ProductType;
    onAddToCart?: () => void;
}

export function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
    const t = useTranslations('product');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Левая колонка с изображением */}
                <div>
                    <ProductImage image={product.mainImage} />
                </div>

                {/* Правая колонка с информацией */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.title}</h1>
                        <p className="mt-4 text-gray-600">{product.description}</p>
                    </div>

                    <div className="text-2xl font-bold">
                        {product.price.toLocaleString('ru-RU')} ₽
                    </div>

                    <ProductSpecifications specifications={product.specifications} />

                    <div>
                        {product.inStock ? (
                            <Button 
                                onClick={onAddToCart}
                                className="w-full md:w-auto"
                            >
                                {t('addToCart')}
                            </Button>
                        ) : (
                            <Button 
                                disabled
                                className="w-full md:w-auto"
                            >
                                {t('outOfStock')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
