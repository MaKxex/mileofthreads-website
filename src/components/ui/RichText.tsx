"use client"

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { Link } from '@/i18n/navigation';


export default function RichText(content: any) {

    content = content.content.richText as BlocksContent;
    console.log(content);

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                // You can use the default components to set class names...
                paragraph: ({ children }) => <p className="text-neutral900 max-w-prose">{children}</p>,

                // For links, you may want to use the component from your router or framework
                link: ({ children, url }) => <Link href={url} target='_blank'>{children}</Link>,
            }}
            modifiers={{
                bold: ({ children }) => <strong>{children}</strong>,
                italic: ({ children }) => <span className="italic">{children}</span>,
            }}
            /> 
    );
}