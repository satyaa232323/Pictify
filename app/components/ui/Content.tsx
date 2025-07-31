'use client';
import ImageCard from '@/components/ImageCard'
import { ImageCardProps } from '@/lib/lib';
import React, { useEffect, useState } from 'react'

type PostContentProps = {
    endpoint: string; // endpoint dinamis
};

const Content = ({ endpoint }: PostContentProps) => {

    const [pins, setPins] = useState<ImageCardProps[]>([]);
    useEffect(() => {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => setPins(data))
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    }, [endpoint]);



    return (
        <div className="p-6">
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">

                {pins.length === 0 ? (
                    <div className="col-span-full text-center">No content available</div>
                ) : (
                    pins.map((pin, index) => (
                        <ImageCard
                            key={pin.id}
                            id={pin.id}
                            imageUrl={pin.imageUrl}
                            src={pin.src || pin.imageUrl}
                            title={pin.title}
                            alt={pin.description || 'Image Pin'}
                            description={pin.user?.name}
                            delay={index * 0.1}
                            user={pin.user}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Content
