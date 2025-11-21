'use client';
import ImageCard from '@/components/ImageCard'
import { ImageCardProps } from '@/lib/lib';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type PostContentProps = {
    endpoint: string; // endpoint dinamis
};

export interface SavedPin {
    id: string,
    savedAt: string,
    pin: ImageCardProps;
}

const Content = ({ endpoint }: PostContentProps) => {


    const [pins, setPins] = useState<ImageCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                // jika endpoint saves
                if (endpoint.includes('save')) {
                    const extractedPins = data.map((save: SavedPin) => ({
                        ...save.pin,
                        id: save.pin.id,
                        src: save.pin.imageUrl,
                        title: save.pin.title,
                        description: save.pin.description,
                        user: save.pin.user,
                    }));
                    setPins(extractedPins);
                    setLoading(false);
                }
                else {
                    setPins(data);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    }, [endpoint]);

    const handledelete = async (id: string) => {
        try {
            const response = await fetch(`/api/pins/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete pin');
            }

            setPins(pins.filter(pin => pin.id !== id));
        } catch (error) {
            console.error('Error deleting pin:', error);
        }
    }



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
                            onDelete={handledelete}
                            
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Content
