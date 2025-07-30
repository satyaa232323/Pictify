'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";
import { ImageCardProps } from '@/lib/lib';


export default function Home() {
  const [pins, setPins] = useState<ImageCardProps[]>([]);

  useEffect(() => {
    fetch('/api/pins')
      .then((res) => res.json())
      .then((data) => {
        setPins(data);
        console.log('Fetched pins:', data);
      })
      .catch((err) => console.error('Error fetching pins:', err));
  }, []);

  return (
    <div className="p-6">
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {pins.map((pin, index) => (
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
        ))}
      </div>
    </div>
  );
}
