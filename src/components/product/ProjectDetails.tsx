"use client";

import { FC } from "react";
import Image from "next/image";
import {format} from "date-fns";
import { getStrapiMedia } from "@/lib/strapiService";
import {GenericRichText} from "@/components/GenericRichText";
import {IProject} from "@/types/Project";

interface Props {
    project: IProject;
}

export const ProjectDetails: FC<Props> = ({ project }) => {
    if (!project) {
        return null;
    }

    const { Title, Description, Image: images, CreatedDate } = project;
    const mainImage = images?.[0];
    const otherImages = images?.slice(1) || [];

    return (
        <div className="container mx-auto px-4 py-8">
            {mainImage && (
                <div className="w-full h-[500px] relative mb-8">
                    <Image
                        src={getStrapiMedia(mainImage.url) || ""}
                        alt={mainImage.alternativeText || "Project Image"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            )}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{Title}</h1>
                <div className="text-gray-500 mb-4">
                    <span>{format(new Date(CreatedDate), "MMMM d, yyyy")}</span>
                </div>
                <div className="prose lg:prose-xl max-w-none">
                    <GenericRichText content={Description} />
                </div>
            </div>
            {otherImages.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {otherImages.map((image) => (
                            <div key={image.id} className="w-full h-64 relative">
                                <Image
                                    src={getStrapiMedia(image.url) || ""}
                                    alt={image.alternativeText || "Project Image"}
                                    layout="fill"
                                    objectFit="cover"
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