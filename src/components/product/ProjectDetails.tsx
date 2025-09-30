"use client";

import { FC } from "react";
import Image from "next/image";
import { format, Locale } from "date-fns";
import { ru, enUS, lv } from "date-fns/locale";
import RichText from "../ui/RichText";
import {IProject} from "@/types/Project";

interface Props {
    project: IProject;
    locale: string;
}

export const ProjectDetails: FC<Props> = ({ project, locale }) => {
    if (!project) {
        return null;
    }

    const { Title, Description, Image: images, CreatedDate } = project;
    const mainImage = images?.[0];
    const otherImages = images?.slice(1) || [];
    
    const locales: { [key: string]: Locale } = {
        ru,
        en: enUS,
        lv,
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-30">
            {mainImage && (
                <div className="w-full h-[500px] relative mb-8">
                    <Image
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + mainImage.url || ""}
                        alt={mainImage.alternativeText || "Main Project Image"}
                        fill
                        style={{objectFit: 'cover'}}
                        className="rounded-lg"
                    />
                </div>
            )}
            <div>
                <h1 className="text-4xl font-bold mb-4">{Title}</h1>
                <div className="text-gray-500 mb-4">
                    <span>{format(new Date(CreatedDate), "MMMM d, yyyy", { locale: locales[locale] })}</span>
                </div>
                    <div className="prose lg:prose-xl max-w-none">
                        {Description && Description.richText && <RichText content={Description} />}
                    </div>
            </div>
            {otherImages.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {otherImages.map((image) => (
                            <div key={image.id} className="w-full h-64 relative">
                                <Image
                                    src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url || ""}
                                    alt={image.alternativeText || "Project Image"}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};