import { ProductSpecification } from '@/types/product';
import { useTranslations } from 'next-intl';

interface ProductSpecificationsProps {
    specifications: ProductSpecification[];
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
    const t = useTranslations('product');
    
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('specifications')}</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {specifications.map((spec) => (
                    <div key={spec.name} className="flex justify-between sm:block">
                        <dt className="text-sm text-gray-600">{spec.name}</dt>
                        <dd className="text-sm font-medium">{spec.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
