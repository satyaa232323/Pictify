import React from 'react'
import { BlurFade } from './magicui/blur-fade';
import Image from 'next/image';
import Link from 'next/link';


interface ImageCardProps {
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
    delay?: number;
}


const ImageCard = ({ src, alt, title, description, delay = 0, id }: ImageCardProps) => {
    return (
        <BlurFade delay={delay} className='break-inside-avoid mb-4'>
            <Link href={`/pins/${id}`}>
            <div className='bg-white rouded-x1 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
                <div className='relative overflow-hidden'>
                    <Image
                        src={src}
                        width={300}
                        height={400}
                        alt={alt}
                        className='w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </div>

                {(title || description) && (
                    <div className="p-4">
                        {title && (
                            <h3 className="font-medium text-gray-900 truncate mb-1">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm text-gray-600 truncate">
                                {description}
                            </p>
                        )}
                    </div>
                )}

            </div>
            </Link>
        </BlurFade>
    )
}

export default ImageCard
