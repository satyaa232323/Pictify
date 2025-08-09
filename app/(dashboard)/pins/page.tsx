'use client';

import ImageCard from '@/components/ImageCard';
import { ImageCardProps } from '@/lib/lib';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Pins = () => {
  const [pins, setPins] = useState<ImageCardProps[]>([]);
  const [filteredPins, setFilteredPins] = useState<ImageCardProps[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetch('/api/pins')
      .then(res => res.json())
      .then(data => {
        setPins(data);
        // Filter berdasarkan search query
        if (searchQuery) {
          const filtered = data.filter((pin: ImageCardProps) =>
            pin.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredPins(filtered);
        } else {
          setFilteredPins(data);
        }
      })
      .catch(err => console.error('Error fetching pins:', err));
  }, [searchQuery]);

  return (
    <div className="p-6">
      {searchQuery && (
        <div className="mb-4">
          <h4 className="text-2xl font-semibold">Search for "{searchQuery}"</h4>
          <p className="text-gray-500 ">results {filteredPins.length}</p>
        
        </div>
      )}

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {filteredPins.length > 0 ? (
          filteredPins.map((pin, index) => (
            <ImageCard
              key={pin.id}
              id={pin.id}
              imageUrl={pin.imageUrl}
              src={pin.src || pin.imageUrl}
              title={pin.title}
              alt={pin.description || "Image Pin"}
              description={pin.user?.name}
              delay={index * 0.1}
            />
          ))
        ) : searchQuery ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No pins found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pins;
