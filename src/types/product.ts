export interface ProductImage {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export interface ProductSpecification {
    name: string;
    value: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    mainImage: ProductImage;
    gallery?: ProductImage[];
    specifications: ProductSpecification[];
    inStock: boolean;
}
