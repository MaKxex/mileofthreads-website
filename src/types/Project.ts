export interface IProject {
    id: number;
    documentId: string;
    Title: string;
    slug: string;
    CreatedDate: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    Description: string;
    Image: IStrapiImage[];
}

export interface IStrapiImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any; // You might want to define a more specific type for formats
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any; // Or a more specific type
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}