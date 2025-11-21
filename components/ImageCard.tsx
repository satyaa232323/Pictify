'use client';

import React from 'react'
import { BlurFade } from './magicui/blur-fade';
import Image from 'next/image';
import Link from 'next/link';
import { ImageCardProps } from '@/lib/lib';
import { usePathname } from 'next/navigation';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Checkbox } from './ui/checkbox';



const ImageCard = ({ alt, title, imageUrl, src, description, delay = 0, id, onDelete, isSelected }: ImageCardProps) => {

    // add optional handledelete submit when isContentProfile
    const pathname = usePathname();
    const isProfilePost = pathname.startsWith('/profile/post');
    // const isBoardPost = pathname.startsWith('/profile/board/post');

    const handleDeleteClick = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            onDelete?.(id);
        }
    }
    
    const handleSelectClick = async () => {
        // Handle select click logic here
        
    }
    return (
        <BlurFade delay={delay} className='break-inside-avoid mb-4'>
            <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
                <Link href={`/pins/${id}`}>
                    <div className='relative overflow-hidden'>
                        <Image
                            src={src || imageUrl}
                            width={300}
                            height={400}
                            alt={alt}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 rounded-sm"
                            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    </div>
                </Link>

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
                {isProfilePost && (
                    <button
                        onClick={handleDeleteClick}
                        className="absolute top-2 right-2  text-white rounded-full p-1 hover:text-gray-900 transition-colors duration-200"
                    >
                        <BiDotsVerticalRounded className='text-gray-500 font-bold text-[20px]' />
                    </button>
                ) }
                {/* {isBoardPost && (
                    <Checkbox  onToggle={handleSelectClick}/>
                )} */}
            </div>
        </BlurFade >
    )
}

export default ImageCard
