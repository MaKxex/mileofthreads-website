"use client"

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { Link } from '@/i18n/navigation';


export default function RichText(content: any) {    
    content = content.content.richText as BlocksContent;
    
    return (
        <BlocksRenderer
            content={content}
            blocks={{
                // You can use the default components to set class names...
                paragraph: ({ children }) => <p className="text-neutral900 max-w-prose">{children}</p>,
                heading: ({ level, children }) => {
                    switch (level) {
                        case 1:
                            return <h1 className="text-4xl font-bold my-4">{children}</h1>;
                        case 2:
                            return <h2 className="text-3xl font-bold my-4">{children}</h2>;
                        case 3:
                            return <h3 className="text-2xl font-bold my-4">{children}</h3>;
                        case 4:
                            return <h4 className="text-xl font-bold my-4">{children}</h4>;
                        case 5:
                            return <h5 className="text-lg font-bold my-4">{children}</h5>;
                        case 6:
                            return <h6 className="text-base font-bold my-4">{children}</h6>;
                        default:
                            return <p className="text-neutral900 max-w-prose">{children}</p>;
                    }
                },
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