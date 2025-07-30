'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";

export default function Home() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    fetch('/api/pins')
      .then(response => response.json())
      .then(data => setPins(data))
      .catch(error => {
        console.error('Error fetching pins:', error);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {pins.map((pin, index) => (
          <ImageCard
            key={pin.id}
            id={pin.id}
            src={pin.imageUrl}
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
